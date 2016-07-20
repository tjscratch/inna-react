//компонент - шаблон, для сождания новых компонентов

import React, {PropTypes, Component} from 'react';
import styles from './ReservationPage.scss';
import withStyles from '../../decorators/withStyles';
import withViewport from '../../decorators/withViewport';
import Location from '../../core/Location';

import siteUrls from './../../constants/SiteUrls.js';

import {connect} from 'react-redux';
import {getHotelDetails, checkAvailability, makeReservation} from '../../actions/action_reservation';
import {getAllCountries} from '../../actions/action_directory';

import HotelDetailsPackage from '../HotelPage/HotelDetailsPackage';
import {getParamsForHotelDetails, getParamsForCheckAvailability, getParamsForMakeReservation} from '../../helpers/apiParamsHelper';
import {routeDateToJsDate} from '../../helpers/DateHelper';

import VisaAlert from '../VisaAlert';
import TarifsDescription from '../TarifsDescription';
import {CustomerInfoForm} from '../CustomerInfo';
import {WaitMsg, ErrorMsg} from '../ui/PopupMessages';
import BuyRequest from './BuyRequest';
import {PassengersForm} from '../Passengers';
import Checkbox from '../ui/Checkbox';
import Price from '../Price';
import PriceCard from '../PriceCard';
import BuyBtn from '../../components/ui/Buttons/BuyBtn';
import NeedSmsValidation from '../../components/NeedSmsValidation';
import {MobileSelectedFilter} from '../MobileFilters';

import {isInsideRf} from '../../helpers/tripHelper';

import {reduxForm} from 'redux-form';
export const fields = [
  'validation',
  'Agree',
  'email',
  'phone',
  'isNeededVisa',
  'isNeededTransfer',
  'isNeededMedicalInsurance',
  'customerWishlist',
  'passengers[].gender',
  'passengers[].name',
  'passengers[].lastName',
  'passengers[].birth',
  'passengers[].citizenship',
  'passengers[].docType',
  'passengers[].docNumber',
  'passengers[].docExpires',
  'passengers[].haveBonusCard',
  'passengers[].bonusCardNumber',
  'passengers[].bonusCardExpires'
];

import validate from './validateForm';

