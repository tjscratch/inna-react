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

    get: path => new Promise((resolve, reject) => {
        request
            .get(getUrl(path))
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
    })

};

export default ApiClient;
