import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import configureStore from './configureStore';

var store = null;

export function createStore() {
    //console.log('creating store');
    var initialState = canUseDOM ? window.__INITIAL_STATE__ : {};
    //console.log('store init, initial state:', initialState);
    store = configureStore(initialState);
    console.log('store:', store ? 'store created' : 'store is null');
    return store;
}

export function getStore()  {
    if (!store) {
        console.log('getStore: store is null!!!');
    }
    return store;
}

export default store;