@withViewport
@withStyles(styles)
class ReservationPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      checkAvailabilityError: null,
      citizenshipList: null,
      smsValidationShow: false,
      reserveParams: null
    }
  }

  componentDidMount() {
    //set isMobile to form
    const {
      routeParams,
      viewport,
      fields: {validation},
    } = this.props;

    var {fromDate, toDate} = routeParams;

    //нужно для валидации
    //передаем признак мобильной версии
    //и дату вылета для валидации даты документа
    validation.onChange({
      isMobile: viewport.isMobile,
      expireDateTo: toDate ? routeDateToJsDate(toDate) : routeDateToJsDate(fromDate)
    });

    this.getData().then(()=> {
      var {data, citizenshipList} = this.props;
      //var { citizenshipList } = this.state;

      var citizenshipList = this.filterCitizenshipData(citizenshipList, data);
      this.setState({
        citizenshipList: citizenshipList
      });
    });
  }

  getData() {
    return Promise.all([
      this.getHotelData(),
      this.getCitizenshipData()
    ])
  }

  getCitizenshipData() {
    return new Promise((resolve, reject)=> {
      var {dispatch} = this.props;
      dispatch(getAllCountries())
        .then((action)=> {
          var {data, err} = action;
          if (data) {
            //приводим данные к нормальному виду
            //data = data.map((item)=> {
            //    return {
            //        name: item.Name,
            //        value: item.Id
            //    }
            //});
            //
            //this.setState({
            //    citizenshipList: data
            //});
          }
          else {
            console.error('getCitizenshipData err', err);
            this.setState({
              error: true
            });

          }
          resolve();
        });
    });
  }

  filterCitizenshipData(countries, data) {
    //фильтруем
    //удаляем из списка гражданств страну назначения
    if (countries && data && data.AviaInfo) {
      var aviaInfo = data.AviaInfo;
      var itTariff = data.AviaInfo.ItTariff;
      if (itTariff && aviaInfo.EtapsTo && aviaInfo.EtapsTo.length > 0) {
        //берем последний
        var lastEtap = aviaInfo.EtapsTo[aviaInfo.EtapsTo.length - 1];
        var countryId = lastEtap.InCountryId;

        if (countryId) {
          //console.log('filtering citizenshipList');
          //фильтруем
          countries = countries.filter((c)=> {
            if (c.value == countryId) {
              console.log('removed Id: ' + c.value + ' name: ' + c.name);
            }
            return c.value != countryId;
          });
        }
      }
    }

    return countries;
  }

  getHotelData() {
    return new Promise((resolve, reject)=> {
      var {routeParams, routeQuery, dispatch} = this.props;
      var {room} = routeQuery;

      var params = getParamsForHotelDetails(routeParams, room);//roomId

      dispatch(getHotelDetails(params))
        .then((action)=> {
          var {data, err} = action;
          if (data) {
          }
          else {
            console.error('HotelDetails err', err);
            this.setState({
              error: true
            });
          }
          //resolve();
          this.checkAvailability().then(()=> {
            resolve();
          })
        });
    });
  }

  checkAvailability() {
    return new Promise((resolve, reject)=> {
      var {routeParams, routeQuery, dispatch} = this.props;
      var {room} = routeQuery;

      var params = getParamsForCheckAvailability(routeParams, room);//roomId

      dispatch(checkAvailability(params))
        .then((action)=> {
          var {data, err} = action;
          if (data) {
          }
          else {
            console.error('checkAvailability err', err);
            this.setState({
              checkAvailabilityError: true
            });
          }
          resolve();
        });
    });
  }

  filterDocsList(citizenship) {
    var {data} = this.props;
    //console.log('filterDocsList', data, citizenship);

    if (citizenship) {
      //Россия
      if (citizenship == 189) {
        if (data) {
          var item = data.AviaInfo;
          //если поездка по России
          if (item && isInsideRf(item)) {
            return [
              {value: 1, name: 'Паспорт РФ'},
              {value: 2, name: 'Загранпаспорт'},
              {value: 3, name: 'Св-во о рождении'}
            ];
          }
          else {
            return [
              {value: 2, name: 'Загранпаспорт'}
            ];
          }
        }
      }
      else {
        //гражданство не Россия
        return [
          {value: 4, name: 'Иностранный документ'}
        ];
      }
    }

    return null;
  }

  isRuCitizenshipAndInsiderRf(citizenship) {
    var {data} = this.props;
    if (citizenship) {
      //Россия
      if (citizenship == 189) {
        if (data) {
          var item = data.AviaInfo;
          //если поездка по России
          if (item && isInsideRf(item)) {
            return true;
          }
        }
      }
    }

    return false;
  }

  onRequestSendClick() {
    console.log('onRequestSendClick');
  }

  onBuyFormSubmit(formData) {
    console.log('onBuyFormSubmit', formData);

    var {routeParams, routeQuery, dispatch} = this.props;
    var {room} = routeQuery;

    var params = getParamsForMakeReservation(routeParams, room, formData);
    console.log('params', JSON.stringify(params));

    this.setState({
      reserveParams: params
    })


    if (this.props.data) {
      if (this.props.data.NeedSmsValidation) {
        if (this.props.values.phone) {
          this.setState({
            smsValidationShow: true
          })
        }
      } else {
        this.gotoBuyPage();
      }
    }
  }

  gotoBuyPage() {
    var that = this;
    var {dispatch} = this.props;
    console.log('gotoBuyPage')
    console.log(this.state.reserveParams);
    dispatch(makeReservation(this.state.reserveParams))
      .then((action)=> {
        var {data, err} = action;
        if (data) {
          console.log('action data', data);

          //отель забронирован
          if (data.Status == 1) {
            var url = `${siteUrls.Buy}${data.OrderNum}`;
            Location.pushState(null, url);
          }
          else {
            that.setState({
              error: 'make reservation error'
            })
          }
          /*
           {Status: 1, OrderNum: "SU6YOO", HotelBooked: true}
           */
        }
        else {
          console.error('makeReservation err', err);
        }
      });
  }

  smsValid(data) {
    console.log('smsValid')
    console.log(data);
    this.setState({
      smsValidationShow: false
    })
    this.gotoBuyPage();
  }

  renderOverlay() {
    var {data, availableData} = this.props;
    var {error, checkAvailabilityError} = this.state;

    if (this.state.smsValidationShow) {
      let phone = this.props.values.phone;
      return (
        <NeedSmsValidation phone={phone} smsValid={this.smsValid.bind(this)}/>
      );
    }
    if (error) {
      return (
        <WaitMsg
          data={{title:'Произошла ошибка', text:'Пожалуйста позвоните нам'}}
          close={()=>{
                                console.log('popup close');
                                Location.pushState(null, '/');
                            }}
          cancel={()=>{
                                console.log('popup cancel');
                                Location.pushState(null, '/');
                            }}
        />
      );
    }
    if (checkAvailabilityError) {
      return (
        <WaitMsg
          data={{title:'К сожалению, билеты на выбранный вариант уже недоступны', text:'Пожалуйста, выберите новый вариант перелета'}}
          close={()=>{
                                console.log('popup close');
                                Location.pushState(null, '/');
                            }}
          cancel={()=>{
                                console.log('popup cancel');
                                Location.pushState(null, '/');
                            }}
        />
      );
    }
    else if (data == null || availableData == null) {
      return (
        <WaitMsg
          data={{title:'Собираем данные', text:'Это может занять какое-то время'}}
        />
      );
    }

    return null;
  }

  render() {
    var {data, routeParams, viewport} = this.props;
    var events = null;

    var price = data ? data.Price : 0;
    var priceData = data ? {price: data.Price} : null;

    //console.log('render data:', data);

    var {citizenshipList} = this.state;

    const {
      fields: {passengers, Agree},
      handleSubmit,
      resetForm,
      submitting
    } = this.props;

    if (true || data) {
      return (
        <section className="b-reservation-page">
          {this.renderOverlay()}
          <div className="b-reservation-page__mobile-filter">
            <MobileSelectedFilter disableFilterBtn={false}>
              <div className="b-reservation-page__head-filter__caption">
                <div>Оплата пакета</div>
              </div>
            </MobileSelectedFilter>
          </div>
          <div className="b-reservation-page__header" style={{'display': 'none'}}>
          </div>
          <div className="b-reservation-page__header-desc" style={{'display': 'none'}}>
          </div>
          <div className="b-reservation-page__variant">
            <HotelDetailsPackage
              title="Оформление и оплата"
              price={price}
              events={events} data={data}/>
          </div>
          <div className="b-reservation-page__visa-alert" style={{'display': 'none'}}>
            <VisaAlert />
          </div>
          <div className="b-reservation-page__tarifs-desc" style={{'display': 'none'}}>
            <TarifsDescription />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="b-reservation-page__customer">
              <CustomerInfoForm {...this.props}/>
            </div>
            <div className="b-reservation-page__buy-request" style={{'display': 'none'}}>
              <BuyRequest onSendClick={this.onRequestSendClick.bind(this)}/>
            </div>
            <div className="b-reservation-page__passengers">
              <PassengersForm {...this.props}
                filterDocsList={this.filterDocsList.bind(this)}
                isRuCitizenshipAndInsiderRf={this.isRuCitizenshipAndInsiderRf.bind(this)}
                citizenshipList={citizenshipList}/>
            </div>
            <div className="b-reservation-page__comments">
              <div className="b-reservation-page-comments__head">
                Пожелания к номеру
              </div>
              <div className="b-reservation-page-comments__body">
                <div className="b-reservation-page-comments-text">
                  {
                    viewport.isMobile ?
                      <textarea rows="1" placeholder="Please write your requests in english">
                                        </textarea>
                      :
                      <textarea rows="4">
                                        </textarea>
                  }
                </div>
                <div className="b-reservation-page-comments-label">
                  <span className="b-reservation-page-comments-label_one">Ваши пожелания мы передадим в отель, но не можем гарантировать их исполнение.</span>
                  <span className="b-reservation-page-comments-label_two">Пожалуйста, пишите ваши пожелания на английском языке.</span>
                </div>
              </div>
            </div>
            <div className="b-reservation-page__additional-services">
              <div className="b-reservation-page-additional-services__head">
                Дополнительные услуги
              </div>
              <div className="b-reservation-page-additional-services__lbl">
                Данные услуги не включены в стоимость заказа, после оплаты заказа наш менеджер свяжется
                c
                Вами и предложит разные варианты.
              </div>
              <div className="b-reservation-page-additional-services__body">
                <div className="b-reservation-page-additional-services-item"><Checkbox text="Виза"/>
                </div>
                <div className="b-reservation-page-additional-services-item"><Checkbox text="Трансфер"/>
                </div>
              </div>
            </div>
            <div className="b-reservation-page__agreement">
              <Checkbox align="top" {...Agree}>
                <div className="b-reservation-page-agreement">
                  Я принимаю условия <a href="#">договора-оферты</a>, <a href="#">договора IATA</a>,
                  <a
                    href="#">ТКП</a>, <a href="#">тарифов</a>, и не возражаю против обработки моих
                  <br/>персональных
                  данных и передачи их третьим лицам (авиаперевозчику и пр.).
                </div>
              </Checkbox>
              {Agree.touched && Agree.error && <div className="b-passenger-err-label">{Agree.error}</div>}
            </div>
            <div className="b-reservation-page__buy-block">
              <div className="b-reservation-page-buy-block__lbl">
                Сумма к оплате:
              </div>
              <div className="b-reservation-page-buy-block__price">
                <Price data={price}/>
              </div>
              <div className="b-reservation-page-buy-block__button">
                <BuyBtn text="Перейти к оплате" onSubmit={handleSubmit(this.onBuyFormSubmit.bind(this))}/>
              </div>
            </div>
            <div className="b-reservation-page__buy-block-mobile">
              <PriceCard data={priceData} onSubmit={handleSubmit(this.onBuyFormSubmit.bind(this))}/>
            </div>
          </form>
        </section>
      );
    }

    return (
      <section className="b-reservation-page">
        {this.renderOverlay()}
        <div className="b-reservation-page__header">
          loading data...
        </div>
      </section>
    )
  }

}

//export default ReservationPage;

function generatePassengers(count) {
  var res = [];
  for (var i = 0; i < count; i++) {
    res.push({});
    //res.push({ name: `pas ${i+1}`});
  }
  return res;
}

function mapStateToProps(state) {
  return {
    citizenshipList: state.countries,
    data: state.reservation,
    availableData: state.reservation_is_available,
    initialValues: {
      phone: '+7',
      //генерим пассажиров по кол-ву билетов
      passengers: state.reservation && state.reservation.AviaInfo ? generatePassengers(state.reservation.AviaInfo.PassengerCount) : []
    }
  }
}

//export default connect(
//    mapStateToProps
//)(ReservationPage)

export default reduxForm({
  form: 'customer',
  fields,
  validate
}, mapStateToProps)(ReservationPage);
