import _ from 'lodash';

class Filtrate {
    /**
     * @param dataEnum - фильтруемый массив значений
     * @param filters - объект фильтров
     */
    constructor (dataEnum, filters) {
        this.dataEnum = dataEnum;
        this.filters = filters;
    }


    /**
     * Фильтрация по простым полям, когда в фильтруемом элементе
     * может находиться только одно значение фильтра
     * @param nameFilter
     * @param dataEnum
     * @returns {*|Array.<T>|{PSEUDO, CHILD, ID, TAG, CLASS, ATTR, POS}}
     */
    filtersOne (nameFilter, dataEnum) {
        var currentFilter = this.filters[nameFilter];
        /**
         * нахидим все варианты текущего фильтра nameFilter
         * у кторых свойство Selected==true
         */
        let filters = _.filter(currentFilter, { 'Selected': true });

        /**
         * если есть активные фильтры
         * перебираем весь фильтруемый объект
         * т.к. объект фильтров по которым происходит фильтрация представляет из себя
         * объект где ключ равен значению
         * берем из каждого фильтруемого объекта значение текущего фильтра item[nameFilter]
         * берем в объекте фильтров currentFilter[item[nameFilter]]
         * если свойство Selected == true
         * текущий фильтруемый элемент добавляем в массив отфильтрованных filter ? filter.Selected : false;
         */
        if (filters.length) {
            var result = _.filter(dataEnum, function (item) {
                let filter = currentFilter[item[nameFilter]];
                return filter ? filter.Selected : false;
            });
        } else {
            result = dataEnum;
        }
        return result;
    }

    filtersEnum (nameFilter, dataEnum) {
        var currentFilter = this.filters[nameFilter];
        /**
         * нахидим все варианты текущего фильтра nameFilter
         * у кторых свойство Selected==true
         */
        let filters = _.filter(currentFilter, { 'Selected': true });

        if (filters.length) {
            var result = [];
            for (var i = 0; i < dataEnum.length; i++) {
                let item = dataEnum[i];
                var selectedFilters = [];
                for (var obj in item[nameFilter]) {
                    let filter = currentFilter[obj]['Selected'];
                    if (filter) {
                        selectedFilters.push(true);
                    }
                }
                selectedFilters.length ? result.push(item) : null;
            }
            return result;
        } else {
            var result = dataEnum;
        }

        return result;
    }

    filtersRange (nameFilter, dataEnum) {
        var currentFilter = this.filters[nameFilter];
        var result = [];
        for (var i = 0; i < dataEnum.length; i++) {
            let item = dataEnum[i];
            let price = item.CostPerPerson;
            if (price >= currentFilter.SelectedMin && price <= currentFilter.SelectedMax) {
                result.push(item);
            }
        }
        return result;
    }

    result () {
        this.dataEnum = this.filtersRange('Price', this.dataEnum);
        this.dataEnum = this.filtersOne('Stars', this.dataEnum);
        this.dataEnum = this.filtersOne('HotelType', this.dataEnum);
        this.dataEnum = this.filtersOne('TaFactor', this.dataEnum);
        this.dataEnum = this.filtersOne('Meal', this.dataEnum);
        this.dataEnum = this.filtersEnum('Extra', this.dataEnum);
        return this.dataEnum;
    }
}

export default Filtrate;
