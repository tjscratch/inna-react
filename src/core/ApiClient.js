/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import request from 'superagent';
import ExecutionEnvironment from 'fbjs/lib/ExecutionEnvironment';
import SessionStorageHelper from '../helpers/SessionStorageHelper.js';

//const apiPath = 'https://api.inna.ru/api/v1';
const apiPath = 'http://api.test.inna.ru/api/v1';
const apiLocalPath = 'http://localhost:3000/api/v1';

const getUrl = (path) => {
    if (path.startsWith('http') || path.startsWith('https')) {
        return path;
    }
    else {
        return `${apiPath}${path}`;
    }
};

const getUrlLocal = (path) => {
    if (path.startsWith('http') || path.startsWith('https')) {
        return path;
    }
    else {
        return `${apiLocalPath}${path}`;
    }
};

const ApiClient = {

    get: (path, params) => new Promise((resolve, reject) => {
        request
            .get(getUrl(path))
            .query(params)
            .accept('application/json')
            .end((err, res) => {
                if (err) {
                    if (err.status === 404) {
                        resolve(null);
                    } else {
                        //reject(err);
                        handleError(err, reject);
                    }
                } else {
                    resolve(res.body);
                }
            });
    }),

    post: (path, params) => new Promise((resolve, reject) => {
        request
            .post(getUrlLocal(path))
            .set('Content-Type', 'application/json')
            .send(params)
            .accept('application/json')
            .end((err, res) => {
                if (err) {
                    if (err.status === 404) {
                        resolve(null);
                    } else {
                        //reject(err);
                        handleError(err, reject);
                    }
                } else {
                    resolve(res.body);
                }
            });
    }),

    //postForm: (path, params) => new Promise((resolve, reject) => {
    //    request
    //        .post(getUrlLocal(path))
    //        .set('Content-Type', 'application/x-www-form-urlencoded')
    //        .send(params)
    //        .accept('application/json')
    //        .end((err, res) => {
    //            if (err) {
    //                if (err.status === 404) {
    //                    resolve(null);
    //                } else {
    //                    //reject(err);
    //                    handleError(err, reject);
    //                }
    //            } else {
    //                resolve(res.body);
    //            }
    //        });
    //}),

    cachedGet: (path, params) => new Promise((resolve, reject) => {
        var key = getKey(path, params);
        var res = SessionStorageHelper.getItem(key);
        if (res) {
            resolve(JSON.parse(res));
        }
        else {
            request
                .get(getUrl(path))
                .query(params)
                .accept('application/json')
                .end((err, res) => {
                    if (err) {
                        if (err.status === 404) {
                            resolve(null);
                        } else {
                            reject(err);
                        }
                    } else {
                        SessionStorageHelper.setItem(key, JSON.stringify(res.body));
                        resolve(res.body);
                    }
                });
        }
    }),

    //just for debug
    test: (isSuccess) => new Promise((resolve, reject)=>{
        if (isSuccess) {
            resolve(isSuccess);
        }
        else {
            reject(isSuccess);
        }
    })
};

function handleError(err, reject) {
    reject({
        message: err.response && err.response.body ? err.response.body.Message : err.message,
        status: err.status
    })
}

function getKey(path, params) {
    let prms = [];
    if (params) {
        Object.keys(params).forEach((key)=>{
            prms.push(key + '=' + params[key]);
        });
    }
    return path + prms.join('&');
}

export default ApiClient;
