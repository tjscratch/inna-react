/**
 * Created by alex on 03.02.16.
 */

import insideRFList from '../constants/insideRf';

export function isInsideRf(item, useAnyIn) {
    var arrayCountryIds = insideRFList;
    var etapCountries = [];
    if (item.EtapsTo != null) {
        for (var i = 0; i < item.EtapsTo.length; i++) {
            var etap = item.EtapsTo[i];
            etapCountries.push(etap.InCountryId);
            etapCountries.push(etap.OutCountryId);
        }
    }
    if (item.EtapsBack != null) {
        for (var i = 0; i < item.EtapsBack.length; i++) {
            var etap = item.EtapsBack[i];
            etapCountries.push(etap.InCountryId);
            etapCountries.push(etap.OutCountryId);
        }
    }
    etapCountries = _.uniq(etapCountries);
    //проверяем все страны в этапах
    for (var i = 0; i < etapCountries.length; i++) {
        var etapCountry = etapCountries[i];

        if (useAnyIn) {
            if (_.any(arrayCountryIds, function (countryId) {
                    return countryId == etapCountry;
                })) //нашли хоть одну в массиве (для Украины)
            {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            if (_.indexOf(arrayCountryIds, etapCountry) < 0) //на каком-то этапе мы не попали в этот кейс
            {
                return false;
            }
        }
    }

    //прошлись по всем этапам, везде мы в нужном списке стран
    return true;
}