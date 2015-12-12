import apiClient from '../core/ApiClient';
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import { process, processIf, processIfNotExists, multiProcessIf, multiProcessIfNotExists } from './action_index';

import apiUrls from '../constants/ApiUrls';

export const GET_HOTEL_DETAILS = 'GET_HOTEL_DETAILS';
export const GET_HOTEL_ROOMS = 'GET_HOTEL_ROOMS';

export function getHotelDetails(params) {
    return (dispatch, getState) => {
        var field = 'hotelDetails';
        var ACTION_NAME = GET_HOTEL_DETAILS;

        return apiClient.get(apiUrls.HotelDetails, params).then((data) => {
            console.log(`action ${field} from api`);

            dispatch({
                type: ACTION_NAME,
                data: data
            });
        }).catch((err, data)=> {
            console.log(`fail action ${field} from api`);

            dispatch({
                type: ACTION_NAME,
                data: null
            });
        })
    }
}

export function getHotelRooms(params) {
    return (dispatch, getState) => {
        var field = 'hotelRooms';
        var ACTION_NAME = GET_HOTEL_ROOMS;

        return apiClient.get(apiUrls.HotelDetails, params).then((data) => {
            console.log(`action ${field} from api`);

            dispatch({
                type: ACTION_NAME,
                data: data
            });
        }).catch((err, data)=> {
            console.log(`fail action ${field} from api`);

            dispatch({
                type: ACTION_NAME,
                data: null
            });
        })
    }
}