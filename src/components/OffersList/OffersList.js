import React, { PropTypes } from 'react';
import styles from './OffersList.css';
import withStyles from '../../decorators/withStyles';

@withStyles(styles) class OffersList {

    render() {
        return (
            <div className="b-offers-list">
                тут будет стенка оферов
            </div>
        );
    }

}

export default OffersList;
