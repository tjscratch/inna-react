export function processWithIsServer(state, action) {
    var data = action.data;
    return Object.assign({}, state, {
        ...data,
        isFromServer: action.isFromServer
        //isFromServer: false //Debug - так данные всегда запрашиваются на клиенте
    });
}