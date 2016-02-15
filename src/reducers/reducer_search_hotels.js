import { SEARCH_HOTELS, FLUSH_HOTELS } from '../actions/action_search_hotels';
import ActionTypes from '../constants/ActionTypes';
import { generateFilters } from '../helpers/generateFilters';
import _ from 'lodash';

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
      searchHotels.hotelsFilters[action.key][action.item]['Selected'] = action.value;
      return searchHotels;

    case ActionTypes.FILTRATE_HOTELS:
      var Hotels = {};
      Object.assign(Hotels, state);

      // находим активные фильтры по звездам
      let starFilters = _.find(Hotels.hotelsFilters.Stars, {'Selected': true});
      if(starFilters){
        Hotels.Hotels = _.filter(Hotels.hotelsNoFiltered, function (item) {
          let filter = Hotels.hotelsFilters.Stars[item.Stars];
          return filter ? filter.Selected : false;
        });
      }else{
        Hotels.Hotels = Hotels.hotelsNoFiltered;
      }

      // находим активные фильтры по звездам
      let typeFilters = _.find(Hotels.hotelsFilters.HotelType, {'Selected': true});
      if(typeFilters){
        Hotels.Hotels = _.filter(Hotels.Hotels, function (item) {
          let filter = Hotels.hotelsFilters.HotelType[item.HotelType];
          return filter ? filter.Selected : false;
        });
      }

      return Hotels;

    case FLUSH_HOTELS:
      return null;

    default:
      return state;

  }
}
