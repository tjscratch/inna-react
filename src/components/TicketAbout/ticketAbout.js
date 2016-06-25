import React, { PropTypes, Component } from 'react';
import styles from './TicketAbout.scss';
import withViewport from '../../decorators/withViewport';
import withStyles from '../../decorators/withStyles';
import Overlay from '../ui/Overlay';

import {apiDateToJsDate, toHHMM, dateToDDMMMDay, minutesToHHMM} from '../../helpers/DateHelper.js';
import {pluralize} from '../../helpers/CountHelper.js';

@withViewport
@withStyles(styles)
class TicketAbout extends Component {
    constructor (props) {
        super(props)
    }

    getTransporterLogo(etap) {
      if (etap && etap.TransporterLogo) {
        var logo = etap.TransporterLogo;
        return `https://s.inna.ru/Files/logo/${logo}.png`;
      }

      return '';
    }

    renderBodyOneWay () {
      let etapTo = this.props.EtapsTo;

      return (
        <div>
          {etapTo.map((etap, ix) => {
          return (
            <div key={ix}>
              <div class="rlf-part">
                <div class="rfl-column3">
                  <div class="rlf-aviacompany">
                    <img src={this.getTransporterLogo(etap)} alt="" style={{maxHeight: 25 + 'px', marginBottom: 5 + 'px' + '!important'}}/>
                      {etap.TransporterName}<br/>
                      рейс {etap.Number} <br/>
                      {etap.VehicleName}
                  </div>
                </div>
                <div class="b-tickets__container">
                  <div class="row b-tickets__block">
                    <div class="col-xs-4 col-no-padding">
                      <div class="rlf-airport">{etap.OutCode}</div>
                    </div>
                    <div class="col-xs-7 col-no-padding">
                      <div class="rlf-flight-info">
                        <b>вылет {toHHMM(etap.OutTime)}</b>, {dateToDDMMMDay(etap.OutDate)} <br/>
                        if(etap.InCity != etap.InPort) {
                          <span>{etap.OutCity}, {etap.OutPort}</span>
                        }
                        if(etap.InCity == etap.InPort) {
                          <span>{etap.OutCity}</span>
                        }
                      </div>
                    </div>
                  </div>
                  if(etap.WayTime > 0) {
                    <div class="rlf-travel-time">{etap.WayTimeFormatted}</div>
                  }
                  if(!(etap.WayTime > 0)) {
                    <div class="rlf-travel-time">&nbsp;</div>
                  }
                  <div class="row b-tickets__block">
                    <div class="col-xs-4 col-no-padding">
                      <div class="rlf-airport"><br/>{etap.InCode}</div>
                    </div>
                    <div class="col-xs-7 col-no-padding">
                      <div class="rlf-flight-info">
                        <b>прилет {toHHMM(etap.InTime)}</b>, {dateToDDMMMDay(etap.InDate)} <br/>
                        if(etap.InCity != etap.InPort) {
                          <span>{etap.InCity}, {etap.InPort}</span>
                        }
                        if(etap.InCity == etap.InPort) {
                          <span>{etap.InCity}</span>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/*
                <div class="rlf-part rlf-part_transfer" ng-if="!$last">
                  <div class="rlf-column1">
                    <div class="rlf-airport">Пересадка</div>
                    if(etap.TransferWaitTime > 0) {
                    <div class="rlf-travel-time">{minutesToHHMM(etap.WaitTime)}</div>
                  }
                    <div class="rlf-travel-time" ng-if="!(etap.TransferWaitTime > 0)">&nbsp;</div>
                  </div>
                  <div class="rlf-colum4">
                    <span ng-if="etap.NextOutCity != etap.NextOutPort">{etap.NextOutCity}, {etap.NextOutPort}
                      ({etap.NextOutCode}), {etap.NextOutCountryName}</span>
                    <span ng-if="etap.NextOutCity == etap.NextOutPort">{etap.NextOutPort}
                      ({etap.NextOutCode}), {etap.NextOutCountryName}</span>
                    <div class="rlf-transfer" ng-if="etap.alert">{etap.alert}</div>
                  </div>
                </div>
              */}
                </div>
            )
            })}
        </div>
      )

    }

