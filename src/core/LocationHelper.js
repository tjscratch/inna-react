import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import Location from './Location';

let LocationHelper = (function () {

    //добавляет или заменяет параметр в queryString'е
    //до 4 одновременно
    function setSearchParam(name1, value1, name2, value2, name3, value3, name4, value4) {

        var setParamsArray = [];
        setParamsArray.push({name: name1, value: value1});

        if (name2 != undefined) {
            setParamsArray.push({name: name2, value: value2});
        }
        if (name3 != undefined) {
            setParamsArray.push({name: name3, value: value3});
        }
        if (name4 != undefined) {
            setParamsArray.push({name: name4, value: value4});
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
        setParamsArray.forEach((setPrm)=>{
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

        Location.pushState(null, location.pathname + searchString + location.hash);
    }

    return {
        setSearchParam: setSearchParam
    };
})();

export default LocationHelper;