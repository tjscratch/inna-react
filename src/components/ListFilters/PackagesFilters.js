import React, { Component } from 'react'
import styles from './ListFilters.scss';
import withStyles from '../../decorators/withStyles';
import StarsFilter from './StarsFilter';

@withStyles(styles)
class PackagesFilters extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    var filters = this.props.hotelsFilters;
    return (
      <div className="b-list-filters">
        {filters ? <StarsFilter label='Звезды' data={filters.Stars}/> : undefined}
      </div>
    )
  }

}

export default PackagesFilters;
