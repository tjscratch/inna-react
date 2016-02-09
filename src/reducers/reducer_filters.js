import ActionTypes from '../constants/ActionTypes';
import { FILTER_HOTELS } from '../actions/action_search_hotels';

export default function reducerFilters (state = null, action = null, data = null) {
  switch (action.type) {
    case ActionTypes.LOAD_HOTEL_FILTERS:
      return Object.assign({}, state, {
        DP: action,
        st: action.newState
      });
    default:
      return state;
  }
}
