import React, { PropTypes } from 'react';
import styles from './TicketCard.scss';
import withStyles from '../../decorators/withStyles';
import withViewport from '../../decorators/withViewport';

import { apiDateToJsDate, toHHMM, dateToDDMMMDay, minutesToHHMM } from '../../helpers/DateHelper.js';
import { pluralize } from '../../helpers/CountHelper.js';

import ListType from '../PackagesSearchResultsPage/ListType.js';

@withViewport
@withStyles(styles)
class TicketCard extends React.Component {
    constructor (props) {
        super(props);
    }

    getTransporterLogo (etap) {
        if (etap && etap.TransporterLogo) {
            var logo = etap.TransporterLogo;
            return `https://s.inna.ru/Files/logo/${logo}.png`;
        }

        return '';
    }

    renderFlightInfo () {
        var { data } = this.props;
        if (data) {
            //туда
            var DepartureDate = apiDateToJsDate(data.DepartureDate);
            var ArrivalDate = apiDateToJsDate(data.ArrivalDate);
            let aircompanyTo = data.EtapsTo[0];

            //обратно
            var BackDepartureDate = apiDateToJsDate(data.BackDepartureDate);
            var BackArrivalDate = apiDateToJsDate(data.BackArrivalDate);

            return (
                <div className="b-avia-card__flight-info">

                    <div className='FlightInfo'>
                        <div className='FlightInfo__row'>

                            <div className='FlightInfo__icons'>
                                <img className="FlightInfo-icon"
                                     alt={aircompanyTo.TransporterName}
                                     src={this.getTransporterLogo(aircompanyTo)}/>
                            </div>

                            <div className='FlightInfo-text'>
                                <div className="FlightInfo-data-block">
                                    <span className="FlightInfo-time">
                                        {toHHMM(DepartureDate)}
                                    </span>
                                    <span className="FlightInfo-date">
                                        {dateToDDMMMDay(DepartureDate)}
                                    </span>
                                </div>
                                <div className="FlightInfo-airport">
                                    <span className="FlightInfo-airport-code">
                                        {data.OutCode}
                                    </span>
                                    <span className="FlightInfo-airport-name">
                                        {data.AirportFrom}
                                    </span>
                                </div>
                            </div>

                            <div className='FlightInfo-delimiter'>
                                <i className='icon-emb-right-small'></i>
                            </div>

                            <div className='FlightInfo-text'>
                                <div className="FlightInfo-data-block">
                                    <span className="FlightInfo-time">
                                        {toHHMM(ArrivalDate)}
                                    </span>
                                    <span className="FlightInfo-date">
                                        {dateToDDMMMDay(ArrivalDate)}
                                    </span>
                                </div>
                                <div className="FlightInfo-airport">
                                    <span className="FlightInfo-airport-code">
                                        {data.InCode}
                                    </span>
                                    {data.AirportTo}
                                </div>
                            </div>

                        </div>
                    </div>

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

    actionClick () {
        var { events } = this.props;
        if (events && events.changeListType) {
            events.changeListType(ListType.Tickets);
        }
    }

    changeTicket () {
        var { events } = this.props;
        if (events && events.changeTicket) {
            events.changeTicket();
        }
    }

    ticketAbout (e) {
        e.preventDefault();

        var { events } = this.props;
        if (events && events.ticketAbout) {
            events.ticketAbout();
        }
    }

    renderActions () {
        var { data, showChangeTickets, events, viewport } = this.props;
        if (data) {
            //вид на странице отеля
            if (events && events.changeTicket && events.ticketAbout) {
                return (
                    <div>
                        <div className="b-avia-card__actions">
                            <div className="b-avia-card-actions" onClick={this.changeTicket.bind(this)}>
                                Заменить перелет
                            </div>
                        </div>
                        <a className="b-avia-card-actions__about-link" href=""
                           onClick={(e)=>{this.ticketAbout(e)}}>Подробнее о перелете</a>
                    </div>
                );
            }
            else {
                //сейчас выбраны пакеты - показываем кнопку переключения на авиабилеты
                //if (viewport.isMobile || showChangeTickets) {
                if (showChangeTickets) {
                    return (
                        <div className="b-avia-card__actions">
                            <div className="b-avia-card-actions" onClick={this.actionClick.bind(this)}>
                                {
                                    data.TicketsCount ?
                                        <div>
                                            Еще {data.TicketsCount} {pluralize(data.TicketsCount, ['вариант', 'варианта', 'вариантов'])} {pluralize(data.TicketsCount, ['перелета', 'перелета', 'перелетов'])}</div> :
                                        <div>Еще варианты перелета</div>
                                }
                            </div>
                        </div>
                    );
                }
                else {
                    return null;
                    //return (
                    //    <div className="b-avia-card__actions">
                    //        <a href="">Подробнее</a>
                    //    </div>
                    //);
                }
            }
        }

        return null;
    }

    render () {
        return (
            <div className="b-avia-card">
                {this.renderFlightInfo()}
                {this.props.allowActions ? this.renderActions() : null}
            </div>
        );
    }
}

export default TicketCard;
