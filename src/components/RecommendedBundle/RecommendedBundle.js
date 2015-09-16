import React, { PropTypes } from 'react';
import styles from './RecommendedBundle.scss';
import withStyles from '../../decorators/withStyles';

import AviaCard from './AviaCard.js';
import HotelCard from './HotelCard.js';
import PriceCard from './PriceCard.js';

@withStyles(styles) class RecommendedBundle extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var aviaData = this.props.data ? this.props.data.AviaInfo : null;

        return (
            <div className="b-recommended-bundle">
                <div className="b-recommended-bundle__title">
                    Выбранный вариант
                </div>
                <div className="b-recommended-bundle__collapse">
                    Свернуть
                </div>
                <div className="b-recommended-bundle__content">
                    <div className="b-bundle-content">
                        <div className="b-bundle-content__avia">
                            <AviaCard data={aviaData} />
                        </div>
                        <div className="b-bundle-content__dp">
                            <HotelCard />
                        </div>
                        <div className="b-bundle-content__price">
                            <PriceCard />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RecommendedBundle;