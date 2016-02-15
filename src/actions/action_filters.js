import ActionTypes from '../constants/ActionTypes';

export function setStarFilterHotels (key, item, selected) {
  return (dispatch, getState) => {
    let {searchHotels} = getState();
    dispatch(setFiltersHotel(key, item, selected));
    dispatch(filtrateHotels());
  }
}

function setFiltersHotel (key, item, value) {
  return {
    type: ActionTypes.SET_FILTER_HOTELS,
    key,
    item,
    value
  }
}

function filtrateHotels () {
  return {
    type: ActionTypes.FILTRATE_HOTELS
  }
}
