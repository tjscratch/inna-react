import ActionTypes from '../constants/ActionTypes';

export default function reducerReservationPackageData(state = null, action = null) {
    switch (action.type) {
        case ActionTypes.RESERVATION_PACKAGE_DATA_GET:
            return null;
        case ActionTypes.RESERVATION_PACKAGE_DATA_SUCCESS:
            var {data} = action;
            return Object.assign({}, {
                ...data
            });
        case ActionTypes.RESERVATION_PACKAGE_DATA_ERROR:
            var {error} = action;
            return Object.assign({}, {
                error: error
            });
        default:
            return state;
    }
}
