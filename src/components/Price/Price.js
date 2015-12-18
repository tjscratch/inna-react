import React, { PropTypes, Component } from 'react';
import styles from './Price.scss';
import withStyles from '../../decorators/withStyles';
import { formatPrice } from '../../helpers/StringHelper.js';

@withStyles(styles) class Price extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var { data, customClass } = this.props;

        var classValue = 'b-price-ctrl';
        if (customClass) {
            classValue += ' ' + customClass;
        }

        return (
            <div className={classValue}>
                <span className="b-price-value">{formatPrice(data)}</span>
                <i className="b-price-rub icon-emb-rouble"></i>
            </div>
        );
    }

}

export default Price;
