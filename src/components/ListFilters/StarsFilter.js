import React, { PropTypes } from 'react';
import HotelStars  from '../HotelStars/HotelStars';
import Price from '../Price';
import Checkbox from '../ui/Checkbox';

import { connect } from 'react-redux';
import { getStore } from '../../store/storeHolder';
import { setStarFilterHotels } from '../../actions/action_filters';


class StarsFilter extends React.Component {

  constructor (props) {
    super(props);
  }

  setFilter (index) {
    //getStore().dispatch(setStarFilterHotels('Stars', index, selected));
  }


  change (itemIndex, selected) {
    console.log(selected)
    console.log(itemIndex)
    getStore().dispatch(setStarFilterHotels('Stars', itemIndex, selected));
  }


  render () {
    let data = this.props.data;
    let items = [];
    for (var key in data) {
      items.push(data[key]);
    }
    items.reverse();

    if (data) {
      return (
        <div className='b-filter'>
          <div className='b-filter__label'>{this.props.label}</div>
          <div className='b-filter__body'>
            <div className='b-filter__body-head'>
              <div className='b-filter__body-title'>{this.props.label}</div>
              <div className='b-filter__body-reset'>сбросить</div>
            </div>
            {items.map((item, ix) => {
              return (
                <div key={ix} className='b-filter__body-item'>
                  <Checkbox
                    checked={item.Selected}
                    onChange={this.change.bind(this, item.Value)}>
                    <HotelStars data={item.Value}/>
                    <Price data={item.Price} customClass='b-filter__body-price'/>
                  </Checkbox>
                </div>
              )
            }, this)}
          </div>
        </div>
      );
    }
  }

}

export default StarsFilter;
