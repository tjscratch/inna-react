import React, { Component } from 'react'
import styles from './ListFilters.scss';
import withStyles from '../../decorators/withStyles';
import FilterLayout from './../views/filterLayout/filterLayout';
import EnumFilter from './filters/EnumFilter';
import PriceFilter from './filters/PriceFilter';

@withStyles(styles)
class PackagesFilters extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            filters: [
                { label: 'Звезды', type: 'Stars', open: false },
                { label: 'Цена', type: 'Price', open: false },
                { label: 'Тип', type: 'HotelType', open: false },
                { label: 'Рейтинг', type: 'TaFactor', open: false },
                { label: 'Питание', type: 'Meal', open: false },
                { label: 'Сервисы', type: 'Extra', open: false }
            ]
        }
    }

    onToggle (key) {
        for (let i = 0; i < this.state.filters.length; i++) {
            if (key == i && key != 'allClose') {
                this.state.filters[key]['open'] = !this.state.filters[key]['open'];
            }else{
                this.state.filters[i]['open'] = false;
            }
        }
        this.setState({
            filters: this.state.filters
        });
    }

    render () {
        let filters = this.props.hotelsFilters;
        let listFilters = this.state.filters;

        return (
            <div className="b-list-filters">
                {listFilters.map((item, ix)=> {
                    if (filters && filters[item.type] && item.type == 'Price') {
                        return (
                            <FilterLayout key={ix} index={ix} open={item.open} toggle={this.onToggle.bind(this)} label={item.label}>
                                <PriceFilter label={item.label} type={item.type} data={filters[item.type]}/>
                            </FilterLayout>
                        )
                    } else if (filters && filters[item.type]) {
                        return (
                            <FilterLayout key={ix} index={ix} open={item.open} toggle={this.onToggle.bind(this)} label={item.label}>
                                <EnumFilter label={item.label} type={item.type} data={filters[item.type]}/>
                            </FilterLayout>
                        )
                    }
                })}
            </div>
        )
    }

}

export default PackagesFilters;
