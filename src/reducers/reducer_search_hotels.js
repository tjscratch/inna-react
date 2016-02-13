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

      //console.log(action)

      searchHotels.hotelsFilters[action.key][action.value]['Selected'] = true;
        //searchHotels.hotelsFilters[action.key][action.value]['Selected'] ? false : true;

      return searchHotels;


    case ActionTypes.FILTRATE_HOTELS:
      var Hotels = {};
      Object.assign(Hotels, state);
      //Hotels.Hotels = _.filter(Hotels.hotelsNoFiltered, {Stars: action.filters});
      Hotels.Hotels = _.filter(Hotels.hotelsNoFiltered, function (item){
        let filter = Hotels.hotelsFilters.Stars[item.Stars];
        return filter ? filter.Selected : false;
      });
      return Hotels;

    case FLUSH_HOTELS:
      return null;

    default:
      return state;

  }
}
