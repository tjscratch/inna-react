//компонент - шаблон, для сождания новых компонентов

import React, { PropTypes, Component } from 'react';
import styles from './ReservationPage.scss';
import withStyles from '../../decorators/withStyles';

//api
import api from './../../core/ApiClient';
import apiUrls from './../../constants/ApiUrls.js';
import siteUrls from './../../constants/SiteUrls.js';

import HotelDetailsPackage from '../HotelPage/HotelDetailsPackage';
import { getParamsForHotelDetails } from '../../helpers/apiParamsHelper';

import VisaAlert from '../VisaAlert';
import TarifsDescription from '../TarifsDescription';
import CustomerInfo from '../CustomerInfo';
import { WaitMsg, ErrorMsg } from '../ui/PopupMessages';
import BuyRequest from './BuyRequest';
import Passengers from './Passengers';
import Checkbox from '../ui/Checkbox';
import Price from '../Price';
import BuyBtn from '../../components/ui/Buttons/BuyBtn';

@withStyles(styles) class ReservationPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            data: null
        }
    }

    componentDidMount() {
        this.getData().then(()=> {
        });
    }

    getData() {
        return new Promise((resolve) => {
            //инфа по отелю
            this.getHotelData().then((data)=> {
                resolve();
            });
        });
    }

    getHotelData() {
        return new Promise((resolve, reject)=> {
            var { room } = this.props.routeQuery;
            var params = getParamsForHotelDetails(this.props.routeParams, room);
            //console.log('params', params);
            api.cachedGet(apiUrls.HotelDetails, params).then((data)=> {
            //api.get(apiUrls.HotelDetails, params).then((data)=> {
                //console.log('HotelDetails data', data);
                if (data) {
                    this.setState({
                        data: data
                    });
                    resolve(data);
                }
                else {
                    console.error('HotelDetails data is null');
                    this.setState({
                        error: true
                    });
                    reject();
                }
            });
        });
    }

    onRequestSendClick() {
        console.log('onRequestSendClick');
    }

    buyClick() {
        console.log('buyClick');
    }

    renderOverlay() {
        //var data = this.props.data[0];
        var data = this.state.data;

        if (this.state.error) {
            return (
                <WaitMsg
                    data={{title:'Произошла ошибка', text:'Пожалуйста позвоните нам'}}
                    close={()=>{
                                console.log('popup close');
                                window.location = '/';
                            }}
                    cancel={()=>{
                                console.log('popup cancel');
                                window.location = '/';
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
        var { data } = this.state;
        //console.log('data', data);
        var events = null;

        var { adultCount } = this.props.routeParams;
        var passengersList = [];
        for(let i=0; i<adultCount; i++) {
            passengersList.push(i);
        }

        if (data) {
            return (
                <section className="b-reservation-page">
                    {this.renderOverlay()}
                    <div className="b-reservation-page__header">
                    </div>
                    <div className="b-reservation-page__header-desc">
                    </div>
                    <div className="b-reservation-page__variant">
                        <HotelDetailsPackage
                            title="Оформление и оплата"
                            price={data ? data.Price : 0}
                            events={events} data={data}/>
                    </div>
                    <div className="b-reservation-page__visa-alert">
                        <VisaAlert />
                    </div>
                    <div className="b-reservation-page__tarifs-desc">
                        <TarifsDescription />
                    </div>
                    <div className="b-reservation-page__customer">
                        <CustomerInfo />
                    </div>
                    <div className="b-reservation-page__buy-request">
                        <BuyRequest onSendClick={this.onRequestSendClick.bind(this)} />
                    </div>
                    <div className="b-reservation-page__passengers">
                        <Passengers data={passengersList}/>
                    </div>
                    <div className="b-reservation-page__comments">
                        <div className="b-reservation-page-comments__head">
                            Пожелание к номеру
                        </div>
                        <div className="b-reservation-page-comments__body">
                            <div className="b-reservation-page-comments-text">
                                <textarea rows="4">
                                </textarea>
                            </div>
                            <div className="b-reservation-page-comments-label">
                                Ваши пожелания мы передадим в отель, но не можем гарантировать их исполнение. Пожалуйста, пишите ваши пожелания на английском языке.
                            </div>
                        </div>
                    </div>
                    <div className="b-reservation-page__additional-services">
                        <div className="b-reservation-page-additional-services__head">
                            Дополнительные услуги
                        </div>
                        <div className="b-reservation-page-additional-services__lbl">
                            Данные услуги не включены в стоимость заказа, после оплаты заказа наш менеджер свяжется c Вами и предложит разные варианты.
                        </div>
                        <div className="b-reservation-page-additional-services__body">
                            <div className="b-reservation-page-additional-services-item"><Checkbox text="Виза"/></div>
                            <div className="b-reservation-page-additional-services-item"><Checkbox text="Трансфер"/></div>
                        </div>
                    </div>
                    <div className="b-reservation-page__agreement">
                        <Checkbox>
                            <div className="b-reservation-page-agreement">
                                Я принимаю условия <a href="#">договора-оферты</a>, <a href="#">договора IATA</a>, <a href="#">ТКП</a>, <a href="#">тарифов</a>, и не возражаю против обработки моих <br/>персональных данных и передачи их третьим лицам (авиаперевозчику и пр.).
                            </div>
                        </Checkbox>
                    </div>
                    <div className="b-reservation-page__buy-block">
                        <div className="b-reservation-page-buy-block__lbl">
                            Сумма к оплате:
                        </div>
                        <div className="b-reservation-page-buy-block__price">
                            <Price data={46388}/>
                        </div>
                        <div className="b-reservation-page-buy-block__button">
                            <BuyBtn text="Перейти к оплате" onBuy={this.buyClick.bind(this)} />
                        </div>
                    </div>
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

export default ReservationPage;
