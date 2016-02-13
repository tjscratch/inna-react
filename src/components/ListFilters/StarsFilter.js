import React, { PropTypes } from 'react';
import HotelStars  from '../HotelStars/HotelStars';
import Price from '../Price';
import Checkbox from '../ui/Checkbox';

import { connect } from 'react-redux';
import { getStore } from '../../store/storeHolder';
import { setStarFilterHotels } from '../../actions/action_filters';

import lodash from 'lodash'

class StarsFilter extends React.Component {

  constructor (props) {
    super(props);
  }


  setFilter (index) {
    var { store, dispatch } = this.props;
    dispatch(setStarFilterHotels('Stars', index));
  }

  renderItem (data) {
    let items = [];
    for (var key in data) {
      //var item =
      //      <div key={key} className='b-filter__body-item' onClick={this.setFilter.bind(this, data[key].Value)}>
      //        <Checkbox>
      //          <HotelStars data={data[key].Value}/>
      //          <Price data={data[key].Price} customClass='b-filter__body-price'/>
      //        </Checkbox>
      //      </div>
      //items.push(item)
      items.push(data[key])
    }
    console.log(items)
    lodash.reverse(items)
    console.log(items)
    return items;
  }

  render () {
    let data = this.props.data;
    let items = [];
    for (var key in data) {
      items.push(data[key]);
    }
    items.reverse()
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
                <div key={ix} className='b-filter__body-item' onClick={this.setFilter.bind(this, item.Value)}>
                  <Checkbox>
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

function mapStateToProps (state) {
  return {
    setHotelsFilter: state.setHotelsFilter
  }
}

export default connect(mapStateToProps)(StarsFilter)
