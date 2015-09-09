import React, { PropTypes } from 'react';
import styles from './OffersList.css';
import withStyles from '../../decorators/withStyles';

@withStyles(styles) class OffersList {

    render() {
        return (
            <div className="b-offers-list">
                <h1>Перелет + Отель — новая альтернатива классическим турам</h1>
            </div>
        );
    }

}

export default OffersList;
