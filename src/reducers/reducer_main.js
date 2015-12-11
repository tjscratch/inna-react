import { GET_MAIN_PAGE } from '../actions/action_main';
import { processWithIsServer } from './helper';

export default function reducerMain(state = null, action = null) {
    switch (action.type) {
        case GET_MAIN_PAGE:
            return processWithIsServer(state, action);
        default:
            return state;
    }
}
