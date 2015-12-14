import { SEARCH_HOTELS, FLUSH_HOTELS } from '../actions/action_search_hotels';
import { processWithIsServer } from './helper';

export default function reducerSearchHotels(state = null, action = null) {
    switch (action.type) {
        case SEARCH_HOTELS:
            return processWithIsServer(state, action);
        case FLUSH_HOTELS:
            return null;
        default:
            return state;
    }
}
