import { GET_COUNTRIES } from '../actions/action_directory';
import { processWithIsServer, multiProcessWithIsServer } from './helper';

export default function reducerCountries(state = null, action = null) {
    switch (action.type) {
        case GET_COUNTRIES:
            return action.data;
        default:
            return state;
    }
}
