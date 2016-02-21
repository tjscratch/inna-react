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
    filtersEnum (nameFilter, dataEnum) {
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
        return result
    }

    result () {
        this.dataEnum = this.filtersEnum('Stars', this.dataEnum)
        this.dataEnum = this.filtersEnum('HotelType', this.dataEnum);
        this.dataEnum = this.filtersEnum('TaFactor', this.dataEnum);
        return this.dataEnum;
    }
}

export default Filtrate;
