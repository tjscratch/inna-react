import ActionTypes from '../constants/ActionTypes';

export function setStarFilterHotels (key, params) {
  return (dispatch, getState) => {
    let {searchHotels} = getState();
    dispatch(setFiltersHotel(key, params));
    dispatch(filtrateHotels());
  }
}

function setFiltersHotel (key, value) {
  return {
    type: ActionTypes.SET_FILTER_HOTELS,
    key,
    value
  }
}

function filtrateHotels () {
  return {
    type: ActionTypes.FILTRATE_HOTELS
  }
}
