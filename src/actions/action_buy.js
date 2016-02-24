import apiClient from '../core/ApiClient';
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import { process, processIf, processIfNotExists, multiProcessIf, multiProcessIfNotExists } from './action_index';

import apiUrls from '../constants/ApiUrls';


export const BUY_PAGE_PAY = 'BUY_PAGE_PAY';
export const BUY_PAGE_SET_FRAME_DATA = 'BUY_PAGE_SET_FRAME_DATA';
export const SET_BUY_PAGE_IS_LOADING = 'SET_BUY_PAGE_IS_LOADING';
export const SET_BUY_SUCCESS_DATA = 'SET_BUY_SUCCESS_DATA';
export const GET_BUY_PAGE_DATA = 'GET_BUY_PAGE_DATA';
export const GET_PAYMENT_REPRICING = 'GET_PAYMENT_REPRICING';

export function setBuyPageIsLoading(isLoading) {
    return {
        type: SET_BUY_PAGE_IS_LOADING,
        data: {
            isLoading: isLoading
        }
    }
}

export function getBuyPageData(params) {
    return (dispatch, getState) => {
        var field = 'buyPage';
        var ACTION_NAME = GET_BUY_PAGE_DATA;

        return apiClient.get(apiUrls.BuyPage, params).then((data) => {
            console.log(`action ${field} from api`);

            return dispatch({
                type: ACTION_NAME,
                data: data
            });
        }).catch((err, data)=> {
            console.log(`fail action ${field} from api`);

            return dispatch({
                type: ACTION_NAME,
                data: null,
                err: err
            });
        })
    }
}

export function getPaymentRepricing(orderNumber) {
    return (dispatch, getState) => {
        var field = 'buyRepricing';
        var ACTION_NAME = GET_PAYMENT_REPRICING;

        var params = {OrderNumber: orderNumber, ReturnType: 1};

        return apiClient.get(apiUrls.PaymentRepricing, params).then((data) => {
            console.log(`action ${field} from api`);

            return dispatch({
                type: ACTION_NAME,
                data: data
            });
        }).catch((err, data)=> {
            console.log(`fail action ${field} from api`);

            return dispatch({
                type: ACTION_NAME,
                data: null,
                err: err
            });
        })
    }
}

export function initiatePayment(params) {
    //ToDo: debug
    //return (dispatch, getState) => {
    //    return new Promise((resolve, reject) => {
    //        resolve({
    //            "PreauthStatus": 1,
    //            "Url": "https://3ds.rencredit.ru:3443/way4acs/pa?id=VeReq14551845290915958633643763429214",
    //            "Parameters": {
    //                "redirect": "https://3ds.rencredit.ru:3443/way4acs/pa?id=VeReq14551845290915958633643763429214",
    //                "PaReq": "eJxVUtlugzAQ/BXEa9XYBkwgWlxBDpUqpUmaSO2jBVaClDjEgVxfXzuFHm8769Hs7Kzh6bLbWiehjuVeRjbpYdsSMt8XpVxH9mo5eQzsJwbLjRJi9C7yRgkGr+J45GthlUVkz/hCHIhHKQk86oQ4JDSkge+6vuf2fddzQod4NoNZrHkM2klMD+o5gDqoJVW+4bJmwPNDkmaMOjh0KaAWwk6odMTiJBnjvkcAfWOQfCdYmmWxtXxbLQDdMeT7RtbqyrQHQB2ARm3Zpq6rAULn87lXSsl7qgFk+oB+HcwaUx21zqUsmLcaV28vCT9NPlE2/Zyko2szLVJyXswjQIYBBa8FczDxsUOIhcMBpQMnBHTvA98ZA3pjom23ACozI25fzMPfBuiYlb5Ct0CHQFyqvRSaoaP7qQH9Gh4+mwDzWkeTfxTV7UHNw4lMtgHNgps/PBTzOsZeZGK9k4xiqbMhfRzcJQ0AZGRQezHUXltX/37BF32lt8g=",
    //                "TermUrl": "https://wpay.uniteller.ru/api/1/iapay",
    //                "MD": "557606501"
    //            },
    //            "Type": 0,
    //            "ResultCode": 0,
    //            "InnaTermUrl": "/api/v1/uniteller/PaymentRederect",
    //            "Status": 1,
    //            "Data": "{\"redirect\":\"https://3ds.rencredit.ru:3443/way4acs/pa?id=VeReq14551845290915958633643763429214\",\"PaReq\":\"eJxVUtlugzAQ/BXEa9XYBkwgWlxBDpUqpUmaSO2jBVaClDjEgVxfXzuFHm8769Hs7Kzh6bLbWiehjuVeRjbpYdsSMt8XpVxH9mo5eQzsJwbLjRJi9C7yRgkGr+J45GthlUVkz/hCHIhHKQk86oQ4JDSkge+6vuf2fddzQod4NoNZrHkM2klMD+o5gDqoJVW+4bJmwPNDkmaMOjh0KaAWwk6odMTiJBnjvkcAfWOQfCdYmmWxtXxbLQDdMeT7RtbqyrQHQB2ARm3Zpq6rAULn87lXSsl7qgFk+oB+HcwaUx21zqUsmLcaV28vCT9NPlE2/Zyko2szLVJyXswjQIYBBa8FczDxsUOIhcMBpQMnBHTvA98ZA3pjom23ACozI25fzMPfBuiYlb5Ct0CHQFyqvRSaoaP7qQH9Gh4+mwDzWkeTfxTV7UHNw4lMtgHNgps/PBTzOsZeZGK9k4xiqbMhfRzcJQ0AZGRQezHUXltX/37BF32lt8g=\",\"TermUrl\":\"https://wpay.uniteller.ru/api/1/iapay\",\"MD\":\"557606501\"}"
    //        });
    //    }).then((data)=> {
    //            return dispatch({
    //                type: BUY_PAGE_PAY,
    //                data: data
    //            })
    //        })
    //};

    return (dispatch, getState) => {
        var field = 'pay';
        var ACTION_NAME = BUY_PAGE_PAY;

        return apiClient.post(apiUrls.Pay, params).then((data) => {
            console.log(`action ${field} from api`);

            return dispatch({
                type: ACTION_NAME,
                data: data
            });
        }).catch((err, data)=> {
            console.log(`fail action ${field} from api`);

            return dispatch({
                type: ACTION_NAME,
                data: null,
                err: err
            });
        })
    }
}

export function setFrameData(data) {
    return {
        type: BUY_PAGE_SET_FRAME_DATA,
        data: data
    }
}

export function setBuySuccessData(data) {
    return {
        type: SET_BUY_SUCCESS_DATA,
        data: data
    }
}