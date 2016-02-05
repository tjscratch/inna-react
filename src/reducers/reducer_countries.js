import { GET_COUNTRIES } from '../actions/action_directory';
import { processWithIsServer, multiProcessWithIsServer } from './helper';

export default function reducerCountries(state = null, action = null) {
    switch (action.type) {
        case GET_COUNTRIES:
            //return action.data;
            return action.data.map((item)=> {
                return {
                    name: item.Name,
                    value: item.Id
                }
            });
        default:
            return state;
    }
}
