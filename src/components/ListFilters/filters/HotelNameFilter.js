import React, { PropTypes } from 'react';

import { connect } from 'react-redux';
import { getStore } from '../../../store/storeHolder';
import { setNameFilterHotels } from '../../../actions/action_filters';


class HotelNameFilter extends React.Component {

  constructor (props) {
    super(props);
  }

  change (event) {
    let type = this.props.type;
    let value = event.target.value;
    getStore().dispatch(setNameFilterHotels('HotelName', value));
  }

  render () {

      return (
        <div className={`b-filter__body_${this.props.type}`}>
          <div className='b-filter__body-head'>
            <div className='b-filter__body-title'>{this.props.label}</div>
            <div className='b-filter__body-reset'>сбросить</div>
          </div>
              <div
                className='b-filter__body-item'
              >
                  <input type="text" onChange={this.change.bind(this)} />
              </div>
        </div>
      );
  }

}

export default HotelNameFilter;
