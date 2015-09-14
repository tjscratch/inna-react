import React, { PropTypes } from 'react';
import styles from './OffersSlider.css';
import withStyles from '../../decorators/withStyles';
import SearchForm from '../SearchForm';

@withStyles(styles) class OffersSlider {

    render() {
        return (
            <div className="b-offers-slider">
                <div className="b-offers-slider__content">
                    <SearchForm/>
                </div>
            </div>
        );
    }

}

export default OffersSlider;
