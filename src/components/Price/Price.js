import React, { PropTypes } from 'react';
import styles from './Price.scss';
import withStyles from '../../decorators/withStyles';
import { formatPrice } from '../../helpers/StringHelper.js';

@withStyles(styles) class Price extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var price = this.props.data;

        return (
            <div className="b-price-ctrl">
                <span className="b-price-value">{formatPrice(price)}</span>
                <i className="b-price-rub icon-emb-rouble"></i>
            </div>
        );
    }

}

export default Price;
