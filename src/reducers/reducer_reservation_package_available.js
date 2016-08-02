import ActionTypes from '../constants/ActionTypes';

export default function reducerReservationPackageAvailable(state = null, action = null) {
    switch (action.type) {
        case ActionTypes.RESERVATION_PACKAGE_AVAILABLE_GET:
            return null;
        case ActionTypes.RESERVATION_PACKAGE_AVAILABLE_SUCCESS:
            var {data} = action;
            return Object.assign({}, {
                ...data
            });
        case ActionTypes.RESERVATION_PACKAGE_AVAILABLE_ERROR:
            var {error} = action;
            return Object.assign({}, {
                error: error
            });
        default:
            return state;
    }
}
