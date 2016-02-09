import React, { PropTypes } from 'react';
import HotelStars  from '../HotelStars/HotelStars';
import Price from '../Price';
import Checkbox from '../ui/Checkbox';

import { connect } from 'react-redux';
import { getStore } from '../../store/storeHolder';
import { getFilters } from '../../actions/action_filters';

class StarsFilter extends React.Component {

  constructor (props) {
    super(props);
  }


  setFilter(index){
    var { store, dispatch } = this.props;
    dispatch(getFilters(index));
  }


  render () {
    var data = this.props.data;
    if (data) {
      return (
        <div className='b-filter'>
          <div className='b-filter__label'>{this.props.label}</div>
          <div className='b-filter__body'>
            <div className='b-filter__body-head'>
              <div className='b-filter__body-title'>{this.props.label}</div>
              <div className='b-filter__body-reset'>сбросить</div>
            </div>
            {data.List.map((item, ix)=> {
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

//export default StarsFilter;


function mapStateToProps (state) {
  return {
    getFilters: state.getFilters
  }
}

export default connect(mapStateToProps)(StarsFilter)
