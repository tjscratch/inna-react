//компонент - шаблон, для сождания новых компонентов

import React, { PropTypes, Component } from 'react';
import styles from './ReservationPage.scss';
import withStyles from '../../decorators/withStyles';
import withViewport from '../../decorators/withViewport';
import Location from '../../core/Location';

//api
import api from './../../core/ApiClient';
import apiUrls from './../../constants/ApiUrls.js';
import siteUrls from './../../constants/SiteUrls.js';

import { connect } from 'react-redux';
import { getHotelDetails } from '../../actions/action_reservation';
import { getAllCountries } from '../../actions/action_directory';
import { processField } from '../../actions/action_form';

import HotelDetailsPackage from '../HotelPage/HotelDetailsPackage';
import { getParamsForHotelDetails } from '../../helpers/apiParamsHelper';
import { routeDateToJsDate } from '../../helpers/DateHelper';

import VisaAlert from '../VisaAlert';
import TarifsDescription from '../TarifsDescription';
import CustomerInfo from '../CustomerInfo';
import { WaitMsg, ErrorMsg } from '../ui/PopupMessages';
import BuyRequest from './BuyRequest';
import Passengers from './Passengers';
import Checkbox from '../ui/Checkbox';
import Price from '../Price';
import PriceCard from '../PriceCard';
import BuyBtn from '../../components/ui/Buttons/BuyBtn';
import { MobileSelectedFilter } from '../MobileFilters';

import {reduxForm} from 'redux-form';
export const fields = [
    'validation',
    'agree',
    'email',
    'phone_suffix',
    'phone_number',
    'phone',
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
@withStyles(styles) class ReservationPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            citizenshipList: null
        }
    }

    componentDidMount() {
        //set isMobile to form
        const {
            routeParams,
            viewport,
            fields: { validation },
            } = this.props;

        var { fromDate, toDate } = routeParams;

        //нужно для валидации
        //передаем признак мобильной версии
        //и дату вылета для валидации даты документа
        validation.onChange({
            isMobile: viewport.isMobile,
            expireDateTo: toDate ? routeDateToJsDate(toDate) : routeDateToJsDate(fromDate)
        });

        this.getData().then(()=> {
            var { data } = this.props;
            var { citizenshipList } = this.state;

            var citizenshipList = this.filterCitizenshipData(citizenshipList, data);
            this.setState({
                citizenshipList: citizenshipList
            });
        });
    }

    getData() {
        //return new Promise((resolve) => {
        //    //инфа по отелю
        //    this.getHotelData().then(()=> {
        //        resolve();
        //    });
        //});

        return Promise.all([
            this.getHotelData(),
            this.getCitizenshipData()
        ])
    }

    getCitizenshipData() {
        return new Promise((resolve, reject)=> {
            var { dispatch } = this.props;
            dispatch(getAllCountries())
                .then((action)=> {
                    var { data, err } = action;
                    if (data) {
                        //приводим данные к нормальному виду
                        data = data.map((item)=> {
                            return {
                                name: item.Name,
                                value: item.Id
                            }
                        });

                        this.setState({
                            citizenshipList: data
                        });
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
            console.log('filtering citizenshipList');
            var aviaInfo = data.AviaInfo;
            if (aviaInfo.EtapsTo && aviaInfo.EtapsTo.length > 0) {
                //берем последний
                var lastEtap = aviaInfo.EtapsTo[aviaInfo.EtapsTo.length - 1];
                var countryId = lastEtap.InCountryId;

                if (countryId) {
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
            var { routeParams, routeQuery, dispatch } = this.props;
            var { room } = routeQuery;

            var params = getParamsForHotelDetails(routeParams, room);//roomId

            dispatch(getHotelDetails(params))
                .then((action)=> {
                    var { data, err } = action;
                    if (data) {
                    }
                    else {
                        console.error('HotelDetails err', err);
                        this.setState({
                            error: true
                        });
                    }
                    resolve();
                });
        });
    }

    onRequestSendClick() {
        console.log('onRequestSendClick');
    }

    onBuyFormSubmit(data) {
        console.log('onBuyFormSubmit', data);
    }

    renderOverlay() {
        var { data } = this.props;
        var { error } = this.state;

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
        else if (data == null) {
            return (
                <WaitMsg
                    data={{title:'Собираем данные', text:'Это может занять какое-то время'}}
                    />
            );
        }

        return null;
    }

    render() {
        var { data, routeParams, viewport } = this.props;
        var events = null;

        var price = data ? data.Price : 0;
        var priceData = data ? {price: data.Price} : null;

        //console.log('render data:', data);

        var { citizenshipList } = this.state;

        const {
            fields: {passengers, agree},
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
                    <div className="b-reservation-page__header">
                    </div>
                    <div className="b-reservation-page__header-desc">
                    </div>
                    <div className="b-reservation-page__variant">
                        <HotelDetailsPackage
                            title="Оформление и оплата"
                            price={price}
                            events={events} data={data}/>
                    </div>
                    <div className="b-reservation-page__visa-alert">
                        <VisaAlert />
                    </div>
                    <div className="b-reservation-page__tarifs-desc">
                        <TarifsDescription />
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="b-reservation-page__customer">
                            <CustomerInfo {...this.props}/>
                        </div>
                        <div className="b-reservation-page__buy-request">
                            <BuyRequest onSendClick={this.onRequestSendClick.bind(this)}/>
                        </div>
                        <div className="b-reservation-page__passengers">
                            <Passengers {...this.props} citizenshipList={citizenshipList}/>
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
                            <Checkbox align="top" {...agree}>
                                <div className="b-reservation-page-agreement">
                                    Я принимаю условия <a href="#">договора-оферты</a>, <a href="#">договора IATA</a>,
                                    <a
                                        href="#">ТКП</a>, <a href="#">тарифов</a>, и не возражаю против обработки моих
                                    <br/>персональных
                                    данных и передачи их третьим лицам (авиаперевозчику и пр.).
                                </div>
                            </Checkbox>
                            {agree.touched && agree.error && <div className="b-passenger-err-label">{agree.error}</div>}
                        </div>
                        <div className="b-reservation-page__buy-block">
                            <div className="b-reservation-page-buy-block__lbl">
                                Сумма к оплате:
                            </div>
                            <div className="b-reservation-page-buy-block__price">
                                <Price data={price}/>
                            </div>
                            <div className="b-reservation-page-buy-block__button">
                                <BuyBtn text="Перейти к оплате" onSubmit={handleSubmit(this.onBuyFormSubmit)}/>
                            </div>
                        </div>
                        <div className="b-reservation-page__buy-block-mobile">
                            <PriceCard data={priceData} onSubmit={handleSubmit(this.onBuyFormSubmit)}/>
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
        data: state.reservation,
        initialValues: {
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
