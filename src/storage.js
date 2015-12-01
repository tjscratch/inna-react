import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import api from './core/ApiClient';
import SessionStorageHelper from './helpers/SessionStorageHelper.js';

//Singleton - хранилище
var storage = (function () {
    var mem = {};

    function getApiCachedDataByUrl(url) {
        return new Promise((resolve, reject)=> {
            let key = url;
            if (canUseDOM) {
                let data = SessionStorageHelper.getItem(key);
                if (data) {
                    console.log('client', url, 'from cache');
                    resolve(JSON.parse(data));
                }
                else {
                    api.get(url).then((data)=> {
                        //сохраняем данные
                        if (data) {
                            SessionStorageHelper.setItem(key, JSON.stringify(data));
                        }

                        console.log('client', url, 'from api');
                        resolve(data);
                    });
                }
            }
            else {
                //кэш на ноде
                if (mem[key]) {
                    console.log('server', url, 'from cache');
                    let data = mem[key];
                    resolve(data);
                }
                else {
                    api.get(url).then((data)=> {
                        if (data) {
                            mem[key] = data;
                        }

                        console.log('server', url, 'from api');
                        resolve(data);
                    });
                }
            }
        });
    }

    function getPageData(context, dataApiCalls) {
        //console.log('getPageData', context, dataApiCalls);
        return new Promise((resolve, reject)=> {
            if (canUseDOM && window.__INITIAL_STATE__) {
                console.log('getPageData from initial state');
                //если на клиенте, и есть данные для страницы - сразу возвращаем
                resolve(JSON.parse(window.__INITIAL_STATE__));
            }
            else {
                //делаем запросы в api по массиву урлов
                let dataPromises = dataApiCalls.map((url)=> {
                    return getApiCachedDataByUrl(url);
                });
                Promise.all(dataPromises).
                    then((results) => {
                        //сохраняем результаты для страницы в html
                        if (!canUseDOM && context && context.onSetInitialState) {
                            context.onSetInitialState(JSON.stringify(results));
                        }
                        //возвращаем
                        resolve(results);
                    });
            }
        });
    }

    return {
        getPageData: getPageData,
    }
})();

module.exports = storage;