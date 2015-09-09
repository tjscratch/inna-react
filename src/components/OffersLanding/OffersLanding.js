import React, { PropTypes } from 'react';
import styles from './OffersLanding.css';
import withStyles from '../../decorators/withStyles';

@withStyles(styles) class OffersLanding {

    render() {
        return (
            <div id="landing" className="b-offers-landing">
                <div className="b-offers-landing__title">
                    Перелет + Отель — новая альтернатива классическим турам
                </div>
                <div className="b-offers-landing__content">
                    <div className="b-landing-list container">
                        <div className="row">
                            <div className="b-landing-list__item col-sm-6">
                                <div className="b-landing-item media">
                                    <div className="b-landing-item__img media-left media-middle">
                                        <img alt="img" src={require('./img/1.png')}/>
                                    </div>
                                    <div className="b-landing-item__text first media-body media-middle">
                                        <b>Cвобода выбора.</b> 200 стран, 500+ авиакомпаний, 389 тыс. отелей с
                                        моментальным подтверждением.
                                    </div>
                                </div>
                            </div>
                            <div className="b-landing-list__item col-sm-6">
                                <div className="b-landing-item media">
                                    <div className="b-landing-item__img media-left media-middle">
                                        <img alt="img" src={require('./img/4.png')}/>
                                    </div>
                                    <div className="b-landing-item__text media-body media-middle">
                                        <b>Экономия до 20%.</b> Путешествуйте по специальным "пакетным" тарифам от
                                        лучших мировых поставщиков.
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="b-landing-list__item col-sm-6">
                                <div className="b-landing-item media">
                                    <div className="b-landing-item__img media-left media-middle">
                                        <img alt="img" src={require('./img/2.png')}/>
                                    </div>
                                    <div className="b-landing-item__text media-body media-middle">
                                        <b>Только регулярные рейсы.</b> Вылет в любой день недели, поездки на уикенды и праздники.
                                    </div>
                                </div>
                            </div>
                            <div className="b-landing-list__item col-sm-6">
                                <div className="b-landing-item media">
                                    <div className="b-landing-item__img media-left media-middle">
                                        <img alt="img" src={require('./img/5.png')}/>
                                    </div>
                                    <div className="b-landing-item__text media-body media-middle">
                                        <b>Это надежно.</b> Моментальная оплата поставщикам при бронировании.
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="b-landing-list__item col-sm-6">
                                <div className="b-landing-item media">
                                    <div className="b-landing-item__img media-left media-middle">
                                        <img alt="img" src={require('./img/3.png')}/>
                                    </div>
                                    <div className="b-landing-item__text media-body media-middle">
                                        <b>Онлайн оплата банковской картой.</b> После оплаты мы пришлем ваш билет и ваучер на электронную почту.
                                    </div>
                                </div>
                            </div>
                            <div className="b-landing-list__item col-sm-6">
                                <div className="b-landing-item media">
                                    <div className="b-landing-item__img media-left media-middle">
                                        <img alt="img" src={require('./img/6.png')}/>
                                    </div>
                                    <div className="b-landing-item__text media-body media-middle">
                                        <b>Поддержка 24x7.</b> Поможем оформить визы, страховки, закажем трансфер или экскурсию.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default OffersLanding;
