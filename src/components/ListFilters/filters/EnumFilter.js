import React, { PropTypes } from 'react';
import HotelStars  from '../../HotelStars/HotelStars';
import Price from '../../Price';
import Checkbox from '../../ui/Checkbox';

import { connect } from 'react-redux';
import { getStore } from '../../../store/storeHolder';
import { setEnumFilterHotels } from '../../../actions/action_filters';
import TripadvisorIcons from '../../Tripadvisor/TripadvisorIcons';


class EnumFilter extends React.Component {

    constructor (props) {
        super(props);
    }

    change (itemIndex, type, selected) {
        getStore().dispatch(setEnumFilterHotels(type, itemIndex, selected));
    }

    render () {
        let data = this.props.data;
        let type = this.props.type;
        let items = [];
        for (var key in data) {
            items.push(data[key]);
        }
        items.reverse();
        if (data) {
            return (
                <div className={`b-filter__body_${this.props.type}`}>
                    <div className='b-filter__body-head'>
                        <div className='b-filter__body-title'>{this.props.label}</div>
                        <div className='b-filter__body-reset'>сбросить</div>
                    </div>
                    {items.map((item, ix) => {
                        return (
                            <div
                                key={ix}
                                className='b-filter__body-item'
                            >
                                <Checkbox
                                    checked={item.Selected}
                                    onChange={this.change.bind(this, item.Value, type)}
                                >

                                    {type == 'Stars' ? <HotelStars data={item.Value}/> : null}

                                    {type == 'HotelType' ? <span className="ui-checkbox__label-text">{item.Value}</span> : null}

                                    {type == 'TaFactor' ? <TripadvisorIcons data={item.Value}/> : null}

                                    {type == 'Meal' ? <span className="ui-checkbox__label-text">{item.Name}</span> : null}

                                    {type == 'Extra' ? <span className="ui-checkbox__label-text">{item.Name}</span> : null}

                                    <Price data={item.Price} customClass='b-filter__body-price'/>
                                </Checkbox>
                            </div>
                        )
                    }, this)}
                </div>
            );
        }
    }

}

export default EnumFilter;
