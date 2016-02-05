import { RESERVATION_CHECK_AVAILABILITY } from '../actions/action_reservation';
import { processWithIsServer, multiProcessWithIsServer } from './helper';

export default function reducerReservation(state = null, action = null) {
    switch (action.type) {
        case RESERVATION_CHECK_AVAILABILITY:
            var { data, err } = action;
            return Object.assign({}, {
                ...data,
                err: err
            });
        default:
            return state;
    }
}
