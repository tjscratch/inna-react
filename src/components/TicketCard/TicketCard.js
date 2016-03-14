import React, { PropTypes } from 'react';
import styles from './TicketCard.scss';
import withStyles from '../../decorators/withStyles';
import withViewport from '../../decorators/withViewport';

import { apiDateToJsDate, toHHMM, dateToDDMMMDay, minutesToHHMM } from '../../helpers/DateHelper.js';
import { pluralize } from '../../helpers/CountHelper.js';

import ListType from '../PackagesSearchResultsPage/ListType.js';

import ButtonSecondary from '../ui/Buttons/ButtonSecondary/ButtonSecondary.js'

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
            var aircompanyTo = data.EtapsTo[0];
            //обратно
            var BackDepartureDate = apiDateToJsDate(data.BackDepartureDate);
            var BackArrivalDate = apiDateToJsDate(data.BackArrivalDate);
            return (
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
                                    <span className="FlightInfo-airport-name">
                                        {data.AirportTo}
                                    </span>
                            </div>
                        </div>

                    </div>

                    <div className="FlightInfo__transfer">
                        в
                        пути:
                        {minutesToHHMM(data.TimeTo)}, {data.ToTransferCount > 0 ?
                        `${data.ToTransferCount} ${pluralize(data.ToTransferCount, ['пересадка', 'пересадки', 'пересадок'])}` : 'без пересадок'}
                    </div>

                    <div className='FlightInfo__row'>

                        <div className='FlightInfo__icons'>
                            <img className="FlightInfo-icon"
                                 alt={aircompanyTo.TransporterName}
                                 src={this.getTransporterLogo(aircompanyTo)}/>
                        </div>

                        <div className='FlightInfo-text'>
                            <div className="FlightInfo-data-block">
                                    <span className="FlightInfo-time">
                                        {toHHMM(BackDepartureDate)}
                                    </span>
                                    <span className="FlightInfo-date">
                                        {dateToDDMMMDay(BackDepartureDate)}
                                    </span>
                            </div>
                            <div className="FlightInfo-airport">
                                    <span className="FlightInfo-airport-code">
                                        {data.OutCodeBack}
                                    </span>
                                    <span className="FlightInfo-airport-name">
                                        {data.AirportFromBack}
                                    </span>
                            </div>
                        </div>

                        <div className='FlightInfo-delimiter'>
                            <i className='icon-emb-right-small'></i>
                        </div>

                        <div className='FlightInfo-text'>
                            <div className="FlightInfo-data-block">
                                    <span className="FlightInfo-time">
                                        {toHHMM(BackArrivalDate)}
                                    </span>
                                    <span className="FlightInfo-date">
                                        {dateToDDMMMDay(BackArrivalDate)}
                                    </span>
                            </div>
                            <div className="FlightInfo-airport">
                                    <span className="FlightInfo-airport-code">
                                        {data.InCodeBack}
                                    </span>
                                    <span className="FlightInfo-airport-name">
                                        {data.AirportToBack}
                                    </span>
                            </div>
                        </div>

                    </div>

                    <div className="FlightInfo__transfer">
                        в пути: {minutesToHHMM(data.TimeBack)}, {data.BackTransferCount > 0 ?
                        `${data.BackTransferCount} ${pluralize(data.BackTransferCount, ['пересадка', 'пересадки', 'пересадок'])}` :
                        'без пересадок'}
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
        console.log(this.props.data);
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
                    <div className="b-avia-card__actions">
                        <ButtonSecondary onClick={this.changeTicket.bind(this)}>
                            Заменить перелет
                        </ButtonSecondary>
                        <ButtonSecondary ButtonType='Link' onClick={(e)=>{this.ticketAbout(e)}}>
                            Подробнее
                        </ButtonSecondary>
                    </div>
                );
            }
            else {
                //сейчас выбраны пакеты - показываем кнопку переключения на авиабилеты
                //if (viewport.isMobile || showChangeTickets) {
                return (
                    <div className="b-avia-card__actions">
                        {
                            data.TicketsCount ?
                                <ButtonSecondary onClick={this.actionClick.bind(this)}>
                                    Еще {data.TicketsCount} {pluralize(data.TicketsCount, ['перелета', 'перелета', 'перелетов'])}
                                </ButtonSecondary>
                                :
                                <ButtonSecondary onClick={this.actionClick.bind(this)}>
                                    Заменить перелет
                                </ButtonSecondary>
                        }
                        <ButtonSecondary ButtonType='Link' onClick={(e)=>{this.ticketAbout(e)}}>
                            Подробнее
                        </ButtonSecondary>
                    </div>
                );
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
