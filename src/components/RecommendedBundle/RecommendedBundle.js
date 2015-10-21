import React, { PropTypes } from 'react';
import styles from './RecommendedBundle.scss';
import withStyles from '../../decorators/withStyles';
import withViewport from '../../decorators/withViewport';

import TicketCard from '../TicketCard';
import HotelCard from '../HotelCard';
import PriceCard from '../PriceCard';

@withViewport
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

    buyClick() {
        if (this.props.events.bundleBuyClick) {
            this.props.events.bundleBuyClick();
        }
    }

    render() {
        //console.log('this.props.data', this.props.data);
        var events = this.props.events;
        var aviaData = this.props.data ? this.props.data.AviaInfo : null;
        var hotelData = this.props.data ? this.props.data.Hotel : null;
        var defaultRecommendedPair = this.props.defaultRecommendedPair;

        var priceData = this.props.data ? {price: this.props.data.PackagePrice} : null;

        var recBlockHeight = this.props.viewport.isMobile && this.props.viewport.height <= 500 ?
            {height:this.props.viewport.height} : null;

        var recommendedCaption = true;
        if (aviaData && hotelData && defaultRecommendedPair &&
            (hotelData.HotelId != defaultRecommendedPair.HotelId ||
            aviaData.VariantId1 != defaultRecommendedPair.TicketId)) {
            recommendedCaption = false;
        }

        return (
            <div className="b-recommended-bundle" style={recBlockHeight}>
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
                    {recommendedCaption ? 'Рекомендуем' : 'Выбранный вариант'}
                </div>
                <div className="b-recommended-bundle__collapse">
                    Свернуть
                </div>
                <div className="b-recommended-bundle__content">
                    <div className="b-bundle-content">
                        <div className={`b-bundle-content__avia ${aviaData ? '' : 'g-invisible'}`}>
                            <TicketCard events={events} data={aviaData} allowActions={true} />
                        </div>
                        <div className="b-bundle-content__dp">
                            <HotelCard events={events} data={hotelData} allowActions={true} />
                        </div>
                        <div className="b-bundle-content__price">
                            <PriceCard data={priceData} onBuy={this.buyClick.bind(this)} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RecommendedBundle;