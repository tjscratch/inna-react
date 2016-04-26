import React, { PropTypes } from 'react';
import styles from './ResultsList.scss';
import withStyles from '../../decorators/withStyles';
import withViewport from '../../decorators/withViewport';

import ReactList from 'react-list';
import HotelCard from '../HotelCard';
import TicketCard from '../TicketCard';
import PriceCard from '../PriceCard'

@withViewport
@withStyles(styles)
class ResultsList extends React.Component {
    constructor (props) {
        super(props);
    }

    selected (item) {
        let typeList = this.props.typeList;
        if (typeList == 'hotel') {
            //если передан эвент - тригерим выбор
            if (this.props.events.chooseHotel) {
                this.props.events.chooseHotel(item);
            }
        }else if (typeList == 'ticket') {
            //если передан эвент - тригерим выбор
            if (this.props.events.chooseTicket) {
                this.props.events.chooseTicket(item);
            }
        }
    }

    renderCard (item) {
        let typeList = this.props.typeList;
        if (typeList == 'hotel') {
            return (
                <div className="b-packages-list-item__hotel">
                    <HotelCard data={item}/>
                </div>
            )
        }
        if (typeList == 'ticket') {
            return (
                <div className="b-packages-list-item__hotel">
                    <TicketCard data={item}/>
                </div>
            )
        }
    }

    renderItem (ix, key) {
        var data = this.props.data;
        if (data) {
            var item = data[ix];
            return (
                <div key={key} className="b-packages-list-item">
                    <span className="b-packages-list-item__index">{ix}</span>
                    {this.renderCard(item)}
                    <div className="b-packages-list-item__price">
                        <PriceCard
                            onChoose={() => this.selected(item)}
                            data={{PackagePrice: item.PackagePrice}} chooseMode={true}/>
                    </div>
                </div>
            )
        }

        return null;
    }

    render () {
        var data = this.props.data;
        if (data) {
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
        } else {
            return null;
        }
    }

}

export default ResultsList;
