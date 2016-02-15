import React, { Component } from 'react'
import styles from './ListFilters.scss';
import withStyles from '../../decorators/withStyles';
import EnumFilter from './filters/EnumFilter';

@withStyles(styles)
class PackagesFilters extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    var filters = this.props.hotelsFilters;
    return (
      <div className="b-list-filters">
        {filters ? <EnumFilter label='Звезды' type="Stars" data={filters.Stars}/> : undefined}
        {filters ? <EnumFilter label='Тип' type="HotelType" data={filters.HotelType}/> : undefined}
      </div>
    )
  }

}

export default PackagesFilters;
