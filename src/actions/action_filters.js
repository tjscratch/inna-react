import ActionTypes from '../constants/ActionTypes';

export function setStarFilterHotels (params) {
  return (dispatch, getState) => {
    dispatch(setFiltersHotel(params));
    let {hotelsFilters} = getState();
    dispatch(filtrateHotels(hotelsFilters));
  }
}

function setFiltersHotel (filter) {
  return {
    type: ActionTypes.SET_FILTERS_HOTELS,
    star: filter
  }
}

function filtrateHotels (filters) {
  return{
    type: ActionTypes.FILTRATE_HOTELS,
    filters
  }
}
