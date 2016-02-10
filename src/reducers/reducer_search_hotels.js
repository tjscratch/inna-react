import { SEARCH_HOTELS, FLUSH_HOTELS } from '../actions/action_search_hotels';
import ActionTypes from '../constants/ActionTypes';
import _ from 'lodash';

export default function reducerSearchHotels (state = null, action = null) {
  switch (action.type) {

    case SEARCH_HOTELS:
      //return processWithIsServer(state, action);
      var data = action.data;
      console.log("=======");
      console.log(data);
      return Object.assign({}, state, {
        ...data,
        hotelsNoFiltered: data.Hotels,
        isFromServer: action.isFromServer
      });

    case ActionTypes.FILTER_HOTELS:
      var Hotels = {};
      Object.assign(Hotels, state);
      Hotels.Hotels = _.filter(Hotels.hotelsNoFiltered, {Stars: action.params});
      return Hotels;

    case FLUSH_HOTELS:
      return null;

    default:
      return state;

  }
}
