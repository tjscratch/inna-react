import ActionTypes from '../constants/ActionTypes';

//тестовый action - как пример как их можно писать
export function getFilters(params) {
    //вариант 1 - синхронный
    //вызывается в коде: getStore().dispatch(getTestData(false))
    //или в компоненте, если подключен через connect: dispatch(getTestData(false))

    if (params) {
        return {
            type: ActionTypes.LOAD_HOTEL_FILTERS,
            data: params
        }
    }
    else {
        return {
            type: ActionTypes.LOAD_HOTEL_FILTERS,
            data: false
        }
    }


    //вариант 2 - асинхронный - работает благодаря middleware - redux-thunk
    //вызывается или просто: getStore().dispatch(getTestData(false))
    //или так: await getStore().dispatch(getTestData(false))
    //или так, если хотим понять как завершился dispatch: getStore().dispatch(getTestData(false)).then((action)=>{})
    //Внимание! dispatch() всегда завершается успешно, т.е. dispatch().catch() - не бывает

    //return (dispatch, getState) => {
    //    return apiClient.test(isSuccess)
    //        .then(()=> {
    //            console.log('test data success');
    //            return dispatch({
    //                type: ActionTypes.LOAD_SHOES,
    //                data: true
    //            })
    //        }).catch(()=> {
    //            console.log('test data fails');
    //            return dispatch({
    //                type: ActionTypes.LOAD_SHOES,
    //                data: false
    //            })
    //        });
    //};

    //вариант 3 - через хелперную функцию
    //return (dispatch, getState) => {
    //    return processIf(dispatch, getState(), 'test', GET_TEST_DATA, ()=> {
    //        return apiClient.test(isSuccess);
    //    })
    //};
}