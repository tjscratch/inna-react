import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import api from './core/ApiClient';


var storage = (function () {
    var mem = {};

    function get(key) {

    }

    function set(key, value) {

    }

    function getSectionData(sectionId) {
        return new Promise((resolve, reject)=> {
            let key = `getSectionData_${sectionId}`;
            if (canUseDOM) {
                var data = sessionStorage.getItem(key);
                if (data) {
                    console.log('client getSectionData', sectionId, 'from cache');
                    resolve(JSON.parse(data));
                }
                else {
                    api.get(`/Section/Get/${sectionId}`).then((data)=> {
                        //сохраняем данные
                        if (data) {
                            sessionStorage.setItem(key, JSON.stringify(data));
                        }

                        console.log('client getSectionData', sectionId, 'from api');
                        resolve(data);
                    });
                }
            }
            else {
                //кэш на ноде
                if (mem[key]) {
                    console.log('server getSectionData', sectionId, 'from cache');
                    resolve(mem[key]);
                }
                else {
                    api.get(`/Section/Get/${sectionId}`).then((data)=> {
                        if (data) {
                            mem[key] = data;
                        }

                        console.log('server getSectionData', sectionId, 'from api');
                        resolve(data);
                    });
                }
            }
        });
    }

    return {
        getSectionData: getSectionData,
        get: get,
        set: set
    }
})();

module.exports = storage;