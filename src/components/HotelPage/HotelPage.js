import React, { PropTypes } from 'react';
import styles from './HotelPage.scss';
import withStyles from '../../decorators/withStyles';
import withViewport from '../../decorators/withViewport';

//api
import api from './../../core/ApiClient';
import apiUrls from './../../constants/ApiUrls.js';
import siteUrls from './../../constants/SiteUrls.js';

//helpers
import { routeDateToApiDate } from '../../core/DateHelper.js'
import _ from 'lodash';

//controls
import { WaitMsg, ErrorMsg } from '../ui/PopupMessages';
import BreadCrumbs from '../BreadCrumbs';
import HotelDetailsMenu from './HotelDetailsMenu.js';
import HotelDetailsGallery from './HotelDetailsGallery.js';

@withViewport
@withStyles(styles) class HotelPage extends React.Component {
    static contextTypes = {
        onSetTitle: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            error: null,
            data: null,
            hotel: null
        }
    }

    componentDidMount() {
        this.getData().then(()=> {
        });
    }

    getParams() {
        var routeParams = this.props.routeParams;
        var filter = {
            'Filter[DepartureId]': routeParams.fromId,
            'Filter[ArrivalId]': routeParams.toId,
            'Filter[StartVoyageDate]': routeDateToApiDate(routeParams.fromDate),
            'Filter[EndVoyageDate]': routeDateToApiDate(routeParams.toDate),
            'Filter[TicketClass]': routeParams.flightClass,
            'Filter[Adult]': routeParams.adultCount,
            'Filter[Children]': routeParams.childAges
        };
        if (routeParams.childAges) {
            filter['Filter[ChildrenAges]'] = routeParams.childAges.split('_');
        }

        var params = {
            HotelId: routeParams.HotelId,
            HotelProviderId: routeParams.ProviderId,
            TicketToId: routeParams.TicketId,
            TicketBackId: routeParams.TicketBackId,
            //Rooms: true,
            ...filter
        };
        //console.log('params', params);
        return params;
    }

    getData() {
        return new Promise((resolve) => {
            //инфа по отелю
            this.getHotelData().then((data)=> {
                resolve();

                //инфа по комнатам
                this.getRoomsData();
            });
        });
    }

    getHotelData() {
        return new Promise((resolve, reject)=> {
            var params = this.getParams();
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

    getRoomsData() {
        return new Promise((resolve, reject)=> {
            var params = this.getParams();
            params.Rooms = true;

            api.cachedGet(apiUrls.HotelDetails, params).then((data)=> {
            //api.get(apiUrls.HotelDetails, params).then((data)=> {
                //console.log('HotelDetails data', data);
                if (data) {
                    var mergedData = _.merge(this.state.data, data);
                    this.setState({
                        data: mergedData
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

    renderDescription(hotel) {
        if (hotel.Description) {
            return (
                <div>
                    {hotel.Description.map((item, ix)=> {
                        return (
                            <div key={ix} dangerouslySetInnerHTML={{__html: item.Content}}></div>
                        )
                    })}
                    <p>
                        <b>Подробные сведения</b><br/><br/>
                        <b>Время прибытия:</b>&nbsp;{hotel.CheckInTime}
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <b>Выезд:</b>&nbsp;{hotel.CheckOutTime}
                    </p>
                </div>
            )
        }

        return null;
    }

    render() {
        var title = 'Инна-Тур - Отель';
        this.context.onSetTitle(title);

        //var data = this.props.data[0];
        var data = this.state.data;
        var hotel = data ? data.Hotel : null;
        var photos = (hotel && hotel.Photos) ? hotel.Photos.MediumPhotos.map((img, ix)=> {
            return hotel.Photos.BaseUrl + img;
        }) : null;

        //console.log('data:', data);
        //console.log('hotel', hotel);

        if (hotel) {
            return (
                <section className="b-hotel-details">
                    {this.renderOverlay()}
                    <div className="b-hotel-details__crumbs">
                        <BreadCrumbs data={[
                    {link: '/', text: 'Главная'},
                    {link: '/packages/search/2767-6623-01.12.2015-08.12.2015-0-1-', text: 'Результаты поиска'},
                    {text: 'Описание отеля и выбор номера'},
                    ]}/>
                    </div>
                    <div className="b-hotel-details__title">
                        {hotel.HotelName}
                    </div>
                    <div className="b-hotel-details__menu">
                        <HotelDetailsMenu />
                    </div>
                    <div className="b-hotel-details__gallery">
                        <HotelDetailsGallery data={photos}/>
                    </div>
                    <div className="b-hotel-details__description">
                        <div className="b-hotel-details-description__title">Описание отеля</div>
                        {this.renderDescription(hotel)}
                    </div>
                    <div className="b-hotel-details__package">
                    </div>
                    <div className="b-hotel-details__rooms">
                    </div>
                    <div className="b-hotel-details__services">
                    </div>
                    <div className="b-hotel-details__map">
                    </div>
                    <div className="b-hotel-details__votes">
                    </div>
                </section>
            );
        }
        else {
            return (
                <section className="b-hotel-details">
                    {this.renderOverlay()}
                </section>
            );
        }
    }
}

export default HotelPage;
