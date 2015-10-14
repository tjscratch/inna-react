import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import Location from './Location';

let LocationHelper = (function () {

    //добавить или заменить параметры в query string'е (name value)
    function setSearchParamsWithHash(paramsArray, hashValue, state) {
        //console.log('setSearchParamsWithHash', paramsArray, hashValue, state);

        if (hashValue) {
            hashValue = '#' + hashValue;
        }

        //отрезаем ?
        var search = location.search.substring(1);

        //разбиваем по параметрам имя значение
        var nameValues = search.split('&');
        var params = [];
        nameValues.forEach((nv)=>{
            if (nv) {
                var splitPrm = nv.split('=');
                var name = splitPrm[0];
                var value = splitPrm[1];
                params.push({name: name, value: value});
            }
        });

        //много параметров
        paramsArray.forEach((setPrm)=>{
            //ищем в параметрах наш параметр
            var prmExists = false;
            params.forEach((prm)=>{
                if (prm.name == setPrm.name) {
                    prmExists = true;
                    prm.value = setPrm.value;
                }
            });

            //если не нашли - добавляем новый
            if (!prmExists) {
                params.push({name: setPrm.name, value: setPrm.value});
            }
        });


        //готовим массив имя=значение
        var nameValueStrings = [];
        params.forEach((prm)=>{
            nameValueStrings.push(`${prm.name}=${prm.value}`);
        });

        //склеиваем окончательную строку
        var searchString = `?${nameValueStrings.join('&')}`;
        //console.log('searchString', searchString);

        Location.pushState(state, location.pathname + searchString + hashValue);
    }

    //добавляет или заменяет параметр в queryString'е
    //до 4 одновременно
    function setSearchParam(name1, value1, name2, value2, name3, value3, name4, value4) {
        //console.log('setSearchParam', name1, value1);

        var paramsArray = [];
        paramsArray.push({name: name1, value: value1});

        if (name2 != undefined) {
            paramsArray.push({name: name2, value: value2});
        }
        if (name3 != undefined) {
            paramsArray.push({name: name3, value: value3});
        }
        if (name4 != undefined) {
            paramsArray.push({name: name4, value: value4});
        }

        setSearchParamsWithHash(paramsArray, null, null);
    }

    function setHash(hashValue, state) {
        //console.log('setHash', hashValue, state);

        if (hashValue) {
            hashValue = '#' + hashValue;
            Location.pushState(state, location.pathname + location.search + hashValue);
        }
    }

    return {
        setSearchParam: setSearchParam,
        setHash: setHash,
        setSearchParamsWithHash: setSearchParamsWithHash,
    };
})();

export default LocationHelper;