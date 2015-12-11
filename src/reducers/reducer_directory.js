import { GET_DIRECTORY_BY_ID } from '../actions/action_directory';
import { processWithIsServer, multiProcessWithIsServer } from './helper';

export default function reducerMain(state = null, action = null) {
    switch (action.type) {
        case GET_DIRECTORY_BY_ID:
            return multiProcessWithIsServer(state, action);
        default:
            return state;
    }
}
