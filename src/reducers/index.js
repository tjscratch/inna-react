import { combineReducers } from 'redux';
import main from './reducer_main';
import directory from './reducer_directory';
import searchTickets from './reducer_search_tickets';
import searchHotels from './reducer_search_hotels';
import searchRecommended from './reducer_search_recommended';
import hotelDetails from './reducer_hotel_details';
import reservation from './reducer_reservation';

const rootReducer = combineReducers({
    main,
    directory,
    searchTickets,
    searchHotels,
    searchRecommended,
    hotelDetails,
    reservation
});

export default rootReducer;
