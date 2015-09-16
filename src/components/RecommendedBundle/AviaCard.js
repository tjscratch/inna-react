import React, { PropTypes } from 'react';
import styles from './AviaCard.scss';
import withStyles from '../../decorators/withStyles';

import { apiDateToJsDate } from '../../core/DateHelper.js';

@withStyles(styles) class AviaCard extends React.Component {
    constructor(props) {
        super(props);
    }

    getTransporterLogo(etap) {
        if (etap && etap.TransporterLogo) {
            var logo = etap.TransporterLogo;
            return `https://s.inna.ru/Files/logo/${logo}.png`;
        }

        return '';
    }

    renderTransporterInfo() {
        if (this.props.data) {
            var data = this.props.data.EtapsTo[0];
            console.log('AviaCard data', this.props.data);
            return (
                <div className="b-aircompany">
                    <img alt="logo" className="b-aircompany__logo"
                         src={this.getTransporterLogo(data)}/>

                    <div className="b-aircompany__text">{data.TransporterName}</div>

                    <div className="b-aircompany__ico">

                    </div>
                </div>
            );
        }

        return null;
    }

    renderFlightInfo() {
        if (this.props.data) {
            return (
                <div className="b-avia-card__flight-info">
                    <div className="b-flight-info">
                        <div className="b-flight-info__text">
                            <div className="b-flight-info-text">
                                <div className="b-flight-info-text__time">
                                    17:00 DME
                                </div>
                                <div className="b-flight-info-text__date">
                                    1 ноя, вс
                                </div>
                            </div>
                        </div>
                        <div className="b-flight-info__flight">
                            <div className="b-flight-info-trip">
                                в пути: 2 ч 50 мин<br />
                                без пересадок
                            </div>
                        </div>
                        <div className="b-flight-info__text b-flight-info__text_to">
                            <div className="b-flight-info-text">
                                <div className="b-flight-info-text__time">
                                    17:50 TXL
                                </div>
                                <div className="b-flight-info-text__date">
                                    1 ноя, вс
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="b-flight-info b-flight-info_back">
                        <div className="b-flight-info__text">
                            <div className="b-flight-info-text">
                                <div className="b-flight-info-text__time">
                                    11:40 TXL
                                </div>
                                <div className="b-flight-info-text__date">
                                    15 ноя, вс
                                </div>
                            </div>
                        </div>
                        <div className="b-flight-info__flight">
                            <div className="b-flight-info-trip">
                                в пути: 2 ч 35 мин<br />
                                без пересадок
                            </div>
                        </div>
                        <div className="b-flight-info__text b-flight-info__text_to">
                            <div className="b-flight-info-text">
                                <div className="b-flight-info-text__time">
                                    16:45 DME
                                </div>
                                <div className="b-flight-info-text__date">
                                    15 ноя, вс
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return null;
    }

    renderActions() {
        if (this.props.data) {
            return (
                <div className="b-avia-card-actions">
                    Еще 189 вариантов перелета
                </div>
            );
        }

        return null;
    }

    render() {
        return (
            <div className="b-avia-card">
                <div className="b-avia-card__aircompany">
                    {this.renderTransporterInfo()}
                </div>
                {this.renderFlightInfo()}
                <div className="b-avia-card__actions">
                    {this.renderActions()}
                </div>
            </div>
        );
    }
}

export default AviaCard;