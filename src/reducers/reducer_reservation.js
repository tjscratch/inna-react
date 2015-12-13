import { RESERVATION_GET_HOTEL_DETAILS } from '../actions/action_reservation';
import { processWithIsServer, multiProcessWithIsServer } from './helper';

export default function reducerReservation(state = null, action = null) {
    switch (action.type) {
        case RESERVATION_GET_HOTEL_DETAILS:
            var { data, err } = action;
            return Object.assign({}, {
                ...data,
                err: err
            });
        default:
            return state;
    }
}
