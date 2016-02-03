import React, { Component, PropTypes } from 'react'
import styles from './PackagesFilters.scss';
import withStyles from '../../decorators/withStyles';


import ListFilters from './ListFilters.js';

import { connect } from 'react-redux';
import { getStore } from '../../store/storeHolder';
import { getFilters } from '../../actions/action_filters';

@withStyles(styles)
class PackagesFilters extends React.Component {
    constructor(props) {
        super(props);
    }

    //static propTypes = {
    //    dispatch: PropTypes.func.isRequired
    //};

    setFilters() {

        console.log("----");
        console.log(this.props);
        //console.log(this.props.filters.Price);
        //console.log(this.props.filters.Price.Max);
        //var { dispatch } = this.props;
        //console.log(this.props);
        //console.log(this.state);
        getStore().dispatch(getFilters(this.props));
        
        //console.log(dispatch);
        //.then((action)=> {
        //    console.log(action);
        //})
    }

    render() {
        this.setFilters();
        var data = [
            {name: 'Звезды', class: 'b-dp-filters__stars'},
            {name: 'Цена', class: 'b-dp-filters__price'},
            {name: 'Название', class: 'b-dp-filters__name'},
            {name: 'Рейтинг', class: 'b-dp-filters__rating'},
            {name: 'Тип', class: 'b-dp-filters__type'},
            {name: 'Сервисы', class: 'b-dp-filters__services'},
            {name: 'Питание', class: 'b-dp-filters__meal'},
            {name: 'Сортировать по цене пакета', class: 'b-list-filters__sort'},
        ];
        return (
            <ListFilters data={data}/>
        );
    }

}

export default PackagesFilters;

//function mapStateToProps(state) {
//    return {
//        hotelsFilters: state.searchHotels.Filters.Hotels ? state.searchHotels.Filters.Hotels : null,
//    }
//}

//export default connect()(PackagesFilters)

