import { SEARCH_HOTELS, FLUSH_HOTELS } from '../actions/action_search_hotels';
import ActionTypes from '../constants/ActionTypes';
import { generateFilters } from '../filtersHelpers/generateFilters';
import Filtrate from '../filtersHelpers/filtrate';

export default function reducerSearchHotels (state = null, action = null) {
    switch (action.type) {

        case SEARCH_HOTELS:
            var data = action.data;
            return Object.assign({}, state, {
                ...data,
                hotelsFilters: generateFilters(data.Filters.Hotels),
                hotelsNoFiltered: data.Hotels,
                isFromServer: action.isFromServer
            });

        case ActionTypes.SET_FILTER_HOTELS:
            let searchHotels = {};
            Object.assign(searchHotels, state);
            if (action.typeFilter == 'range') {
                searchHotels.hotelsFilters[action.key]['SelectedMin'] = action.value.Min;
                searchHotels.hotelsFilters[action.key]['SelectedMax'] = action.value.Max;
            } else {
                searchHotels.hotelsFilters[action.key][action.item]['Selected'] = action.value;
            }
            return searchHotels;

        case ActionTypes.FILTRATE_HOTELS:
            var Hotels = {};
            Object.assign(Hotels, state);

            let filtrate = new Filtrate(Hotels.hotelsNoFiltered, Hotels.hotelsFilters);
            Hotels.Hotels = filtrate.result();

            return Hotels;

        case FLUSH_HOTELS:
            return null;

        default:
            return state;

    }
}


