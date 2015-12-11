import { combineReducers } from 'redux';
import main from './reducer_main';
import directory from './reducer_directory';
import searchTickets from './reducer_search_tickets';
import searchHotels from './reducer_search_hotels';
import searchRecommended from './reducer_search_recommended';

const rootReducer = combineReducers({
    main,
    directory,
    searchTickets,
    searchHotels,
    searchRecommended
});

export default rootReducer;
