import apiClient from '../core/ApiClient';
import apiUrls from '../constants/ApiUrls';
import ActionTypes from '../constants/ActionTypes';


export function getNeedSmsValidation (params) {
    return (dispatch) => {
        return new Promise((resolve, reject)=> {
            apiClient.post(apiUrls.getSmsCode, params)
                .then((data) => {
                    return dispatch({
                        type: ActionTypes.GET_NEED_SMS_VALIDATION,
                        data: { getSms: data }
                    });
                })
        });
    }
}
export function checkNeedSmsValidation (params) {
    return (dispatch) => {

        return apiClient.post(apiUrls.checkSmsCode, params)
            .then((data) => {
                return dispatch({
                    type: ActionTypes.CHECK_NEED_SMS_VALIDATION,
                    data: { checkSms: data }
                });
            })
            .catch((err, data) => {
                return dispatch({
                    type: ActionTypes.CHECK_NEED_SMS_VALIDATION_ERROR,
                    data: { checkSms: 0 }
                });
            });
    }
}
