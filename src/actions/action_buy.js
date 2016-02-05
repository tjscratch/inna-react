import apiClient from '../core/ApiClient';
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import { process, processIf, processIfNotExists, multiProcessIf, multiProcessIfNotExists } from './action_index';

import apiUrls from '../constants/ApiUrls';

export const GET_BUY_PAGE_DATA = 'GET_BUY_PAGE_DATA';

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
