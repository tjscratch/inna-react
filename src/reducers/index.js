import { combineReducers } from 'redux';
import main from './reducer_main';
import directory from './reducer_directory';
import searchTickets from './reducer_search_tickets';
import searchHotels from './reducer_search_hotels';
import searchRecommended from './reducer_search_recommended';
import hotelDetails from './reducer_hotel_details';
import reservation from './reducer_reservation';
import reservation_is_available from './reducer_reservation_is_available';
import makeReservation from './reducer_make_reservation';
import buyPage from './reducer_buy';
import countries from './reducer_countries';

import form from './reducer_form';

const rootReducer = combineReducers({
    main,
    directory,
    countries,
    searchTickets,
    searchHotels,
    searchRecommended,
    hotelDetails,
    reservation,
    reservation_is_available,
    makeReservation,
    buyPage,
    form
});

export default rootReducer;
