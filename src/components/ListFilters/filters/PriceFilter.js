import React, { PropTypes } from 'react';
import Price from '../../Price';
import _ from 'lodash';

import Slider from 'rc-slider';
import styles from './PriceFilters.scss';
import withStyles from '../../../decorators/withStyles';

import { connect } from 'react-redux';
import { getStore } from '../../../store/storeHolder';
import { setRangeFilterHotels } from '../../../actions/action_filters';


@withStyles(styles)
class EnumFilter extends React.Component {

    constructor (props) {
        super(props);

        this.state = {
            Min: this.props.data.Min,
            Max: this.props.data.Max
        }

        this.setFilters = _.debounce(
            this.setFilters, 500,
            {
                'leading': false,
                'trailing': true
            });
    }

    onSliderChange (value) {
        this.setState({
            Min: value[0],
            Max: value[1]
        });
        this.setFilters();
    }

    setFilters () {
        getStore().dispatch(setRangeFilterHotels('Price', this.state))
    }

    render () {
        let data = this.props.data;
        let type = this.props.type;
        let sliderData = [data.Min, data.Max];

        if (data) {
            return (
                <div className={`b-filter__body_${this.props.type}`}>
                    <div className='b-filter__body-head'>
                        <div className='b-filter__body-title'>{this.props.label}</div>
                        <div className='b-filter__body-reset'>сбросить</div>
                    </div>

                    <div className='b-filter-price__row b-filter-price__row-inputs'>
                        <div className='b-filter-price__input-container'>
                            <div className='b-filter-price__input-label'>
                                от
                            </div>
                            <input type="text" className='b-filter-price__input' value={this.state.Min}/>
                        </div>
                        <div className='b-filter-price__input-container'>
                            <div className='b-filter-price__input-label'>
                                до
                            </div>
                            <input type="text" className='b-filter-price__input' value={this.state.Max}/>
                        </div>
                    </div>

                    <div className='b-filter-price__slider'>
                        <Slider range={true} defaultValue={sliderData} min={data.Min} max={data.Max} onChange={this.onSliderChange.bind(this)}/>
                    </div>

                    <div className='b-filter-price__row'>
                        <Price data={this.state.Min} customClass='b-filter-price__price'/>
                        <Price data={this.state.Max} customClass='b-filter-price__price'/>
                    </div>

                </div>
            );
        }
    }

}

export default EnumFilter;
