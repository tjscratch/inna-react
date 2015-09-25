import React, { PropTypes } from 'react';
import styles from './AviaResultsList.scss';
import withStyles from '../../decorators/withStyles';

import AviaCard from '../AviaCard';
import PriceCard from '../PriceCard'

@withStyles(styles) class AviaResultsList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var data = this.props.data;
        if (data) {
            data.length = 5;
            console.log('AviaResultsList data[0]', data[0]);
            return (
                <div className="b-avia-list">
                    <div className="b-avia-list__items">
                        {data.map((avia, ix)=> {
                            return (
                                <div key={ix} className="b-avia-list-item">
                                    {ix}
                                    <div className="b-avia-list-item__hotel">
                                        <AviaCard data={avia}/>
                                    </div>
                                    <div className="b-avia-list-item__price">
                                        <PriceCard data={{price: avia.Price}}/>
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

export default AviaResultsList;
