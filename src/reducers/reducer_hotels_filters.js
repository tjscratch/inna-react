import ActionTypes from '../constants/ActionTypes';
import { FILTER_HOTELS } from '../actions/action_search_hotels';
import lodash from 'lodash';

export default function reducerFilters (state = null, action = null) {

  switch (action.type) {

    case ActionTypes.SET_FILTERS_HOTELS:
      let hotels = {
        star: []
      };
      Object.assign(hotels, state);
      let stars = hotels.star;
      stars.push(action.star);
      hotels.star = lodash.uniq(stars);
      return hotels

    default:
      return state;

  }

}
