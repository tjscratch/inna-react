import React, { PropTypes, Component } from 'react';
import styles from './BuyPage.scss';
import withStyles from '../../decorators/withStyles';
import withViewport from '../../decorators/withViewport';
import Location from '../../core/Location';

//api
import api from './../../core/ApiClient';
import apiUrls from './../../constants/ApiUrls.js';
import siteUrls from './../../constants/SiteUrls.js';

import { connect } from 'react-redux';
import { setBuyPageIsLoading, getBuyPageData, getPaymentRepricing } from '../../actions/action_buy';
import { getAllCountries } from '../../actions/action_directory';
//import { processField } from '../../actions/action_form';

import HotelDetailsPackage from '../HotelPage/HotelDetailsPackage';
import { getParamsForHotelDetails, getParamsForCheckAvailability, getParamsForMakeReservation } from '../../helpers/apiParamsHelper';
import { routeDateToJsDate } from '../../helpers/DateHelper';

import VisaAlert from '../VisaAlert';
import TarifsDescription from '../TarifsDescription';
import { CustomerInfo } from '../CustomerInfo';
import { WaitMsg, ErrorMsg } from '../ui/PopupMessages';
//import BuyRequest from './BuyRequest';
import { Passengers } from '../Passengers';
import Checkbox from '../ui/Checkbox';
import Price from '../Price';
import PriceCard from '../PriceCard';
import BuyBtn from '../../components/ui/Buttons/BuyBtn';
import { MobileSelectedFilter } from '../MobileFilters';

import {reduxForm} from 'redux-form';
export const fields = [
    'cardNum',
    'cardNum1',
    'cardNum2',
    'cardNum3',
    'cardNum4',
    'cardMonth',
    'cardYear',
    'cardHolder',
    'cardCvv'
];

import validate from './validateForm';

