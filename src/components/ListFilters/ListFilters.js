import React, { PropTypes } from 'react';
import styles from './ListFilters.scss';
import withStyles from '../../decorators/withStyles';

@withStyles(styles) class ListFilters extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var data = this.props.data;
        if (data) {
            return (
                <div className="b-list-filters">
                    {data.map((item, ix)=>{
                        return (<div key={ix} className={`b-list-filters-item ${item.class}`}>{item.name}</div>)
                    }, this)}
                </div>
            );
        }

        return null;
    }

}

export default ListFilters;
