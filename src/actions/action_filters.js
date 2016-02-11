import ActionTypes from '../constants/ActionTypes';

export function setStarFilterHotels (params) {
  return dispatch => {
    dispatch(setFiltersHotel(params));
    dispatch(filtrateHotels());
  }
}

function setFiltersHotel (filter) {
  return {
    type: ActionTypes.SET_FILTERS_HOTELS,
    star: filter
  }
}

function filtrateHotels () {
  return{
    type: FILTRATE_HOTELS
  }
}
