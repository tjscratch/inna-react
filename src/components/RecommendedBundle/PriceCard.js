import React, { PropTypes } from 'react';
import styles from './PriceCard.scss';
import withStyles from '../../decorators/withStyles';

import { formatPrice } from '../../core/StringHelper.js';

@withStyles(styles) class PriceCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            shareOpen: false
        };
    }

    shareClick() {
        var isOpen = this.state.shareOpen;
        this.setState({
            shareOpen: !isOpen
        })
    }

    buyClick() {
        alert('buy click');
    }

    render() {
        var data = this.props.data;
        if (data) {
            return (
                <div className="b-price-card">
                    <div className="b-price-card__link">
                        <div className={`b-share-link ${this.state.shareOpen ? 'b-share-link_active' : ''}`} onClick={this.shareClick.bind(this)}>
                            <i className="b-share-img"></i>
                        </div>
                    </div>
                    <div className="b-price-card__price">
                        <div className="b-price">
                            <div className="b-price__text">
                                Стоимость пакета
                            </div>
                            <div className="b-price__price">
                                <span className="b-price-value">{formatPrice(data.price)}</span>
                                <i className="b-price-rub icon-emb-rouble"></i>
                            </div>
                        </div>
                    </div>
                    <div className="b-price-card__buy">
                        <a className="b-price-card-buy" onClick={this.buyClick.bind(this)}>Купить</a>
                    </div>
                </div>
            );
        }

        return null;
    }
}

export default PriceCard;