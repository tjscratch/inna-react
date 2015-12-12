import { SET_RECOMMENDED, RECOMMENDED__CHANGE_HOTEL, RECOMMENDED__CHANGE_TICKET } from '../actions/action_search_recommended';
import { processWithIsServer } from './helper';

export default function reducerSetRecommended(state = null, action = null) {
    switch (action.type) {
        case SET_RECOMMENDED:
            var { data } = action;
            return Object.assign({}, {
                ...data
            });
        case RECOMMENDED__CHANGE_HOTEL:
            var { data } = action;
            //возвращаем новый объект state
            return Object.assign({}, state, {
                //новый объект recommendedData
                recommendedData: Object.assign({}, state.recommendedData, {
                    //меняем в нем переданные поля (Hotel, PackagePrice)
                    ...data
                })
            });
        case RECOMMENDED__CHANGE_TICKET:
            var { data } = action;
            return Object.assign({}, state, {
                recommendedData: Object.assign({}, state.recommendedData, {
                    ...data
                })
            });
        default:
            return state;
    }
}
