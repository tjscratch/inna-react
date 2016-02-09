import { SEARCH_HOTELS, FLUSH_HOTELS } from '../actions/action_search_hotels';
import ActionTypes from '../constants/ActionTypes';
import _ from 'lodash';
import { processWithIsServer } from './helper';

export default function reducerSearchHotels (state = null, action = null) {
  switch (action.type) {
    case SEARCH_HOTELS:
      return processWithIsServer(state, action);
    case ActionTypes.FILTER_HOTELS:
      var Hotels = {};
      Object.assign(Hotels, state);
      Hotels.Hotels = _.filter(Hotels.Hotels, {Stars: action.params});
      return Hotels;
    case FLUSH_HOTELS:
      return null;
    default:
      return state;
  }
}
