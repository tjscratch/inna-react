export function processWithIsServer(state, action) {
    var data = action.data;
    return Object.assign({}, state, {
        ...data,
        isFromServer: action.isFromServer
        //isFromServer: false //Debug - так данные всегда запрашиваются на клиенте
    });
}

export function multiProcessWithIsServer(state, action) {
    var { data, key } = action;

    if (state == null) {
        state = {};
    }

    state[key] = Object.assign({}, {
        ...data,
        isFromServer: action.isFromServer
        //isFromServer: false //Debug - так данные всегда запрашиваются на клиенте
    });

    return state;
}