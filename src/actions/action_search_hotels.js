import apiClient from '../core/ApiClient';
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import { processIf, processIfNotExists, multiProcessIf, multiProcessIfNotExists } from './action_index';
import { SET_RECOMMENDED, RECOMMENDED__CHANGE_HOTEL } from './action_search_recommended';

import apiUrls from '../constants/ApiUrls';

export const SEARCH_HOTELS = 'SEARCH_HOTELS';
export const FLUSH_HOTELS = 'FLUSH_HOTELS';

export function searchHotels(params) {
    return (dispatch, getState) => {
        //return processIfNotExists(dispatch, getState(), 'searchHotels', SEARCH_HOTELS, ()=> {
        //    return apiClient.get(apiUrls.PackagesSearchHotels, params)
        //        .then((data)=>{
        //            setRecommended(dispatch, getState, data);
        //        })
        //});

        var field = 'searchHotels';
        var ACTION_NAME = SEARCH_HOTELS;

        return apiClient.get(apiUrls.PackagesSearchHotels, params).then((data) => {
            console.log(`action ${field} from api`);

            setRecommended(dispatch, getState, data);

            dispatch({
                type: ACTION_NAME,
                data: data
            });
        }).catch((err, data)=> {
            console.log(`fail action ${field} from api`);

            setRecommended(dispatch, getState, null);

            dispatch({
                type: ACTION_NAME,
                data: null
            });
        })
    }
}

export function changeHotel(hotel, packagePrice) {
    return {
        type: RECOMMENDED__CHANGE_HOTEL,
        data: {
            Hotel: hotel,
            PackagePrice: packagePrice
        }
    }
}

export function flushHotels() {
    return {
        type: FLUSH_HOTELS
    }
}

function setRecommended(dispatch, getState, data) {
    //console.log('hotels setRecommended, data', data);

    let recPair = null;
    var defaultRecommendedPair = null;
    if (data) {
        var { recommendedData } = getState();
        recPair = data.RecommendedPair;
        //добавляем доп поля для карточки авиа и отеля
        //recPair.AviaInfo.CurrentListType = this.state.listType;
        //recPair.Hotel.CurrentListType = this.state.listType;

        recPair.AviaInfo.TicketsCount = recommendedData ? recommendedData.AviaInfo.TicketsCount : null;
        recPair.Hotel.HotelsCount = data.HotelCount;

        //пока так, потом будет приходить нормальная сразу в объекте
        recPair.PackagePrice = recommendedData ? recommendedData.PackagePrice : data.RecommendedPair.Hotel.PackagePrice;

        defaultRecommendedPair = data.DefaultRecommendedPair;
    }

    dispatch({
        type: SET_RECOMMENDED,
        data: {
            recommendedData: recPair,
            defaultRecommendedPair: defaultRecommendedPair
        }
    });
}