import React, { PropTypes, Component } from 'react';
import styles from './PriceCard.scss';
import withStyles from '../../decorators/withStyles';
import withViewport from '../../decorators/withViewport';

import { formatPrice } from '../../helpers/StringHelper.js';

import Price from '../Price';

@withViewport
@withStyles(styles)
class PriceCard extends Component {
    constructor (props) {
        super(props);

        this.state = {
            shareOpen: false
        };
    }

    shareClick (e) {
        var isOpen = this.state.shareOpen;
        this.setState({
            shareOpen: !isOpen
        })
    }

    buyClick (e) {
        e.preventDefault();

        var { onBuy, onSubmit } = this.props;
        //если передан колбек выбора
        if (onBuy) {
            onBuy(e);
        }

        if (onSubmit) {
            onSubmit();
        }
    }

    chooseClick (e) {
        e.preventDefault();

        var { onChoose } = this.props;
        //если передан колбек выбора
        if (onChoose) {
            onChoose();
        }
    }

    renderPrice (data) {
        var { viewport } = this.props;
        if (viewport.isMobile) {
            return (
                <div className="b-price__price">
                    <Price data={data.PackagePrice} customClass="b-price-ctrl_normal"/>
                </div>
            );
        }

        return null;
    }

    render () {
        var { viewport } = this.props;
        var { data, chooseMode, onSubmit } = this.props;
        var { shareOpen } = this.state;
        if (data) {
            return (
                <div className="b-price-card">
                    {false ?
                        <div className="b-price-card__link">
                            <div className={`b-share-link ${shareOpen ? 'b-share-link_active' : ''}`}
                                 onClick={this.shareClick.bind(this)}>
                                <i className="b-share-img"></i>
                            </div>
                        </div>
                        : null
                    }
                    <div className="b-price-card__price">
                        <div className="b-price-card__price-price">
                            <Price data={data.CostPerPerson}/>
                        </div>
                        <div className="b-price-card__price-text">
                            цена за человека
                        </div>
                    </div>
                    <div className="b-price-card__buy">
                        {!viewport.isMobile ?
                            <div className="b-price-card__full-price">
                                К оплате:
                                <Price data={data.PackagePrice} customClass="b-price-card__full-price-ctrl"/>
                            </div>
                            :
                            null
                        }
                        {
                            chooseMode ?
                                <a className="b-price-card-buy" onClick={this.chooseClick.bind(this)}>Выбрать</a>
                                :
                                <a className="b-price-card-buy" onClick={(e)=>this.buyClick(e)}>
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
