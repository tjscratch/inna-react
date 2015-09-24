import React, { PropTypes } from 'react';
import styles from './PackagesFilters.scss';
import withStyles from '../../decorators/withStyles';

import ListFilters from './ListFilters.js';

@withStyles(styles) class PackagesFilters extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var data = [
            {name:'Звезды', class:'b-dp-filters__stars'},
            {name:'Цена', class:'b-dp-filters__price'},
            {name:'Название', class:'b-dp-filters__name'},
            {name:'Рейтинг', class:'b-dp-filters__rating'},
            {name:'Тип', class:'b-dp-filters__type'},
            {name:'Сервисы', class:'b-dp-filters__services'},
            {name:'Питание', class:'b-dp-filters__meal'},
            {name:'Сортировать по цене пакета', class:'b-list-filters__sort'},
        ];
        return (
            <ListFilters data={data} />
        );
    }

}

export default PackagesFilters;
