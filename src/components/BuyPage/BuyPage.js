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
import { setBuySuccessData, setFrameData, setBuyPageIsLoading, getBuyPageData, getPaymentRepricing, initiatePayment } from '../../actions/action_buy';
import { getAllCountries } from '../../actions/action_directory';
//import { processField } from '../../actions/action_form';

import HotelDetailsPackage from '../HotelPage/HotelDetailsPackage';
import { getParamsForHotelDetails, getParamsForCheckAvailability, getParamsForMakeReservation } from '../../helpers/apiParamsHelper';
import { routeDateToJsDate } from '../../helpers/DateHelper';

import VisaAlert from '../VisaAlert';
import TarifsDescription from '../TarifsDescription';
import { CustomerInfo } from '../CustomerInfo';
import { WaitMsg, BuySuccessMsg, ErrorMsg } from '../ui/PopupMessages';
//import BuyRequest from './BuyRequest';
import { Passengers } from '../Passengers';
import Checkbox from '../ui/Checkbox';
import Price from '../Price';
import PriceCard from '../PriceCard';
import BuyBtn from '../../components/ui/Buttons/BuyBtn';
import { MobileSelectedFilter } from '../MobileFilters';

import PopupMessage from '../ui/PopupMessages/PopupMessage';

import CardForm from '../CardForm';

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
        ]).then(()=> {
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
                        this.getPaymentRepricing().then(()=> {
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
        //console.log('onBuyFormSubmit', formData);
        var that = this;

        var { routeParams, dispatch } = this.props;
        var { orderNum } = routeParams;

        var cardNum = formData.cardNum;
        if (!cardNum) {
            cardNum = formData.cardNum1 + formData.cardNum2 + formData.cardNum3 + formData.cardNum4;
        }

        var payData = {
            OrderNum: orderNum,
            CardNumber: cardNum,
            Cvc2: formData.cardCvv,
            CardHolder: formData.cardHolder,
            CardMonth: formData.cardMonth,
            CardYear: formData.cardYear
        };

        console.log('onBuyFormSubmit payData', payData);
        //return;

        /*
         Без 3DS
         5543 8633 0638 0225
         09/17
         svetlana nevskaya
         450

         C 3DS
         5124 4400 6759 0560
         08/17
         svetlana nevskaya
         205
         */

        dispatch(initiatePayment(payData)).then((action)=> {
            var { data, err } = action;
            if (data && data.Status == 1) {
                //ToDo: для теста
                if (location.href.indexOf("debug_status=1") > -1) {
                    data.PreauthStatus = 1;
                }
                else if (location.href.indexOf("debug_status=2") > -1) {
                    data.PreauthStatus = 2;
                }

                //успешно
                if (data.PreauthStatus == 1) {
                    //3dSecure
                    this.processPay3d(data.Data, data.InnaTermUrl);
                }
                else if (data.PreauthStatus == 2) {
                    //без 3dSecure
                    dispatch(setBuySuccessData(data.Type));
                }
                else {
                    //ошибка
                    console.log('initiatePayment error, data.PreauthStatus: ' + data.PreauthStatus);
                    this.setState({
                        error: true
                    });
                }
            }
            else {
                console.error('initiatePayment err', err);
                this.setState({
                    error: true
                });

            }
        });
    }

    processPay3d(data, innaTermUrl) {
        console.log('processPay3d', data, innaTermUrl);
        var { dispatch } = this.props;

        var params = '';
        var jData = JSON.parse(data);
        if (jData) {
            //console.log('jData: ' + angular.toJson(jData));
            //jData.TermUrl = app_main.apiHost + '/api/v1/Psb/PaymentRederect';

            if (innaTermUrl) {
                jData.TermUrl = location.protocol + '//' + location.hostname + innaTermUrl;
            }
            else {
                jData.TermUrl = location.protocol + '//' + location.hostname + '/api/v1/Psb/PaymentRederect';
            }

            //console.log('jData: ' + angular.toJson(jData));

            var keys = _.keys(jData);
            _.each(keys, function (key) {
                if (keys.indexOf(key) > 0) {
                    params += '&';
                }
                params += key + '=' + encodeURIComponent(jData[key]);
            });

            this.listenCloseEvent();
            dispatch(setFrameData({isOpen: true, frameUrl: '/buy/pay_form.html?' + params}));
            window.scrollTo(0, 0);
        }
    }

    listenCloseEvent() {
        var { dispatch } = this.props;
        var that = this;
        $('#buy-listener').on('inna.buy.close', function (event, data) {
            //console.log('triggered inna.buy.close, isOrderPaid:', $scope.isOrderPaid, data);
            console.log('handle inna.buy.close', data);

            if (data && data.result == 0) {//все ок
                dispatch(setBuySuccessData(data.type));
            }
            else {
                //ошибка оплаты

                that.setState({
                    error: true
                });
            }

            //закрываем попап оплаты
            dispatch(setFrameData({isOpen: false}));
        });
    }

    renderIframe() {
        var { data } = this.props;

        if (data && data.pay && data.pay.frameData && data.pay.frameData.frameUrl && data.pay.frameData.isOpen) {

            var frameUrl = data.pay.frameData.frameUrl;
            return (
                <PopupMessage {...this.props} className="b-pay-popup">
                    <iframe id="buy_frame_main" className="buy-frame" src={frameUrl}>
                    </iframe>
                </PopupMessage>
            )
        }

        return null;
    }

    renderSuccessBuyResultOverlay() {
        var { data } = this.props;

        if (data && data.buySuccess && data.buySuccess.resultType !== undefined) {
            var { resultType } = data.buySuccess;
            var email = data.Email;

            switch (resultType) {
                case 0://b2c
                {
                    return (
                        <BuySuccessMsg
                            data={{title:'Спасибо за покупку!', text:`В ближайшие 10 минут ожидайте на <b>${email}</b> письмо с подтверждением выполнения заказа и документами (билеты/ваучеры)`}}
                            close={()=>{
                                console.log('popup close');
                                Location.pushState(null, '/');
                            }}
                            cancel={()=>{
                                console.log('popup ok');
                                Location.pushState(null, '/');
                            }}
                            />
                    );
                }
                case 1://b2b
                {
                    //var tmId;
                    //function redirectToCabinet() {
                    //    if (tmId) {
                    //        cancelTimeout(tmId);
                    //    }
                    //
                    //    var b2bOrder = $scope.B2B_HOST_Order + $scope.orderId;
                    //    console.log('redirecting to: ' + b2bOrder);
                    //    window.location = b2bOrder;
                    //}
                    //
                    //tmId = setTimeout(()=> {
                    //    $scope.baloon.hide();
                    //    redirectToCabinet();
                    //}, 5000);

                    return (
                        <BuySuccessMsg
                            data={{title:'Спасибо за покупку!', text:'В ближайшие 10 минут ожидайте в личном кабинете изменение статуса заказа на Выполнен и </br>появления документов (билетов/ваучеров)'}}
                            close={()=>{
                                console.log('popup close');
                                Location.pushState(null, '/');
                            }}
                            cancel={()=>{
                                console.log('popup ok');
                                Location.pushState(null, '/');
                            }}
                            />
                    );
                }
                case 2://сервисный сбор
                {
                    return (
                        <BuySuccessMsg
                            data={{title:'Спасибо за покупку!', text:'Оплата счета успешна'}}
                            close={()=>{
                                console.log('popup close');
                                Location.pushState(null, '/');
                            }}
                            cancel={()=>{
                                console.log('popup ok');
                                Location.pushState(null, '/');
                            }}
                            />
                    );
                }
            }
        }

        return null;
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
            fields,
            handleSubmit,
            resetForm,
            submitting,
            citizenshipList
            } = this.props;

        //var fields = {};
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
                <section id="buy-listener" className="b-buy-page">
                    {
                        this.renderOverlay()
                    }
                    {
                        this.renderSuccessBuyResultOverlay()
                    }
                    {
                        this.renderIframe()
                    }
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
                    {
                        //<div className="b-buy-page__additional-services">
                        //    <div className="b-buy-page-additional-services__head">
                        //        Дополнительные услуги
                        //    </div>
                        //    <div className="b-buy-page-additional-services__lbl">
                        //        Данные услуги не включены в стоимость заказа, после оплаты заказа наш менеджер свяжется
                        //        c
                        //        Вами и предложит разные варианты.
                        //    </div>
                        //    <div className="b-buy-page-additional-services__body">
                        //        <div className="b-buy-page-additional-services-item"><Checkbox text="Виза"/>
                        //        </div>
                        //        <div className="b-buy-page-additional-services-item"><Checkbox text="Трансфер"/>
                        //        </div>
                        //    </div>
                        //</div>

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

                    <div className="b-buy-page__pay-block-line">
                    </div>

                    <div className="b-buy-page__pay-block">
                        <div className="b-pay-block__tickets-reserved icon-emb-ok">
                            Билеты забронированы, отель будет забронирован после оплаты
                        </div>
                        <div className="b-pay-block__pay-list">
                            <div className="b-pay-list-item">
                                <input checked="checked" id="pay_type_card" type="radio" name="card-pay"/>
                                <label htmlFor="pay_type_card">банковской картой</label>
                            </div>
                            <div className="b-pay-list-item">
                                <input id="pay_type_cache" type="radio" name="card-pay"/>
                                <label htmlFor="pay_type_cache">наличными в Связном или Евросети</label>
                            </div>
                            <div className="b-pay-list-item">
                                <input id="pay_type_qiwi" type="radio" name="card-pay"/>
                                <label htmlFor="pay_type_qiwi">через QIWI Visa Wallet</label>
                            </div>
                        </div>
                        <div className="b-pay-block__pay-expires">
                            Срок оплаты: <b>09 фев 2016, 17:57 (MSK)</b>
                        </div>
                        <div className="b-pay-block__pay-timer">
                            Осталось: <b>1 час: 9 мин: 51 сек</b>
                        </div>
                    </div>

                    <div className="b-buy-page__pay-block-card">
                        <CardForm {...this.props} />

                        <div className="b-pay-card-request">
                            Если Вы не успеваете оплатить до тайм-лимита или Вы хотите оплатить другим способом,&nbsp;
                            <a href="void(0);">просто отправьте нам сообщение.</a>&nbsp;
                            Менеджер свяжется с Вами и поможет оформить путешествие.
                        </div>
                    </div>

                    <div className="b-buy-page__pay-block-svyaznoy">
                    </div>

                    <div className="b-buy-page__buy-block">
                        <div className="b-buy-page-buy-block__lbl">
                            Сумма к оплате:
                        </div>
                        <div className="b-buy-page-buy-block__price">
                            <Price data={price}/>
                        </div>
                        <div className="b-buy-page-buy-block__button">
                            <BuyBtn text="Оплатить" onSubmit={handleSubmit(this.onBuyFormSubmit.bind(this))}/>
                        </div>
                    </div>
                    <div className="b-buy-page__buy-block-mobile">
                        <BuyBtn text="Оплатить" onSubmit={handleSubmit(this.onBuyFormSubmit.bind(this))}/>
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
