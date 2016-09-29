/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import request from 'superagent';
//import ExecutionEnvironment from 'fbjs/lib/ExecutionEnvironment';
import {canUseDOM} from 'fbjs/lib/ExecutionEnvironment';
import SessionStorageHelper from '../helpers/SessionStorageHelper.js';

if (__DEV__) {
  var apiPath = 'http://lh.m.inna.ru/api/v1';
  var apiPathServer = 'http://lh.m.inna.ru/api/v1';
} else {
  var apiPath = 'https://m.inna.ru/api/v1';
  var apiPathServer = 'http://api.inna.ru/api/v1';
}


const getUrl = (path) => {
  if (path.startsWith('http') || path.startsWith('https')) {
    return path;
  }
  else {//на сервере - делаем запросы напрямую в api.inna.ru, на клиенте - через m.inna.ru
    return canUseDOM ? `${apiPath}${path}` : `${apiPathServer}${path}`;
  }
};

const getUrlLocal = (path) => {
  if (path.startsWith('http') || path.startsWith('https')) {
    return path;
  }
  else {
    //return `${apiLocalPath}${path}`;
    //return `${apiPath}${path}`;
    return canUseDOM ? `${apiPath}${path}` : `${apiPathServer}${path}`;
  }
};

const ApiClient = {

  get: (path, params) => new Promise((resolve, reject) => {
    console.log(getUrl(path));
    request
      .get(getUrl(path))
      .query(params)
      .set('Accept', 'application/json')
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
    console.log(getUrl(path));
    console.log(params);
    request
      .post(getUrlLocal(path))
      //.type('form')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send(params)
      .set('Accept', 'application/json')
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

  postForm: (path, params) => new Promise((resolve, reject) => {
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
  test: (isSuccess) => new Promise((resolve, reject)=> {
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
    Object.keys(params).forEach((key)=> {
      prms.push(key + '=' + params[key]);
    });
  }
  return path + prms.join('&');
}

export default ApiClient;
