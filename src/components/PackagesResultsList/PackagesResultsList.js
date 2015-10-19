import React, { PropTypes } from 'react';
import styles from './PackagesResultsList.scss';
import withStyles from '../../decorators/withStyles';
import withViewport from '../../decorators/withViewport';

import ReactList from 'react-list';
import HotelCard from '../HotelCard';
import PriceCard from '../PriceCard'

@withViewport
@withStyles(styles) class PackagesResultsList extends React.Component {
    constructor(props) {
        super(props);
    }

    chooseHotel(hotel) {
        //если передан эвент - тригерим выбор
        if (this.props.events.chooseHotel) {
            this.props.events.chooseHotel(hotel);
        }
    }

    renderItem(ix, key) {
        var data = this.props.data;
        if (data) {
            var hotel = data[ix];
            return (
                <div key={key} className="b-packages-list-item">
                    <span className="b-packages-list-item__index">{ix}</span>
                    <div className="b-packages-list-item__hotel">
                        <HotelCard data={hotel} />
                    </div>
                    <div className="b-packages-list-item__price">
                        <PriceCard
                            onChoose={() => this.chooseHotel(hotel)}
                            data={{price: hotel.PackagePrice}} chooseMode={true} />
                    </div>
                </div>
            )
        }

        return null;
    }

    render() {
        var data = this.props.data;
        if (data) {
            //console.log('PackagesResultsList data[0]', data[0]);

            //return (
            //    <div className="b-packages-list">
            //        <div className="b-packages-list__items">
            //            <ReactList
            //                itemRenderer={this.renderItem.bind(this)}
            //                length={data.length}
            //                type='variable'
            //                useTranslate3d={false}
            //                itemSizeGetter={()=> this.props.viewport.isMobile ? 184+5 : 185+5}
            //                />
            //        </div>
            //    </div>
            //)

            return (
                <div className="b-packages-list">
                    <div className="b-packages-list__items">
                        <ReactList
                            itemRenderer={this.renderItem.bind(this)}
                            length={data.length}
                            />
                    </div>
                </div>
            )
        }

        return (
            <div>loading...</div>
        );
    }

}

export default PackagesResultsList;
