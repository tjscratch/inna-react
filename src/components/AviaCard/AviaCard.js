import React, { PropTypes } from 'react';
import styles from './AviaCard.scss';
import withStyles from '../../decorators/withStyles';

import { apiDateToJsDate, toHHMM, dateToDDMMMDay, minutesToHHMM } from '../../core/DateHelper.js';
import { pluralize } from '../../core/CountHelper.js';

import ListType from '../PackagesSearchResultsPage/ListType.js';

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

    //<i className="icon-emb-flight"></i>
    renderTransporterInfo() {
        if (this.props.data) {
            var data = this.props.data.EtapsTo[0];
            //console.log('AviaCard data', this.props.data);
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
            var data = this.props.data;
            //туда
            var DepartureDate = apiDateToJsDate(data.DepartureDate);
            var ArrivalDate = apiDateToJsDate(data.ArrivalDate);

            //обратно
            var BackDepartureDate = apiDateToJsDate(data.BackDepartureDate);
            var BackArrivalDate = apiDateToJsDate(data.BackArrivalDate);

            return (
                <div className="b-avia-card__flight-info">

                    <div className="b-flight-info">
                        <div className="b-flight-info__text b-flight-info__text_from">
                            <div className="b-flight-info-text">
                                <div className="b-flight-info-date-block">
                                    <div className="b-flight-info-time">
                                        {toHHMM(DepartureDate)}
                                    </div>
                                    <div className="b-flight-info-date">
                                        {dateToDDMMMDay(DepartureDate)}
                                    </div>
                                </div>
                                <div className="b-flight-info-airport-block">
                                    <div className="b-flight-info-date-airport" title={data.AirportFrom}>
                                        {data.AirportFrom}
                                    </div>
                                    <div className="b-flight-info-date-airport-code">
                                        {data.OutCode}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="b-flight-info__text b-flight-info__text_to">
                            <div className="b-flight-info-text">
                                <div className="b-flight-info-date-block">
                                    <div className="b-flight-info-time">
                                        {toHHMM(ArrivalDate)}
                                    </div>
                                    <div className="b-flight-info-date">
                                        {dateToDDMMMDay(ArrivalDate)}
                                    </div>
                                </div>
                                <div className="b-flight-info-airport-block">
                                    <div className="b-flight-info-date-airport" title={data.AirportTo}>
                                        {data.AirportTo}
                                    </div>
                                    <div className="b-flight-info-date-airport-code">
                                        {data.InCode}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="b-flight-info-transfer">
                        в
                        пути: {minutesToHHMM(data.TimeTo)}, {data.ToTransferCount > 0 ? `${data.ToTransferCount} ${pluralize(data.ToTransferCount, ['пересадка', 'пересадки', 'пересадок'])}` : 'без пересадок'}
                    </div>


                    <div className="b-flight-info b-flight-info_back">
                        <div className="b-flight-info__text">
                            <div className="b-flight-info-text">
                                <div className="b-flight-info-date-block">
                                    <div className="b-flight-info-time">
                                        {toHHMM(BackDepartureDate)}
                                    </div>
                                    <div className="b-flight-info-date">
                                        {dateToDDMMMDay(BackDepartureDate)}
                                    </div>
                                </div>
                                <div className="b-flight-info-airport-block">
                                    <div className="b-flight-info-date-airport" title={data.AirportFromBack}>
                                        {data.AirportFromBack}
                                    </div>
                                    <div className="b-flight-info-date-airport-code">
                                        {data.OutCodeBack}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="b-flight-info__text b-flight-info__text_to">
                            <div className="b-flight-info-text">
                                <div className="b-flight-info-date-block">
                                    <div className="b-flight-info-time">
                                        {toHHMM(BackArrivalDate)}
                                    </div>
                                    <div className="b-flight-info-date">
                                        {dateToDDMMMDay(BackArrivalDate)}
                                    </div>
                                </div>
                                <div className="b-flight-info-airport-block">
                                    <div className="b-flight-info-date-airport" title={data.AirportToBack}>
                                        {data.AirportToBack}
                                    </div>
                                    <div className="b-flight-info-date-airport-code">
                                        {data.InCodeBack}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="b-flight-info-transfer">
                        в
                        пути: {minutesToHHMM(data.TimeBack)}, {data.BackTransferCount > 0 ? `${data.BackTransferCount} ${pluralize(data.BackTransferCount, ['пересадка', 'пересадки', 'пересадок'])}` : 'без пересадок'}
                    </div>
                </div>
            );
        }

        return null;
    }

    actionClick() {
        if (this.props.events && this.props.events.changeListType) {
            this.props.events.changeListType(ListType.Avia);
        }
    }

    renderActions() {
        var data = this.props.data;
        if (data) {
            //сейчас выбраны пакеты - показываем кнопку переключения на авиабилеты
            if (data.CurrentListType == ListType.Packages) {
                return (
                    <div className="b-avia-card-actions" onClick={this.actionClick.bind(this)}>
                        {
                            data.TicketsCount ?
                            <div>Еще {data.TicketsCount} {pluralize(data.TicketsCount, ['вариант', 'варианта', 'вариантов'])} {pluralize(data.TicketsCount, ['перелета', 'перелета', 'перелетов'])}</div> :
                            <div>Еще варианты перелета</div>
                        }
                    </div>
                );
            }
            else {
                return (
                    <a href="">Подробнее</a>
                );
            }
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