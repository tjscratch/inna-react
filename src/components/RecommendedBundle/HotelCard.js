import React, { PropTypes } from 'react';
import styles from './HotelCard.scss';
import withStyles from '../../decorators/withStyles';

@withStyles(styles) class HotelCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="b-hotel-card">
            </div>
        );
    }
}

export default HotelCard;