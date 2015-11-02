import React, { PropTypes } from 'react';
import styles from './BuyBtn.scss';
import withStyles from '../../../../decorators/withStyles';
import withViewport from '../../../../decorators/withViewport';

import Price from '../../../Price';

@withStyles(styles) class BuyBtn extends React.Component {
    constructor(props) {
        super(props);
    }

    buyClick(e) {
        e.preventDefault();
        e.stopPropagation();
        //если передан колбек выбора
        if (this.props.onBuy) {
            this.props.onBuy();
        }
    }

    render() {
        return (
            <a className="b-buy-btn" onClick={this.buyClick.bind(this)}>
                <div className="b-buy-btn__caption">Купить</div>
            </a>
        );
    }

}

export default BuyBtn;
