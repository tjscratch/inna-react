import React, { PropTypes } from 'react';
import styles from './PackagesResultsList.scss';
import withStyles from '../../decorators/withStyles';

import HotelCard from '../HotelCard';
import PriceCard from '../PriceCard'

@withStyles(styles) class PackagesResultsList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var data = this.props.data;
        if (data) {
            data.length = 5;
            console.log('PackagesResultsList data[0]', data[0]);
            return (
                <div className="b-packages-list">
                    <div className="b-packages-list__items">
                        {data.map((hotel, ix)=> {
                            return (
                                <div key={ix} className="b-packages-list-item">
                                    {ix}
                                    <div className="b-packages-list-item__hotel">
                                        <HotelCard data={hotel}/>
                                    </div>
                                    <div className="b-packages-list-item__price">
                                        <PriceCard data={{price: hotel.Price}}/>
                                    </div>
                                </div>
                            )

                        }, this)}
                    </div>
                </div>
            );
        }

        return (
            <div>loading...</div>
        );
    }

}

export default PackagesResultsList;