    renderBodyTwoWay () {

    }

    renderOneWay () {
      let data = this.props;

      return (
        <div class="rlf-oneway">
        {data.map((item, ix) => {
          return (
            <div key={ix}>
              <div class="rlf-fly">
                <span class="rlf-city">{item.CityFrom}</span> {item.OutCode}
                <span class="rlf-fly-arrow rlf-fly-arrow_popup"></span>
                <span class="rlf-city">{item.CityTo}</span> {item.InCode}
                <div class="rlf-full-travel-time">
                  в пути:
                  {minutesToHHMM(data.TimeTo)}, {data.ToTransferCount > 0 ?
                  `${data.ToTransferCount} ${pluralize(data.ToTransferCount, ['пересадка', 'пересадки', 'пересадок'])}` : 'без пересадок'}
                </div>
              </div>
              <div class="b-ticket_1way-cont">
                  this.renderBodyOneWay()
              </div>
            </div>
          )
        })}
        </div>
      )
    }

    renderTwoWay () {
      let data = this.props;

      return (
        <div class="rlf-oneway">
          {data.map((item, ix) => {
            return (
              <div key={ix}>
                <div class="b-ticket_2ways">
                  <div class="row-fluid">
                    <div class="col-xs-5 col-no-padding row-fluid__cell">
                      <div class="rlf-fly">
                        <span class="rlf-city">{item.CityFrom}</span> {item.OutCode}
                        <span class="rlf-fly-arrow rlf-fly-arrow_popup"></span>
                        <span class="rlf-city">{item.CityTo}</span> {item.InCode}
                        <div class="rlf-full-travel-time">
                          в пути:
                          {minutesToHHMM(data.TimeTo)}, {data.ToTransferCount > 0 ?
                          `${data.ToTransferCount} ${pluralize(data.ToTransferCount, ['пересадка', 'пересадки', 'пересадок'])}` : 'без пересадок'}
                        </div>
                      </div>
                    </div>
                    <div class="col-xs-5 col-no-padding row-fluid__cell">
                      <div class="rlf-fly rlf-fly_back">
                        <span class="rlf-city">{item.CityTo}</span> {item.OutCodeBack}
                        <span class="rlf-fly-arrow"></span>
                        { _lastEtapBack = item.EtapsBack[item.EtapsBack.length - 1] ? '' : '' }
                        <span class="rlf-city">{_lastEtapBack.InCity}</span> {item.InCodeBack}
                        <div class="rlf-full-travel-time">
                          в пути:
                          {minutesToHHMM(data.TimeBack)}, {data.BackTransferCount > 0 ?
                          `${data.BackTransferCount} ${pluralize(data.BackTransferCount, ['пересадка', 'пересадки', 'пересадок'])}` :
                          'без пересадок'}
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
                <div class="b-ticket_2ways b-ticket_2ways-sep">
                    this.renderBodyTwoWay()
                </div>
              </div>
            )
          })}
        </div>
      )
    }

    render () {
        let data = this.props.data;
        console.log('asdasdsad');
        console.log(data);
        return (
          <Overlay>
            <div class="scroll-fix">
              <div class={`balloon balloon_ticket balloon_ticket_ticket-details js-ticket-info-baloon ${data.EtapsBack.length > 0 ? 'balloon_2ticket' : ''}`}>
                <span class="balloon-close" title="Закрыть" >
					          <i class="icon-sprite-remove-big"></i>
                </span>
                <h3 class="b-tickets__title">Подробная информация по перелету</h3>
                  {data.map((item, ix) => {
                      return (
                        <div key={ix} class="rlf-oneway">
                          if(item.EtapsBack.length > 0) {
                            this.renderTwoWay()
                          } else if(item.EtapsBack.length == 0 || item.EtapsBack.length == null) {
                            this.renderOneWay()
                          }
                        </div>
                      )
                  })}
                  <div class="b-tickets__footer">
                      <div class="b-tickets__footer-inner">
                        <a class="rl-buy-button" href="javascript:void(0);">Выбрать</a>
                      </div>
                  </div>
              </div>
            </div>
          </Overlay>
        )
    }
}

export default TicketAbout;
