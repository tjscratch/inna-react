import React, { PropTypes } from 'react';
import styles from './PriceCard.scss';
import withStyles from '../../decorators/withStyles';

@withStyles(styles) class PriceCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="b-price-card">
            </div>
        );
    }
}

export default PriceCard;