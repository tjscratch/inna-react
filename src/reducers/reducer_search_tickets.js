import { SEARCH_TICKETS, FLUSH_TICKETS } from '../actions/action_search_tickets';
import { processWithIsServer } from './helper';

export default function reducerSearchTickets(state = null, action = null) {
    switch (action.type) {
        case SEARCH_TICKETS:
            return processWithIsServer(state, action);
        case FLUSH_TICKETS:
            return null;
        default:
            return state;
    }
}
