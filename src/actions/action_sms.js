import apiClient from '../core/ApiClient';
import apiUrls from '../constants/ApiUrls';
import ActionTypes from '../constants/ActionTypes';


export function getNeedSmsValidation (params) {
    return (dispatch) => {
        return new Promise((resolve, reject)=> {
            apiClient.get(apiUrls.getSmsCode, params)
                .then((data) => {
                    return dispatch({
                        type: ActionTypes.GET_NEED_SMS_VALIDATION,
                        data: data
                    });
                })
        });
        // return apiClient.get(apiUrls.getSmsCode, params)

    }
}
