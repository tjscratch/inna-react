import React, {PropTypes, Component} from 'react';
import styles from './TicketAbout.scss';
import withViewport from '../../decorators/withViewport';
import withStyles from '../../decorators/withStyles';
import Overlay from '../ui/Overlay';
import Btn from '../ui/Btn';
import Icon from '../ui/Icon';

import {apiDateToJsDate, toHHMM, dateToDDMMMDay, minutesToHHMM} from '../../helpers/DateHelper.js';
import {pluralize} from '../../helpers/CountHelper.js';

@withViewport
@withStyles(styles)
class TicketAbout extends Component {
  constructor(props) {
    super(props)
  }

  getTransporterLogo(etap) {
    if (etap && etap.TransporterLogo) {
      var logo = etap.TransporterLogo;
      return `https://s.inna.ru/Files/logo/${logo}.png`;
    }

    return '';
  }

  renderBodyOneWay(item, ix) {
    let inTime = apiDateToJsDate(item.InTime)
    let outTIme = apiDateToJsDate(item.OutTime)

    return (
      <div key={ix}>
        <div className="b-details-fly">
          <div className="b-details-fly__row">
            <div className="icon-emb-flight-1 icon-vilet"></div>
            <div>
              <b>вылет {toHHMM(outTIme)}</b>, {dateToDDMMMDay(outTIme)} <br/>
              { (item.InCity != item.InPort) ? item.OutCity + ',' + item.OutPort : '' }
              { (item.InCity == item.InPort) ? item.OutCity : '' }
            </div>
            <div>{item.OutCode}</div>
          </div>
          { (item.WayTime > 0) ?
            <div className="b-details-fly__way-time">Перелет: {minutesToHHMM(item.WayTime)}</div> : '' }
          { (!(item.WayTime > 0)) ? <div>&nbsp;</div> : '' }
          <div className="b-details-fly__row">
            <div className="icon-emb-flight-1"></div>
            <div>
              <b>прилет {toHHMM(inTime)}</b>, {dateToDDMMMDay(inTime)} <br/>
              { (item.InCity != item.InPort) ? item.InCity + ',' + item.InPort : '' }
              { (item.InCity == item.InPort) ? item.InCity : '' }
            </div>
            <div>{item.InCode}</div>
          </div>
          <div className="b-details-aviacompany">
            <div>
              <img src={this.getTransporterLogo(item)} alt=""/>
            </div>
            <div>
              {item.TransporterName}, рейс {item.Number} <br/>
              {item.VehicleName}
            </div>
          </div>
        </div>
      </div>
    )
  }


  renderOneWay() {
    let data = this.props.data;
    let etapsTo = data.EtapsTo;
    console.log(etapsTo);
    return (
      <div>
        <div className="content-ticket-about__head content-ticket-about__head_one">
          <div className="content-head-ticket-about__row">
            <span>{data.CityFrom}</span>
            <span className="icon-emb-right-small" style={{fontSize: 30}}></span>>
            <span>{data.CityTo}</span>
          </div>
          <div className="content-head-ticket-about__row">
            в пути:
            {minutesToHHMM(data.TimeTo)}, {data.ToTransferCount > 0 ?
            `${data.ToTransferCount} ${pluralize(data.ToTransferCount, ['пересадка', 'пересадки', 'пересадок'])}` : 'без пересадок'}
          </div>
        </div>
        <div className="b-ticket_about-one__content">
          {etapsTo.map((item, ix) => {
            return this.renderBodyOneWay(item, ix);
          }, this)}
        </div>
      </div>
    )
  }

  renderTwoWay() {
    let data = this.props.data;
    let etapsTo = this.props.data.EtapsTo;
    let etapsBack = this.props.data.EtapsBack;

    return (
      <div className="container-two-ways">
        <div className="container-two-ways__one">
          <div className="content-ticket-about__head content-ticket-about__head_one">
            <div className="content-head-ticket-about__row">
              <span>{data.CityFrom}</span>
              <Icon name="ArrowRight" size={30}/>
              <span className="icon-emb-right-small" style={{fontSize: 30}}></span>
              <span>{data.CityTo}</span>
            </div>
            <div className="content-head-ticket-about__row">
              в пути:
              {minutesToHHMM(data.TimeTo)}, {data.ToTransferCount > 0 ?
              `${data.ToTransferCount} ${pluralize(data.ToTransferCount, ['пересадка', 'пересадки', 'пересадок'])}` : 'без пересадок'}
            </div>
          </div>
          <div className="b-ticket_about-one__content">
            {etapsTo.map((item, ix) => {
              return this.renderBodyOneWay(item, ix);
            }, this)}
          </div>
        </div>
        <div className="container-two-ways__two">
          <div className="content-ticket-about__head content-ticket-about__head_two">
            <div className="content-head-ticket-about__row">
              <span>{data.CityTo}</span>
              <span className="icon-emb-right-small" style={{fontSize: 30}}></span>
              <span>{data.EtapsBack[data.EtapsBack.length - 1].InCity}</span>
            </div>
            <div className="content-head-ticket-about__row">
              в пути:
              {minutesToHHMM(data.TimeBack)}, {data.BackTransferCount > 0 ?
              `${data.BackTransferCount} ${pluralize(data.BackTransferCount, ['пересадка', 'пересадки', 'пересадок'])}` :
              'без пересадок'}
            </div>
          </div>
          <div className="b-ticket_about-one__content">
            {etapsBack.map((item, ix) => {
              return this.renderBodyOneWay(item, ix);
            }, this)}
          </div>
        </div>
      </div>
    )
  }

  closeTicketAbout(e) {
    this.props.isOpen(e)
  }

  render() {
    let data = this.props.data;
    return (
      <Overlay className="Overlay__TicketAbout">
        <div className="Overlay__TicketAboutOverlay"
             onClick={this.closeTicketAbout.bind(this)}>
          <div className="TicketAbout">

            <div className={`b-ticket-about_one-way ${data.EtapsBack.length > 0 ? 'b-ticket-about_two-ways' : ''}`}>
              <div className="TicketAboutHead">
                <div className="TicketAboutHead__Back" onClick={this.closeTicketAbout.bind(this)}>
                  <Icon name="Back" size={35} className="TicketAboutHead__Icon"/>
                </div>
                <div className="TicketAboutHead__Title">
                  Подробная информация по перелету
                </div>
                <div className="TicketAboutHead__Close" onClick={this.closeTicketAbout.bind(this)}>
                  <i className="TicketAboutHead__Icon icon-emb-cancel"></i>
                </div>
              </div>
              <div className="b-tickets-about__content-ticket-about">
                {(data.EtapsBack.length > 0) ? this.renderTwoWay() : null}
              </div>
              <div className="TicketAboutFooter">
                <div>
                </div>
                <Btn small={true}>
                  Выбрать
                </Btn>
              </div>
            </div>

          </div>
        </div>
      </Overlay>
    )
  }
}

export default TicketAbout;
