import { SET_BUY_PAGE_IS_LOADING, GET_BUY_PAGE_DATA, GET_PAYMENT_REPRICING } from '../actions/action_buy';
import { processWithIsServer, multiProcessWithIsServer } from './helper';

export default function reducerBuy(state = null, action = null) {
    switch (action.type) {
        case SET_BUY_PAGE_IS_LOADING:
            var { data, err } = action;
            return Object.assign({}, {
                ...state,
                isLoading: data.isLoading
            });
        case GET_BUY_PAGE_DATA:
            var { data, err } = action;
            return Object.assign({}, {
                ...state,
                ...data,
                err: err
            });
        case GET_PAYMENT_REPRICING:
            var { data, err } = action;

            if (data) {
                switch (data.Type) {
                    case 1: break;//все норм
                    case 2: state.Price = data.NewPrice; break;//цена изменилась - проставляем цену
                    case 3: break;//Перелет недоступен
                    case 4: break;//Отель недоступен
                }
            }

            return Object.assign({}, {
                ...state,
                repricing: {
                    ...data,
                    err: err
                }
            });
        default:
            return state;
    }
}
