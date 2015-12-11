import { SET_RECOMMENDED } from '../actions/action_search_recommended';
import { processWithIsServer } from './helper';

export default function reducerSetRecommended(state = null, action = null) {
    switch (action.type) {
        case SET_RECOMMENDED:
            var { data } = action;
            return Object.assign({}, {
                ...data
            });
        default:
            return state;
    }
}
