import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';

//проверяет, если данные уже пришли с сервера - то не запрашивает их из API
//повторный вызов с клиента - приведет к запросу данных из API
export function processIf(dispatch, state, field, ACTION_NAME, getDataCallback) {
    if (state && state[field] && state[field].isFromServer) {
        console.log(`action ${field} from store`);

        return dispatch({
            type: ACTION_NAME,
            data: state[field],
            isFromServer: !canUseDOM
        });
    }
    else {
        return getDataCallback().then((data) => {
            console.log(`action ${field} from api`);

            dispatch({
                type: ACTION_NAME,
                data: data,
                isFromServer: !canUseDOM
            });
        }).catch((err, data)=>{
            console.log(`fail action ${field} from api`);

            dispatch({
                type: ACTION_NAME,
                data: null,
                isFromServer: !canUseDOM
            });
        })
    }
}

export function multiProcessIf(dispatch, state, field, ACTION_NAME, key, getDataCallback) {
    if (state && state[field] && state[field][key] && state[field][key].isFromServer) {
        console.log(`action ${field} ${key} from store`);

        return dispatch({
            type: ACTION_NAME,
            data: state[field][key],
            key: key,
            isFromServer: !canUseDOM
        });
    }
    else {
        return getDataCallback().then((data) => {
            console.log(`action ${field} ${key} from api`);

            dispatch({
                type: ACTION_NAME,
                data: data,
                key: key,
                isFromServer: !canUseDOM
            });
        }).catch((err, data)=>{
            console.log(`fail action ${field} ${key} from api`);

            dispatch({
                type: ACTION_NAME,
                data: null,
                key: key,
                isFromServer: !canUseDOM
            });
        })
    }
}

export function processIfNotExists(dispatch, state, field, ACTION_NAME, getDataCallback) {
    if (state && state[field]) {
        console.log(`action ${field} from store`);
    }
    else {
        return getDataCallback().then((data) => {
            console.log(`action ${field} from api`);

            dispatch({
                type: ACTION_NAME,
                data: data,
                isFromServer: !canUseDOM
            });
        }).catch((err, data)=>{
            console.log(`fail action ${field} from api`);

            dispatch({
                type: ACTION_NAME,
                data: null,
                isFromServer: !canUseDOM
            });
        })
    }
}

export function multiProcessIfNotExists(dispatch, state, field, ACTION_NAME, key, getDataCallback) {
    if (state && state[field] && state[field][key]) {
        console.log(`action ${field} ${key} from store`);
    }
    else {
        return getDataCallback().then((data) => {
            console.log(`action ${field} ${key} from api`);

            dispatch({
                type: ACTION_NAME,
                data: data,
                key: key,
                isFromServer: !canUseDOM
            });
        }).catch((err, data)=>{
            console.log(`fail action ${field} ${key} from api`);

            dispatch({
                type: ACTION_NAME,
                data: null,
                key: key,
                isFromServer: !canUseDOM
            });
        })
    }
}