@withViewport
@withStyles(styles) class BuyPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);

        const {
            routeParams,
            viewport,
            fields: { validation },
            } = this.props;

        this.getData().then(()=> {
        });
    }

    getData() {
        //Payment/Repricing?OrderNumber=XWMM8X&ReturnType=1
        //Payment/Index?orderNum=XWMM8X
        //Avia/GetRule?varianBack=801130935&variantTo=801130827

        var { dispatch } = this.props;
        //загружаем данные
        dispatch(setBuyPageIsLoading(true));

        return Promise.all([
            this.getBuyPageData(),//getBuyPageData => getPaymentRepricing
            this.getCitizenshipData()
        ]).then(()=>{
            //все данные загрузились
            dispatch(setBuyPageIsLoading(false));
        })
    }

    getCitizenshipData() {
        return new Promise((resolve, reject)=> {
            var { dispatch } = this.props;
            dispatch(getAllCountries())
                .then((action)=> {
                    var { data, err } = action;
                    if (data) {
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

    getPaymentRepricing() {
        return new Promise((resolve, reject)=> {
            var { routeParams, dispatch } = this.props;
            var { orderNum } = routeParams;

            dispatch(getPaymentRepricing(orderNum))
                .then((action)=> {
                    var { data, err } = action;
                    if (data) {
                    }
                    else {
                        console.error('getPaymentRepricing err', err);
                        this.setState({
                            error: true
                        });

                    }
                    resolve();
                });
        });
    }

    //getBuyPageData => getPaymentRepricing
    getBuyPageData() {
        return new Promise((resolve, reject)=> {
            var { routeParams, routeQuery, dispatch } = this.props;
            var { room } = routeQuery;

            var params = {orderNum: routeParams.orderNum};

            dispatch(getBuyPageData(params))
                .then((action)=> {
                    var { data, err } = action;
                    if (data) {
                        //вызываем репрайсинг
                        this.getPaymentRepricing().then(()=>{
                            resolve();
                        });
                    }
                    else {
                        console.error('getBuyPageData err', err);
                        this.setState({
                            error: true
                        });
                        resolve();
                    }
                    //resolve();
                });
        });
    }

    onBuyFormSubmit(formData) {
        console.log('onBuyFormSubmit', formData);
        var that = this;
    }

    renderOverlay() {
        var { data, routeParams, viewport } = this.props;

        if (data && (data.err || (data.repricing && data.repricing.err))) {
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
            )
        }

        //ToDo: попапы по репрайсингу
        if (data && data.repricing) {
            switch (data.repricing.Type) {
                case 1:
                    break;
                case 2:
                    //Изменилась цена
                    return (
                        <WaitMsg
                            data={{title:'Изменилась цена', text:''}}
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
                case 3:
                    //Перелет недоступен
                    return (
                        <ErrorMsg
                            data={{title:'Перелет недоступен', text:'К сожалению, вариант перелета больше недоступен'}}
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
                case 4:
                    //Отель недоступен
                    return (
                        <ErrorMsg
                            data={{title:'Отель недоступен', text:'К сожалению, вариант проживания больше недоступен'}}
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
        }

        //OrderStatus == 0 - все норм
        //OrderStatus == 2 - перелет не доступен

        if (!data || data.isLoading) {
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

        const {
            //fields: {passengers, agree},
            handleSubmit,
            resetForm,
            submitting,
            citizenshipList
            } = this.props;

        var fields = {};
        var passengers = null;

        if (data) {
            fields.email = data.Email;
            fields.phone = data.Phone;

            //console.log('data.Passengers', data.Passengers);

            if (data.Passengers) {
                passengers = [];
                data.Passengers.forEach((pas, ix)=> {
                    var p = {
                        gender: pas.Sex,
                        lastName: pas.F,
                        name: pas.I,
                        birth: pas.Birthday ? pas.Birthday.split(' ')[0] : null,
                        citizenship: pas.CitizenName,
                        docNumber: pas.Number,
                        docExpires: pas.ExpirationDate ? pas.ExpirationDate.split(' ')[0] : null
                    };
                    passengers.push(p);
                })
            }
        }


        if (true || data) {
            return (
                <section className="b-buy-page">
                    {this.renderOverlay()}
                    <div className="b-buy-page__mobile-filter">
                        <MobileSelectedFilter disableFilterBtn={false}>
                            <div className="b-buy-page__head-filter__caption">
                                <div>Оплата пакета</div>
                            </div>
                        </MobileSelectedFilter>
                    </div>
                    <div className="b-buy-page__header">
                    </div>
                    <div className="b-buy-page__header-desc">
                    </div>
                    <div className="b-buy-page__variant">
                        <HotelDetailsPackage
                            title="Оформление и оплата"
                            price={price}
                            events={events} data={data}/>
                    </div>
                    <div className="b-buy-page__visa-alert">
                        <VisaAlert />
                    </div>
                    <div className="b-buy-page__tarifs-desc">
                        <TarifsDescription />
                    </div>
                    <div className="b-buy-page__customer">
                        <CustomerInfo fields={fields}/>
                    </div>
                    {
                        //<div className="b-buy-page__buy-request">
                        //    <BuyRequest onSendClick={this.onRequestSendClick.bind(this)}/>
                        //</div>
                    }
                    <div className="b-buy-page__passengers">
                        <Passengers passengers={passengers} citizenshipList={citizenshipList}/>
                    </div>
                    <div className="b-buy-page__comments">
                        <div className="b-buy-page-comments__head">
                            Пожелания к номеру
                        </div>
                        <div className="b-buy-page-comments__body">
                            <div className="b-buy-page-comments-text">
                                {
                                    viewport.isMobile ?
                                        <textarea readOnly={true} rows="1"
                                                  placeholder="Please write your requests in english">
                                        </textarea>
                                        :
                                        <textarea readOnly={true} rows="4">
                                        </textarea>
                                }
                            </div>
                            <div className="b-buy-page-comments-label">
                                <span className="b-buy-page-comments-label_one">Ваши пожелания мы передадим в отель, но не можем гарантировать их исполнение.</span>
                                <span className="b-buy-page-comments-label_two">Пожалуйста, пишите ваши пожелания на английском языке.</span>
                            </div>
                        </div>
                    </div>
                    <div className="b-buy-page__additional-services">
                        <div className="b-buy-page-additional-services__head">
                            Дополнительные услуги
                        </div>
                        <div className="b-buy-page-additional-services__lbl">
                            Данные услуги не включены в стоимость заказа, после оплаты заказа наш менеджер свяжется
                            c
                            Вами и предложит разные варианты.
                        </div>
                        <div className="b-buy-page-additional-services__body">
                            <div className="b-buy-page-additional-services-item"><Checkbox text="Виза"/>
                            </div>
                            <div className="b-buy-page-additional-services-item"><Checkbox text="Трансфер"/>
                            </div>
                        </div>
                    </div>
                    {
                        //<div className="b-buy-page__agreement">
                        //    <Checkbox align="top" {...agree}>
                        //        <div className="b-buy-page-agreement">
                        //            Я принимаю условия <a href="#">договора-оферты</a>, <a href="#">договора IATA</a>,
                        //            <a
                        //                href="#">ТКП</a>, <a href="#">тарифов</a>, и не возражаю против обработки моих
                        //            <br/>персональных
                        //            данных и передачи их третьим лицам (авиаперевозчику и пр.).
                        //        </div>
                        //    </Checkbox>
                        //    {agree.touched && agree.error && <div className="b-passenger-err-label">{agree.error}</div>}
                        //</div>
                    }
                    <div className="b-buy-page__buy-block">
                        <div className="b-buy-page-buy-block__lbl">
                            Сумма к оплате:
                        </div>
                        <div className="b-buy-page-buy-block__price">
                            <Price data={price}/>
                        </div>
                        <div className="b-buy-page-buy-block__button">
                            <BuyBtn text="Перейти к оплате" onSubmit={handleSubmit(this.onBuyFormSubmit.bind(this))}/>
                        </div>
                    </div>
                    <div className="b-buy-page__buy-block-mobile">
                        <PriceCard data={priceData} onSubmit={handleSubmit(this.onBuyFormSubmit.bind(this))}/>
                    </div>
                </section>
            );
        }

        return (
            <section className="b-buy-page">
                {this.renderOverlay()}
                <div className="b-buy-page__header">
                    loading data...
                </div>
            </section>
        )
    }

}

function mapStateToProps(state) {
    return {
        citizenshipList: state.countries,
        data: state.buyPage
    }
}

export default reduxForm({
    form: 'card',
    fields,
    validate
}, mapStateToProps)(BuyPage);


//export default BuyPage;
