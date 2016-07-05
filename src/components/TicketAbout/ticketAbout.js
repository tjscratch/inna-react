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

  renderTicketAboutHead() {
    return (
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
    );
  }

  renderTicketAboutFooter() {
    return (
      <div className="TicketAboutFooter">
        <div>
        </div>
        <Btn small={true}>
          Выбрать
        </Btn>
      </div>
    );
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


  renderTicketAboutContent() {
    let data = this.props.data;
    let etapsTo = this.props.data.EtapsTo;
    let etapsBack = this.props.data.EtapsBack;

    let twoWay = (etapsBack.length > 0) ? true : false;

    return (
      <div className="TicketAboutContent">

        <div className="TicketAboutContent_container TicketAboutContent_container__one">

          <div className="TicketAboutContentHead">

            <div className="TicketAboutContentHeadRow">
              <div className="TicketAboutContentHeadRow_item">{data.CityFrom}</div>
              <div className="TicketAboutContentHeadRow_item">
                <Icon name="ArrowRight" size={30}/>
              </div>
              <div className="TicketAboutContentHeadRow_item">{data.CityTo}</div>
            </div>

            <div className="TicketAboutContentHeadRow TicketAboutContentHeadRow__foot">
              в пути:&nbsp;
              {minutesToHHMM(data.TimeTo)},&nbsp;
              {(data.ToTransferCount > 0) ?
                `${data.ToTransferCount}&nbsp;${pluralize(data.ToTransferCount, ['пересадка', 'пересадки', 'пересадок'])}`
                :
                'без пересадок'
              }
            </div>
          </div>

          <div className="b-ticket_about-one__content">
            {etapsTo.map((item, ix) => {
              return this.renderBodyOneWay(item, ix);
            }, this)}
          </div>

        </div>


        {twoWay ?
          <div className="TicketAboutContent_container TicketAboutContent_container__two">

            <div className="TicketAboutContentHead">
              <div className="TicketAboutContentHeadRow">
                <div className="TicketAboutContentHeadRow_item">{data.CityTo}</div>
                <div className="TicketAboutContentHeadRow_item">
                  <Icon name="ArrowRight" size={30}/>
                </div>
                <div className="TicketAboutContentHeadRow_item">{data.EtapsBack[data.EtapsBack.length - 1].InCity}</div>
              </div>
              <div className="TicketAboutContentHeadRow TicketAboutContentHeadRow__foot">
                в пути:&nbsp;
                {minutesToHHMM(data.TimeBack)},&nbsp;
                {data.BackTransferCount > 0 ?
                  `${data.BackTransferCount}&nbsp;${pluralize(data.BackTransferCount, ['пересадка', 'пересадки', 'пересадок'])}`
                  :
                  'без пересадок'
                }
              </div>
            </div>
            <div className="b-ticket_about-one__content">
              {etapsBack.map((item, ix) => {
                return this.renderBodyOneWay(item, ix);
              }, this)}
            </div>
          </div>
          : null}


      </div>
    )
  }

  closeTicketAbout(e) {
    this.props.isOpen(e)
  }

  render() {
    return (
      <Overlay className="Overlay__TicketAbout">
        <div className="Overlay__TicketAboutOverlay" onClick={this.closeTicketAbout.bind(this)}>
          <div className="TicketAbout">
            <div className="TicketAbout__container">
              {this.renderTicketAboutHead()}
              {this.renderTicketAboutContent()}
              {this.renderTicketAboutFooter()}
            </div>
          </div>
        </div>
      </Overlay>
    )
  }
}

export default TicketAbout;
