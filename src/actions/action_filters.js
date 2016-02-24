import ActionTypes from '../constants/ActionTypes';

export function setEnumFilterHotels (key, item, selected) {
    return (dispatch) => {
        dispatch(setFiltersHotelEnum(key, item, selected));
        dispatch(filtrateHotels());
    }
}

function setFiltersHotelEnum (key, item, value) {
    return {
        type: ActionTypes.SET_FILTER_HOTELS,
        key,
        item,
        value
    }
}

export function setRangeFilterHotels (key, value) {
    return (dispatch) => {
        dispatch(setFiltersHotelRange(key, value));
        dispatch(filtrateHotels());
    }
}

function setFiltersHotelRange (key, value) {
    return {
        type: ActionTypes.SET_FILTER_HOTELS,
        typeFilter: 'range',
        key,
        value
    }
}

function filtrateHotels () {
    return {
        type: ActionTypes.FILTRATE_HOTELS
    }
}
