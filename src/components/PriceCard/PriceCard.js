import React, { PropTypes, Component } from 'react';
import styles from './PriceCard.scss';
import withStyles from '../../decorators/withStyles';
import withViewport from '../../decorators/withViewport';

import { formatPrice } from '../../helpers/StringHelper.js';

import Price from '../Price';

@withViewport
@withStyles(styles) class PriceCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            shareOpen: false
        };
    }

    shareClick(e) {
        var isOpen = this.state.shareOpen;
        this.setState({
            shareOpen: !isOpen
        })
    }

    buyClick(e) {
        e.preventDefault();
        var { onBuy } = this.props;
        //если передан колбек выбора
        if (onBuy) {
            onBuy();
        }
    }

    chooseClick(e) {
        e.preventDefault();
        var { onChoose } = this.props;
        //если передан колбек выбора
        if (onChoose) {
            onChoose();
        }
    }

    renderPrice(data) {
        var { viewport } = this.props;
        if (viewport.isMobile) {
            return (
                <div className="b-price__price">
                    <Price data={data.price} customClass="b-price-ctrl_normal"/>
                </div>
            );
        }

        return null;
    }

    render() {
        var { data, chooseMode } = this.props;
        var { shareOpen } = this.state;
        if (data) {
            return (
                <div className="b-price-card">
                    <div className="b-price-card__link">
                        <div className={`b-share-link ${shareOpen ? 'b-share-link_active' : ''}`} onClick={this.shareClick.bind(this)}>
                            <i className="b-share-img"></i>
                        </div>
                    </div>
                    <div className="b-price-card__price">
                        <div className="b-price">
                            <div className="b-price__text">
                                Стоимость пакета
                            </div>
                            <div className="b-price__price">
                                <Price data={data.price}/>
                            </div>
                        </div>
                    </div>
                    <div className="b-price-card__buy">
                        {
                            chooseMode ?
                            <a className="b-price-card-buy" onClick={this.chooseClick.bind(this)}>Выбрать</a>
                            :
                            <a className="b-price-card-buy" onClick={this.buyClick.bind(this)}>
                                <div className="b-price__caption">Купить</div>
                                {this.renderPrice(data)}
                            </a>
                        }
                    </div>
                </div>
            );
        }

        return null;
    }
}

export default PriceCard;