import apiClient from '../core/ApiClient';
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import { processIf, processIfNotExists, multiProcessIf, multiProcessIfNotExists } from './action_index';
import { SET_RECOMMENDED, RECOMMENDED__CHANGE_TICKET } from './action_search_recommended';

import apiUrls from '../constants/ApiUrls';

export const SEARCH_TICKETS = 'SEARCH_TICKETS';
export const FLUSH_TICKETS = 'FLUSH_TICKETS';

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

            return dispatch({
                type: ACTION_NAME,
                data: data
            });
        }).catch((err, data)=> {
            console.log(`fail action ${field} from api`);

            setRecommended(dispatch, getState, null);

            return dispatch({
                type: ACTION_NAME,
                data: null
            });
        })
    }
}

export function changeTicket(ticket, packagePrice) {
    return {
        type: RECOMMENDED__CHANGE_TICKET,
        data: {
            AviaInfo: ticket,
            PackagePrice: packagePrice
        }
    }
}

export function flushTickets() {
    return {
        type: FLUSH_TICKETS
    }
}

function setRecommended(dispatch, getState, data) {
    //console.log('tickets setRecommended, state', getState());

    let recPair = null;
    var defaultRecPair = null;
    if (data) {
        var { searchRecommended } = getState();
        searchRecommended = searchRecommended ? searchRecommended : {};
        var { recommendedData, defaultRecommendedPair } = searchRecommended;

        recPair = recommendedData ? recommendedData : data.RecommendedPair;
        //добавляем доп поля для карточки авиа и отеля
        recPair.AviaInfo.TicketsCount = data.AviaInfos.length;
        recPair.Hotel.HotelsCount = data.HotelCount;

        //пока так, потом будет приходить нормальная сразу в объекте
        recPair.PackagePrice = recommendedData ? recommendedData.PackagePrice : data.RecommendedPair.Hotel.PackagePrice;

        defaultRecPair = defaultRecommendedPair ? defaultRecommendedPair : data.DefaultRecommendedPair;
    }

    return dispatch({
        type: SET_RECOMMENDED,
        data: {
            recommendedData: recPair,
            defaultRecommendedPair: defaultRecPair
        }
    });
}