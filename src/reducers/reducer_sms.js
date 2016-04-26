import ActionTypes from '../constants/ActionTypes';

export default function reducerNeedSmsValidation (state = null, action = null) {
    switch (action.type) {
        case ActionTypes.GET_NEED_SMS_VALIDATION:
            let sms = {};
            Object.assign(sms, state);
            return sms;
        case ActionTypes.CHECK_NEED_SMS_VALIDATION:
            let smsCode = {};
            Object.assign(smsCode, state);
            return smsCode;
        default:
            return state;
    }
}


