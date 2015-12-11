import { SEARCH_HOTELS } from '../actions/action_search_hotels';
import { processWithIsServer } from './helper';

export default function reducerSearchHotels(state = null, action = null) {
    switch (action.type) {
        case SEARCH_HOTELS:
            return processWithIsServer(state, action);
        default:
            return state;
    }
}
