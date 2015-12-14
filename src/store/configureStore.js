import { compose, createStore, applyMiddleware } from 'redux';
import { devTools, persistState } from 'redux-devtools';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index.js';
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';

//const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

var createStoreWithMiddleware = canUseDOM && __DEV__?
    compose(
        // Enables your middleware:
        applyMiddleware(thunk), // any Redux middleware, e.g. redux-thunk
        // Provides support for DevTools:
        devTools(),
        // Lets you write ?debug_session=<name> in address bar to persist debug sessions
        persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    )(createStore) :
    applyMiddleware(thunk)(createStore);


export default function configureStore(initialState) {
    var store = createStoreWithMiddleware(rootReducer, initialState);

    //if (module.hot) {
    //    // Enable Webpack hot module replacement for reducers
    //    module.hot.accept('../reducers', () => {
    //        const nextRootReducer = require('../reducers')
    //        store.replaceReducer(nextRootReducer)
    //    })
    //}

    return store;
}
