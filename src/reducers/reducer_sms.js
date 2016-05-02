import ActionTypes from '../constants/ActionTypes';

let initialState = {
    getSms: null,
    checkSms: null
};

export default function reducerNeedSmsValidation (state = initialState, action = null) {
    switch (action.type) {
        case ActionTypes.GET_NEED_SMS_VALIDATION:
            var data = action.data;
            return Object.assign({}, state, {
                ...data
            });
        case ActionTypes.CHECK_NEED_SMS_VALIDATION:
            var data = action.data;
            return Object.assign({}, state, {
                ...data
            });
        case ActionTypes.CHECK_NEED_SMS_VALIDATION_ERROR:
            var data = action.data;
            return Object.assign({}, state, {
                ...data
            });
        default:
            return state;
    }
}


