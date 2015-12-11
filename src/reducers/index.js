import { combineReducers } from 'redux';
import main from './reducer_main';
import directory from './reducer_directory';

const rootReducer = combineReducers({
    main,
    directory
});

export default rootReducer;
