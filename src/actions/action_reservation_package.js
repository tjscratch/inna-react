import apiClient from '../core/ApiClient';
import {canUseDOM} from 'fbjs/lib/ExecutionEnvironment';

import apiUrls from '../constants/ApiUrls';
import {getParamsForHotelDetails, getParamsForCheckAvailability, getParamsForMakeReservation} from '../helpers/apiParamsHelper';
import ActionTypes from '../constants/ActionTypes';

export const RESERVATION_GET_HOTEL_DETAILS = 'RESERVATION_GET_HOTEL_DETAILS';
export const RESERVATION_CHECK_AVAILABILITY = 'RESERVATION_CHECK_AVAILABILITY';
export const MAKE_RESERVATION = 'MAKE_RESERVATION';

export function getResevationPackageData(params) {
    return (dispatch, getState) => {
        
        dispatch({
            type: ActionTypes.RESERVATION_PACKAGE_DATA_GET
        });
        
        return apiClient.get(apiUrls.HotelDetails, params)
            .then((data) => {
                dispatch({
                    type: ActionTypes.RESERVATION_PACKAGE_DATA_SUCCESS,
                    data: data
                });
            })
            .catch((error, data)=> {
                dispatch({
                    type: ActionTypes.RESERVATION_PACKAGES_DATA_ERROR,
                    data: null,
                    error: error
                });
            })
        
    }
}

export function getResevationIsPackageAvailable(params) {
    return (dispatch, getState) => {
        
        dispatch({
            type: ActionTypes.RESERVATION_PACKAGE_AVAILABLE_GET
        })
        
        return apiClient.get(apiUrls.IsPackageAvailable, params)
            .then((data) => {
                return dispatch({
                    type: ActionTypes.RESERVATION_PACKAGE_AVAILABLE_SUCCESS,
                    data: data
                });
            })
            .catch((error, data)=> {
                return dispatch({
                    type: ActionTypes.RESERVATION_PACKAGE_AVAILABLE_ERROR,
                    data: null,
                    error: error
                });
            })
    }
}
