import { MAKE_RESERVATION } from '../actions/action_reservation';
import { processWithIsServer, multiProcessWithIsServer } from './helper';

export default function reducerReservation(state = null, action = null) {
    switch (action.type) {
        case MAKE_RESERVATION:
            var { data, err } = action;
            return Object.assign({}, {
                ...data,
                err: err
            });
        default:
            return state;
    }
}
