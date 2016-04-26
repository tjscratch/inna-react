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

    buyClick() {
        var { events } = this.props;
        if (events && events.bundleBuyClick) {
            events.bundleBuyClick();
        }
    }

    render() {
        //console.log('this.props.data', this.props.data);
        var { data, events, defaultRecommendedPair, viewport } = this.props;
        var { showChangeTickets, showChangeHotels } = this.props;

        var aviaData = data ? data.AviaInfo : null;
        var hotelData = data ? data.Hotel : null;
        var priceData = data ? {PackagePrice: data.Price} : null;
        var recBlockHeight = viewport.isMobile && viewport.height <= 500 ? {height:viewport.height} : null;

        if (aviaData && hotelData && defaultRecommendedPair &&
            (hotelData.HotelId != defaultRecommendedPair.HotelId ||
            aviaData.VariantId1 != defaultRecommendedPair.TicketId)) {
        }

        if (this.props.hotelUrl) {
            var hotelUrl = this.props.hotelUrl;
        }

        return (
            <div className="b-recommended-bundle" style={recBlockHeight}>
                <div className="b-recommended-bundle__content">
                    <div className="b-bundle-content">
                        <div className={`b-bundle-content__avia ${aviaData ? '' : 'g-invisible'}`}>
                            <TicketCard events={events} showChangeTickets={showChangeTickets} data={aviaData} allowActions={true} />
                        </div>
                        <div className="b-bundle-content__dp">
                            <HotelCard events={events}
                                       showChangeHotels={showChangeHotels}
                                       data={hotelData}
                                       allowActions={true}
                                       hotelUrl={hotelUrl}/>
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
