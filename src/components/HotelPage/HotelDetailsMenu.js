import React, { PropTypes } from 'react';
import styles from './HotelDetailsMenu.scss';
import withStyles from '../../decorators/withStyles';

@withStyles(styles) class HotelDetailsMenu extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="b-hotel-details-menu">
                <div className="b-hotel-details-menu-item">
                    <i className="b-hotel-details-menu-item-icon b-hotel-details-menu-item-icon_description"></i>
                    <span>Описание отеля</span>
                </div>
                <div className="b-hotel-details-menu-item">
                    <i className="b-hotel-details-menu-item-icon b-hotel-details-menu-item-icon_room"></i>
                    <span>Выбор номера</span>
                </div>
                <div className="b-hotel-details-menu-item">
                    <i className="b-hotel-details-menu-item-icon b-hotel-details-menu-item-icon_service"></i>
                    <span>Сервисы</span>
                </div>
                <div className="b-hotel-details-menu-item">
                    <i className="b-hotel-details-menu-item-icon b-hotel-details-menu-item-icon_map"></i>
                    <span>Отель на карте</span>
                </div>
                <div className="b-hotel-details-menu-item">
                    <i className="b-hotel-details-menu-item-icon b-hotel-details-menu-item-icon_votes"></i>
                    <span>Отзывы</span>
                </div>
            </div>
        );
    }

}

export default HotelDetailsMenu;
