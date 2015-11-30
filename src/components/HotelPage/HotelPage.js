import React, { PropTypes } from 'react';
import styles from './HotelPage.scss';
import withStyles from '../../decorators/withStyles';
import withViewport from '../../decorators/withViewport';

//api
import api from './../../core/ApiClient';
import apiUrls from './../../constants/ApiUrls.js';
import siteUrls from './../../constants/SiteUrls.js';

//helpers
import { getParamsForHotelDetails } from '../../helpers/apiParamsHelper';
import _ from 'lodash';

//controls
import { WaitMsg, ErrorMsg } from '../ui/PopupMessages';
import { MobileSelectedFilter } from '../MobileFilters';
import HotelStars from '../HotelStars';
import BreadCrumbs from '../BreadCrumbs';
import HotelDetailsMenu from './HotelDetailsMenu.js';
import HotelDetailsGallery from './HotelDetailsGallery.js';
import HotelDetailsDescription from './HotelDetailsDescription.js';
import HotelDetailsPackage from './HotelDetailsPackage.js';
import HotelDetailsRooms from './HotelDetailsRooms.js';
import HotelDetailsServices from './HotelDetailsServices.js';
import HotelDetailsMap from './HotelDetailsMap.js';
import HotelDetailsVotes from './HotelDetailsVotes.js';


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
            var params = getParamsForHotelDetails(this.props.routeParams);
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
            var params = getParamsForHotelDetails(this.props.routeParams);
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

    changeTicket() {
        console.log('changeTicket click');
    }

    ticketAbout() {
        console.log('ticketAbout click');
    }

    onRoomBuyClick(room) {
        //console.log('hotel onRoomBuyClick', room);
        
        var { routeParams } = this.props;
        var { data } = this.state;
        var { Hotel, AviaInfo } = this.state.data;

        //console.log('routeParams', routeParams);
        //console.log('hotel', Hotel);
        //console.log('data', data);

        var url = siteUrls.PackageReservation + [
                routeParams.fromId,
                routeParams.toId,
                routeParams.fromDate,
                routeParams.toDate,
                routeParams.flightClass,
                routeParams.adultCount,
                routeParams.childAges,
                routeParams.hotelId,
                routeParams.ticketId,
                routeParams.ticketBackId,
                routeParams.providerId
            ].join('-');

        var search = [
            `room=${room.RoomId}`,
            `hotel=${Hotel.HotelId}`,
            `ticket=${AviaInfo.VariantId1}`
        ].join('&');

        url = `${url}?${search}`;
        //console.log('url', url);

        window.location = url;
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
        var title = 'Инна-Тур - Отель';
        this.context.onSetTitle(title);

        //var data = this.props.data[0];
        var data = this.state.data;
        var ticket = data ? data.AviaInfo : null;
        var hotel = data ? data.Hotel : null;
        var photos = (hotel && hotel.Photos) ? hotel.Photos.MediumPhotos.map((img, ix)=> {
            return hotel.Photos.BaseUrl + img;
        }) : null;

        //console.log('data:', data);
        //console.log('hotel', hotel);

        var isMobile = this.props.viewport.isMobile;

        var events = {
            changeTicket: this.changeTicket.bind(this),
            ticketAbout: this.ticketAbout.bind(this)
        };

        if (hotel) {
            var packagePrice = hotel.PackagePrice;

            return (
                <section className="b-hotel-details">
                    {this.renderOverlay()}
                    <div className="b-hotel-details__mobile-filter">
                        <MobileSelectedFilter>
                            <div className="b-hotel-details__head-filter__caption">
                                <HotelStars data={hotel.Stars}/>
                            </div>
                            <div className="b-hotel-details__head-filter__description">
                                {hotel.HotelName}
                            </div>
                        </MobileSelectedFilter>
                    </div>
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

                    {
                        isMobile ?
                        <div>
                            <div className="b-hotel-details__gallery">
                                <HotelDetailsGallery data={photos}/>
                            </div>
                            <div className="b-hotel-details__menu">
                                <HotelDetailsMenu />
                            </div>
                        </div>
                        :
                        <div>
                            <div className="b-hotel-details__menu">
                                <HotelDetailsMenu />
                            </div>
                            <div className="b-hotel-details__gallery">
                                <HotelDetailsGallery data={photos}/>
                            </div>
                        </div>
                    }

                    {
                        !isMobile ?
                            <div id="hotel-details__description" className="b-hotel-details__description">
                                <HotelDetailsDescription data={hotel} />
                            </div> : null
                    }

                    {
                        !isMobile ?
                            <div className="b-hotel-details__package">
                                <HotelDetailsPackage
                                    title="Пакет с этим отелем"
                                    price={hotel.PackagePrice}
                                    events={events} data={data} />
                            </div> : null
                    }


                    <div id="hotel-details__rooms" className="b-hotel-details__rooms">
                        <HotelDetailsRooms onRoomBuyClick={(room)=>this.onRoomBuyClick(room)} data={data.Rooms} packagePrice={packagePrice} />
                    </div>

                    {
                        !isMobile ?
                            <div id="hotel-details__services" className="b-hotel-details__services">
                                <HotelDetailsServices data={hotel} />
                            </div> : null
                    }

                    {
                        !isMobile ?
                            <div id="hotel-details__services" className="b-hotel-details__services">
                                <HotelDetailsServices data={hotel} />
                            </div> : null
                    }

                    {
                        !isMobile ?
                            <div id="hotel-details__map" className="b-hotel-details__map">
                                <HotelDetailsMap data={hotel} />
                            </div> : null
                    }

                    {
                        !isMobile ?
                            <div id="hotel-details__votes" className="b-hotel-details__votes">
                                <HotelDetailsVotes data={hotel} />
                            </div> : null
                    }
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
