import React, { Component } from 'react'
import styles from './ListFilters.scss';
import withStyles from '../../decorators/withStyles';


import StarsFilter from './StarsFilter';

import { connect } from 'react-redux';
import { getStore } from '../../store/storeHolder';
import { getFilters } from '../../actions/action_filters';

@withStyles(styles)
class PackagesFilters extends React.Component {
  constructor (props) {
    super(props);
  }

  setFilters () {
    //console.log("----");
    //console.log(this.props);
    getStore().dispatch(getFilters(this.props));
  }

  render () {
    //this.setFilters();
    var filters = this.props.filters;
    return (
      <div className="b-list-filters">
        {filters ? <StarsFilter label='Звезды' data={filters.Stars}/> : undefined}
      </div>
    )
  }

}

export default PackagesFilters;

//function mapStateToProps(state) {
//    return {
//        hotelsFilters: state.searchHotels.Filters.Hotels ? state.searchHotels.Filters.Hotels : null,
//    }
//}

//export default connect()(PackagesFilters)

