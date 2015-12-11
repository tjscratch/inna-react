import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import { processIf, processIfNotExists, multiProcessIf, multiProcessIfNotExists } from './action_index';

import apiUrls from '../constants/ApiUrls';

export const SET_RECOMMENDED = 'SET_RECOMMENDED';
//
//export function getRecommended(data) {
//    dispatch({
//        type: GET_RECOMMENDED,
//        data: data
//    });
//}