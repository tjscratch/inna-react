import apiClient from '../core/ApiClient';
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import { processIf, processIfNotExists, multiProcessIf, multiProcessIfNotExists } from './action_index';
import { SET_RECOMMENDED } from './action_search_recommended';

import apiUrls from '../constants/ApiUrls';

export const SEARCH_TICKETS = 'SEARCH_TICKETS';

export function searchTickets(params) {
    return (dispatch, getState) => {
        //return processIfNotExists(dispatch, getState(), 'searchTickets', SEARCH_TICKETS, ()=> {
        //    return apiClient.get(apiUrls.PackagesSearchTickets, params)
        //        .then((data)=>{
        //            setRecommended(dispatch, getState, data);
        //        })
        //});

        var field = 'searchTickets';
        var ACTION_NAME = SEARCH_TICKETS;

        return apiClient.get(apiUrls.PackagesSearchTickets, params).then((data) => {
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

function setRecommended(dispatch, getState, data) {
    console.log('tickets setRecommended, data', data);

    let recPair = null;
    var defaultRecommendedPair = null;
    if (data) {
        var { recommendedData } = getState();
        //добавляем доп поля для карточки авиа
        recPair = data.RecommendedPair;
        //recPair.AviaInfo.CurrentListType = this.state.listType;
        //recPair.Hotel.CurrentListType = this.state.listType;

        recPair.AviaInfo.TicketsCount = data.AviaInfos.length;
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