import React, { PropTypes } from 'react';
import styles from './AviaResultsList.scss';
import withStyles from '../../decorators/withStyles';
import withViewport from '../../decorators/withViewport';

import ReactList from 'react-list';
import AviaCard from '../AviaCard';
import PriceCard from '../PriceCard'

@withViewport
@withStyles(styles) class AviaResultsList extends React.Component {
    constructor(props) {
        super(props);
    }

    chooseTicket(ticket) {
        //если передан эвент - тригерим выбор
        if (this.props.events.chooseTicket) {
            this.props.events.chooseTicket(ticket);
        }
    }

    renderItem(ix, key) {
        var data = this.props.data;
        if (data) {
            var avia = data[ix];
            return (
                <div key={key} className="b-avia-list-item">
                    <span className="b-avia-list-item__index">{ix}</span>
                    <div className="b-avia-list-item__hotel">
                        <AviaCard data={avia}/>
                    </div>
                    <div className="b-avia-list-item__price">
                        <PriceCard
                            onChoose={() => this.chooseTicket(avia)}
                            data={{price: avia.PackagePrice}} chooseMode={true} />
                    </div>
                </div>
            )
        }

        return null;
    }

    render() {
        var data = this.props.data;
        if (data) {
            //console.log('AviaResultsList data[0]', data[0]);
            return (
                <div className="b-avia-list">
                    <div className="b-avia-list__items">
                        <ReactList
                            itemRenderer={this.renderItem.bind(this)}
                            length={data.length}
                            type='variable'
                            useTranslate3d={true}
                            itemSizeGetter={()=> this.props.viewport.isMobile ? 187+5 : 190+5}
                            />
                    </div>
                </div>
            );
        }

        return (
            <div>loading...</div>
        );
    }

}

export default AviaResultsList;
