import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import Location from './Location';

let LocationHelper = (function () {

    //добавить или заменить параметры в query string'е (name value)
    function setSearchParamsWithHash(paramsArray, hashValue, state) {
        //console.log('setSearchParamsWithHash', paramsArray, hashValue, state);

        if (hashValue) {
            hashValue = '#' + hashValue;
        }
        else {
            hashValue = location.hash;
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
                if (prm.name == setPrm[0]) {
                    prmExists = true;
                    prm.value = setPrm[1];
                }
            });

            //если не нашли - добавляем новый
            if (!prmExists) {
                params.push({name: setPrm[0], value: setPrm[1]});
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

    function setSearchParams(paramsArray) {
        setSearchParamsWithHash(paramsArray);
    }

    //добавляет или заменяет параметр в queryString'е
    function setSearchParam(name, value) {
        //console.log('setSearchParam', name, value);

        var paramsArray = [];
        paramsArray.push([name, value]);

        setSearchParamsWithHash(paramsArray);
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
        setSearchParams: setSearchParams,
        setHash: setHash,
        setSearchParamsWithHash: setSearchParamsWithHash,
    };
})();

export default LocationHelper;