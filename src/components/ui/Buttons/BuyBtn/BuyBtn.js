import React, { PropTypes, Component } from 'react';
import styles from './BuyBtn.scss';
import withStyles from '../../../../decorators/withStyles';
import withViewport from '../../../../decorators/withViewport';

import Price from '../../../Price';

@withStyles(styles) class BuyBtn extends Component {
    constructor(props) {
        super(props);
    }

    buyClick(e) {
        e.preventDefault();
        //e.stopPropagation();

        var { onBuy, onSubmit } = this.props;

        //если передан колбек выбора
        if (onBuy) {
            onBuy(e);
        }

        if (onSubmit) {
            onSubmit();
        }
    }

    render() {

        var { text } = this.props;
        if (!text) {
            text = 'Купить';
        }

        return (
            <a className="b-buy-btn" onClick={(e)=>this.buyClick(e)}>
                <div className="b-buy-btn__caption">{text}</div>
            </a>
        );
    }

}

export default BuyBtn;
