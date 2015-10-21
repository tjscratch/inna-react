import React, { PropTypes } from 'react';
import styles from './HotelPage.scss';
import withStyles from '../../decorators/withStyles';
import withViewport from '../../decorators/withViewport';

//api
import api from './../../core/ApiClient';
import apiUrls from './../../constants/ApiUrls.js';
import siteUrls from './../../constants/SiteUrls.js';

//helpers

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

        //данные для страницы приходят из роутера
        //var data = null;
        //if (props.data && props.data.length > 0) {
        //    data = props.data[0];
        //}
        //
        //if (data) {
        //    this.state = {
        //        data: data,
        //        hotel: data.Hotel,
        //        ticket: data.AviaInfo,
        //        error: null
        //    };
        //}
        //else {
        //    this.state = {
        //        data: null,
        //        hotel: null,
        //        ticket: null,
        //        error: null
        //    };
        //}
        //
        //console.log('hotel page, state:', this.state);

        this.state = {
            error: null
        }
    }

    renderOverlay() {
        var data = this.props.data[0];

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

        var data = this.props.data[0];
        console.log('data:', data);
        var hotel = data.Hotel;
        console.log('hotel', hotel);
        var photos = hotel.Photos ? hotel.Photos.MediumPhotos.map((img, ix)=>{
            return hotel.Photos.BaseUrl + img;
        }) : null;

        if (data) {
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
                        <HotelDetailsGallery data={photos} />
                    </div>
                    <div className="b-hotel-details__description">
                        <div className="b-hotel-details-description__title">Описание отеля</div>
                        <div>
                            {hotel.Description.map((item, ix)=>{
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

        return null;
    }
}

export default HotelPage;
