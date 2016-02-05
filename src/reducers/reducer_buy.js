import { GET_BUY_PAGE_DATA } from '../actions/action_buy';
import { processWithIsServer, multiProcessWithIsServer } from './helper';

export default function reducerBuy(state = null, action = null) {
    switch (action.type) {
        case GET_BUY_PAGE_DATA:
            var { data, err } = action;
            return Object.assign({}, {
                ...data,
                err: err
            });
        default:
            return state;
    }
}
