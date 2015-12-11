import apiClient from '../core/ApiClient';
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import { processIf } from './action_index';

import apiUrls from '../constants/ApiUrls';

export const GET_MAIN_PAGE = 'GET_MAIN_PAGE';

export function getMainPageData(sectionId) {
    return (dispatch, getState) => {
        return processIf(dispatch, getState(), 'main', GET_MAIN_PAGE, ()=> {
            return apiClient.get(`${apiUrls.SectionGet}${sectionId}`)
        });

        //return apiClient.get(`${apiUrls.SectionGet}${sectionId}`)
        //    .then((data)=> {
        //        console.log(`action getMainPageData from api`);
        //        dispatch({
        //            type: GET_MAIN_PAGE,
        //            data: data,
        //            isFromServer: !canUseDOM
        //        });
        //    })
        //    .catch((err)=> {
        //        console.log(`fail action getMainPageData from api`);
        //        dispatch({
        //            type: GET_MAIN_PAGE,
        //            data: null,
        //            isFromServer: !canUseDOM
        //        });
        //    })
    }
}