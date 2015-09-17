/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import request from 'superagent';
import ExecutionEnvironment from 'fbjs/lib/ExecutionEnvironment';

const apiPath = 'https://api.inna.ru/api/v1';
const getUrl = (path) => {
    //path.startsWith('http')
    if (path.startsWith('http') || path.startsWith('https')) {
        return path;
    }
    else {
        return `${apiPath}${path}`;
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
                        reject(err);
                    }
                } else {
                    resolve(res.body);
                }
            });
    }),

    cachedGet: (path, params) => new Promise((resolve, reject) => {
        var key = getKey(path, params);
        var res = sessionStorage.getItem(key);
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
                        sessionStorage.setItem(key, JSON.stringify(res.body));
                        resolve(res.body);
                    }
                });
        }
    })
};

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
