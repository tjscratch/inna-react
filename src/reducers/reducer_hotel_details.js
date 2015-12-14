import { GET_HOTEL_DETAILS, GET_HOTEL_ROOMS } from '../actions/action_hotel_details';
import { processWithIsServer, multiProcessWithIsServer } from './helper';

export default function reducerHotelDetails(state = null, action = null) {
    switch (action.type) {
        case GET_HOTEL_DETAILS:
        case GET_HOTEL_ROOMS:
            var { data } = action;
            return Object.assign({}, {
                ...data
            });
        default:
            return state;
    }
}
