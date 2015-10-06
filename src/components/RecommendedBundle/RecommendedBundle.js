import React, { PropTypes } from 'react';
import styles from './RecommendedBundle.scss';
import withStyles from '../../decorators/withStyles';

import AviaCard from '../AviaCard';
import HotelCard from '../HotelCard';
import PriceCard from '../PriceCard';

@withStyles(styles) class RecommendedBundle extends React.Component {
    constructor(props) {
        super(props);
    }

    recommendedClick() {
        alert('recommendedClick');
    }

    cheapestClick() {
        alert('cheapestClick');
    }

    render() {
        //console.log('this.props.data', this.props.data);
        var events = this.props.events;
        var aviaData = this.props.data ? this.props.data.AviaInfo : null;
        var hotelData = this.props.data ? this.props.data.Hotel : null;
        var priceData = this.props.data ? {price: this.props.data.Price} : null;

        return (
            <div className="b-recommended-bundle">
                <div className="b-recommended-bundle__mobile-recommend-block">
                    <div className="b-mobile-recommended-btn-block">
                        <div className="b-mobile-recommended-btn b-mobile-recommended-btn-active"
                            onClick={this.recommendedClick}>
                            Рекомендованный
                        </div>
                        <div className="b-mobile-recommended-btn"
                            onClick={this.cheapestClick}>
                            Самый дешевый
                        </div>
                    </div>
                </div>
                <div className="b-recommended-bundle__title">
                    Выбранный вариант
                </div>
                <div className="b-recommended-bundle__collapse">
                    Свернуть
                </div>
                <div className="b-recommended-bundle__content">
                    <div className="b-bundle-content">
                        <div className={`b-bundle-content__avia ${aviaData ? '' : 'g-invisible'}`}>
                            <AviaCard events={events} data={aviaData}/>
                        </div>
                        <div className="b-bundle-content__dp">
                            <HotelCard events={events} data={hotelData}/>
                        </div>
                        <div className="b-bundle-content__price">
                            <PriceCard data={priceData}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RecommendedBundle;