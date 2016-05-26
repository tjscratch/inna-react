import apiClient from '../core/ApiClient';
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import { process, processIf, processIfNotExists, multiProcessIf, multiProcessIfNotExists } from './action_index';

import apiUrls from '../constants/ApiUrls';

export const RESERVATION_GET_HOTEL_DETAILS = 'RESERVATION_GET_HOTEL_DETAILS';
export const RESERVATION_CHECK_AVAILABILITY = 'RESERVATION_CHECK_AVAILABILITY';
export const MAKE_RESERVATION = 'MAKE_RESERVATION';

export function getHotelDetails (params) {
    return (dispatch, getState) => {
        var field = 'reservationHotelDetails';
        var ACTION_NAME = RESERVATION_GET_HOTEL_DETAILS;

        return apiClient.get(apiUrls.HotelDetails, params).then((data) => {
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

export function checkAvailability (params) {
    return (dispatch, getState) => {
        var field = 'packageAvailable';
        var ACTION_NAME = RESERVATION_CHECK_AVAILABILITY;

        return apiClient.get(apiUrls.IsPackageAvailable, params).then((data) => {
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

export function makeReservation (params) {
    return (dispatch, getState) => {
        var field = 'makeReservation';
        var ACTION_NAME = MAKE_RESERVATION;

        return apiClient.postForm(apiUrls.MakeReservation, params)
            .then((data) => {
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
