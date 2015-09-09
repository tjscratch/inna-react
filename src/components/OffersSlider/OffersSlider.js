import React, { PropTypes } from 'react';
import styles from './OffersSlider.css';
import withStyles from '../../decorators/withStyles';

@withStyles(styles) class OffersSlider {

    render() {
        return (
            <div className="b-offers-slider">
                Тут будет слайдер оферов
            </div>
        );
    }

}

export default OffersSlider;
