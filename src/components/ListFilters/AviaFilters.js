import React, { PropTypes } from 'react';
import ListFilters from './ListFilters.js';

class AviaFilters extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var data = [
            {name:'Пересадки', class:'b-dp-filters__transfers'},
            {name:'Цена', class:'b-dp-filters__price'},
            {name:'Время', class:'b-dp-filters__time'},
            {name:'Авиакомпании', class:'b-dp-filters__air-companies'},
            {name:'Аэропорты', class:'b-dp-filters__airports'},
            {name:'Сортировать по цене пакета', class:'b-list-filters__sort'},
        ];
        return null
    }

}

export default AviaFilters;
