import React, { PropTypes } from 'react';
import styles from './OffersLanding.css';
import withStyles from '../../decorators/withStyles';

@withStyles(styles) class OffersLanding {

    render() {
        return (
            <div className="b-offers-landing">
                Тут будет лендинг оферов
            </div>
        );
    }

}

export default OffersLanding;
