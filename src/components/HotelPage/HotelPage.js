import React, { PropTypes } from 'react';
import styles from './HotelPage.scss';
import withStyles from '../../decorators/withStyles';
import withViewport from '../../decorators/withViewport';
import Location from '../../core/Location';

//api
import api from './../../core/ApiClient';
import apiUrls from './../../constants/ApiUrls.js';
import siteUrls from './../../constants/SiteUrls.js';

import { connect } from 'react-redux';
import { getHotelDetails, getHotelRooms } from '../../actions/action_hotel_details';

//helpers
import { getParamsForHotelDetails } from '../../helpers/apiParamsHelper';
import { getPackagesSearchUrl } from '../../helpers/urlParamsHelper';
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
            error: null
        }
    }

    componentDidMount() {
        this.getData().then(()=> {
        });
    }

    getData() {
        return new Promise((resolve) => {
            //инфа по отелю
            this.getHotelData().then(()=> {
                resolve();

                //инфа по комнатам
                this.getRoomsData();
            });
        });
    }

    getHotelData() {
        var { dispatch, routeParams } = this.props;

        return new Promise((resolve, reject)=> {
            var params = getParamsForHotelDetails(routeParams);

            dispatch(getHotelDetails(params))
                .then((action)=> {
                    var { data } = action;
                    if (data) {
                        resolve();
                    }
                    else {
                        console.error('HotelDetails data is null');
                        this.setState({
                            error: true
                        });
                        reject();
                    }
                })
        });
    }

    getRoomsData() {
        var { dispatch, routeParams } = this.props;

        return new Promise((resolve, reject)=> {
            var params = getParamsForHotelDetails(routeParams);
            params.Rooms = true;

            dispatch(getHotelRooms(params))
                .then((action)=> {
                    var { data } = action;
                    if (data){
                        resolve();
                    }
                    else {
                        console.error('HotelRooms data is null');
                        this.setState({
                            error: true
                        });
                        reject();
                    }
                })
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

        var { data, routeParams } = this.props;
        if (data) {
            var { Hotel, AviaInfo } = data;

            var url = siteUrls.Reservation + [
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

            //window.location = url;
            Location.pushState(null, url);
        }
    }

    renderOverlay() {
        var { data } = this.props;

        if (this.state.error) {
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
        var title = 'Инна-Тур - Отель';
        this.context.onSetTitle(title);

        var { data, viewport } = this.props;
        var ticket = data ? data.AviaInfo : null;
        var hotel = data ? data.Hotel : null;
        var photos = (hotel && hotel.Photos) ? hotel.Photos.MediumPhotos.map((img, ix)=> {
            return hotel.Photos.BaseUrl + img;
        }) : null;

        //console.log('data:', data);
        //console.log('hotel', hotel);

        var isMobile = viewport.isMobile;

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
                            {link: getPackagesSearchUrl(this.props.routeParams), text: 'Результаты поиска'},
                            {text: 'Описание отеля и выбор номера'}
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
                                <HotelDetailsDescription data={hotel}/>
                            </div> : null
                    }

                    {
                        !isMobile ?
                            <div className="b-hotel-details__package">
                                <HotelDetailsPackage
                                    title="Пакет с этим отелем"
                                    price={hotel.PackagePrice}
                                    events={events} data={data}/>
                            </div> : null
                    }


                    <div id="hotel-details__rooms" className="b-hotel-details__rooms">
                        <HotelDetailsRooms onRoomBuyClick={(room)=>this.onRoomBuyClick(room)} data={data.Rooms}
                                           packagePrice={packagePrice}/>
                    </div>

                    {
                        !isMobile ?
                            <div id="hotel-details__services" className="b-hotel-details__services">
                                <HotelDetailsServices data={hotel}/>
                            </div> : null
                    }

                    {
                        !isMobile ?
                            <div id="hotel-details__services" className="b-hotel-details__services">
                                <HotelDetailsServices data={hotel}/>
                            </div> : null
                    }

                    {
                        !isMobile ?
                            <div id="hotel-details__map" className="b-hotel-details__map">
                                <HotelDetailsMap data={hotel}/>
                            </div> : null
                    }

                    {
                        !isMobile ?
                            <div id="hotel-details__votes" className="b-hotel-details__votes">
                                <HotelDetailsVotes data={hotel}/>
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

//export default HotelPage;

function mapStateToProps(state) {
    return {
        data: state.hotelDetails
    }
}

export default connect(
    mapStateToProps
)(HotelPage)
