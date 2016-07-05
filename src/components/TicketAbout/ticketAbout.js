import React, {PropTypes, Component} from 'react';
import styles from './TicketAbout.scss';
import withViewport from '../../decorators/withViewport';
import withStyles from '../../decorators/withStyles';
import Overlay from '../ui/Overlay';
import Btn from '../ui/Btn';
import Icon from '../ui/Icon';

import {apiDateToJsDate, toHHMM, dateToDDMMMDay, dateToDDMMMDayYear, minutesToHHMM} from '../../helpers/DateHelper.js';
import {pluralize} from '../../helpers/CountHelper.js';

@withViewport
@withStyles(styles)
class TicketAbout extends Component {
  constructor(props) {
    super(props)
  }

  closeTicketAbout(e) {
    this.props.isOpen(e)
  }

  getTransporterLogo(etap) {
    if (etap && etap.TransporterLogo) {
      var logo = etap.TransporterLogo;
      return `https://s.inna.ru/Files/logo/${logo}.png`;
    } else {
      return '';
    }
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
    let outTime = apiDateToJsDate(item.OutTime)
    return (
      <div className="DetailsFly" key={ix}>
        <div className="DetailsFly__Container">

          <div className="DetailsFly_Segment">

            <div className="DetailsFly__Row">
              <div className="DetailsFly__Item DetailsFly__Item_first">
                {item.OutCode}
              </div>
              <div className="DetailsFly__Item">
                <div className="DetailsFly__Date">
                  вылет {toHHMM(outTime)}, {dateToDDMMMDayYear(outTime)}
                </div>
                <div className="DetailsFly__CityPort">
                  { (item.OutCity != item.OutPort) ? item.OutCity + ', ' + item.OutPort : '' }
                  { (item.OutCity == item.OutPort) ? item.OutCity : '' }
                </div>
              </div>
            </div>

            <div className="DetailsFly__Delimiter"></div>

            <div className="DetailsFly__Row">
              <div className="DetailsFly__Item DetailsFly__Item_first">
                {item.InCode}
              </div>
              <div className="DetailsFly__Item">
                <div className="DetailsFly__Date">
                  прилет {toHHMM(inTime)}, {dateToDDMMMDayYear(inTime)}
                </div>
                <div className="DetailsFly__CityPort">
                  { (item.InCity != item.InPort) ? item.InCity + ', ' + item.InPort : '' }
                  { (item.InCity == item.InPort) ? item.InCity : '' }
                </div>
              </div>
            </div>

          </div>

          <div className="DetailsFly__AirlineInfo">
            <div className="DetailsFly__LogoAirline">
              <img src={this.getTransporterLogo(item)} alt=""/>
            </div>
            <div className="DetailsFly__Airline">
              {item.TransporterName}<br/>
              Рейс {item.Number}<br/>
              {item.VehicleName}
            </div>
            { (item.WayTime > 0) ?
              <div className="DetailsFly__WayTime">Перелет: {minutesToHHMM(item.WayTime)}</div>
              : ''}
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
                `${data.ToTransferCount} ${pluralize(data.ToTransferCount, ['пересадка', 'пересадки', 'пересадок'])}`
                :
                'без пересадок'
              }
            </div>
          </div>

          {etapsTo.map((item, ix) => {
            return this.renderBodyOneWay(item, ix);
          }, this)}

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
                  `${data.BackTransferCount} ${pluralize(data.BackTransferCount, ['пересадка', 'пересадки', 'пересадок'])}`
                  :
                  'без пересадок'
                }
              </div>
            </div>

            {etapsBack.map((item, ix) => {
              return this.renderBodyOneWay(item, ix);
            }, this)}

          </div>
          : null}


      </div>
    )
  }

  render() {
    return (
      <Overlay className="Overlay__TicketAbout">
        <div className="Overlay__TicketAboutOverlay">
          <div onClick={this.closeTicketAbout.bind(this)}></div>
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
