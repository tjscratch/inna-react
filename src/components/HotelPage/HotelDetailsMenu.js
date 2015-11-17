import React, { PropTypes } from 'react';
import styles from './HotelDetailsMenu.scss';
import withStyles from '../../decorators/withStyles';

import {setHash} from '../../core/LocationHelper.js';

@withStyles(styles) class HotelDetailsMenu extends React.Component {
    constructor(props) {
        super(props);
    }

    scrollToElement(e) {
        var id = e.currentTarget.getAttribute('data-scroll-to');
        var el = document.getElementById(id);
        var scrollTo = el.offsetTop;
        window.scrollTo(0, scrollTo);
        //console.log('scrollTo', id, scrollTo);

        //setHash(id);
    }

    render() {
        return (
            <div className="b-hotel-details-menu">
                <div onClick={this.scrollToElement.bind(this)} data-scroll-to="hotel-details__description"
                    className="b-hotel-details-menu-item">
                    <i className="b-hotel-details-menu-item-icon b-hotel-details-menu-item-icon_description"></i>
                    <span>Описание отеля</span>
                </div>
                <div onClick={this.scrollToElement.bind(this)} data-scroll-to="hotel-details__rooms"
                    className="b-hotel-details-menu-item">
                    <i className="b-hotel-details-menu-item-icon b-hotel-details-menu-item-icon_room"></i>
                    <span>Выбор номера</span>
                </div>
                <div onClick={this.scrollToElement.bind(this)} data-scroll-to="hotel-details__services"
                    className="b-hotel-details-menu-item">
                    <i className="b-hotel-details-menu-item-icon b-hotel-details-menu-item-icon_service"></i>
                    <span>Сервисы</span>
                </div>
                <div onClick={this.scrollToElement.bind(this)} data-scroll-to="hotel-details__map"
                    className="b-hotel-details-menu-item">
                    <i className="b-hotel-details-menu-item-icon b-hotel-details-menu-item-icon_map"></i>
                    <span>Отель на карте</span>
                </div>
                <div onClick={this.scrollToElement.bind(this)} data-scroll-to="hotel-details__votes"
                    className="b-hotel-details-menu-item">
                    <i className="b-hotel-details-menu-item-icon b-hotel-details-menu-item-icon_votes"></i>
                    <span>Отзывы</span>
                </div>
            </div>
        );
    }

}

export default HotelDetailsMenu;
