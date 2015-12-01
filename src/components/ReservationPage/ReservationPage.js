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

    render() {
        var { data } = this.state;
        //console.log('data', data);
        var events = null;

        if (data) {
            return (
                <section className="b-reservation-page">
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
                    </div>
                    <div className="b-reservation-page__passengers">
                    </div>
                    <div className="b-reservation-page__comments">
                    </div>
                    <div className="b-reservation-page__additional-services">
                    </div>
                    <div className="b-reservation-page__agreement">
                    </div>
                    <div className="b-reservation-page__buy-block">
                    </div>
                </section>
            );
        }

        return (
            <section className="b-reservation-page">
                <div className="b-reservation-page__header">
                    loading data...
                </div>
            </section>
        )
    }

}

export default ReservationPage;
