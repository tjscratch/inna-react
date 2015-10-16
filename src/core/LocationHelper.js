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

            let delIndex = -1;
            //если значение null - то надо удалить параметр
            let needToDelete = (setPrm[1] === null || setPrm[1] === undefined);
            //console.log('setPrm', setPrm, 'needToDelete', needToDelete);

            //ищем в параметрах наш параметр
            let prmExists = false;
            params.forEach((prm)=>{
                if (prm.name == setPrm[0]) {
                    prmExists = true;
                    prm.value = setPrm[1];

                    if (needToDelete) {
                        delIndex = params.indexOf(prm);
                    }
                }
            });

            //удаляем параметр
            if (delIndex > -1) {
                params.splice(delIndex, 1);
            }

            //если не нашли - добавляем новый
            if (!prmExists) {
                //если не нашли - но надо удалить - не добавляем
                if (!needToDelete) {
                    params.push({name: setPrm[0], value: setPrm[1]});
                }
            }
        });

        //сортируем
        params.sort((a,b)=>{
            if (a.name > b.name) {
                return 1;
            }
            if (a.name < b.name) {
                return -1;
            }
            return 0;
        });

        //готовим массив имя=значение
        var nameValueStrings = [];
        params.forEach((prm)=>{
            nameValueStrings.push(`${prm.name}=${prm.value}`);
        });

        //склеиваем окончательную строку
        var searchString = nameValueStrings.length > 0 ? `?${nameValueStrings.join('&')}` : '';
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