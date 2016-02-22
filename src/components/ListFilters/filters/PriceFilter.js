import React, { PropTypes } from 'react';

import Slider from 'rc-slider';
import styles from './Slider.scss';
import withStyles from '../../../decorators/withStyles';

import { connect } from 'react-redux';
import { getStore } from '../../../store/storeHolder';
import { setStarFilterHotels } from '../../../actions/action_filters';


@withStyles(styles)
class EnumFilter extends React.Component {

    constructor (props) {
        super(props);

        this.state = {
            min: this.props.data.Min,
            max: this.props.data.Max
        }
    }

    change (itemIndex, type, selected) {
        getStore().dispatch(setStarFilterHotels(type, itemIndex, selected));
    }

    onSliderChange (value) {
        this.setState({
            min: value[0],
            max: value[1]
        });
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
                    <div>
                        {this.state.min}
                        <hr/>
                        {this.state.max}
                    </div>
                    <Slider range={true} defaultValue={sliderData} min={data.Min} max={data.Max} onChange={this.onSliderChange.bind(this)}/>
                </div>
            );
        }
    }

}

export default EnumFilter;
