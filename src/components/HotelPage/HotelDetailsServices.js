import React, { PropTypes } from 'react';
import styles from './HotelDetailsServices.scss';
import withStyles from '../../decorators/withStyles';

//helpers
import { routeDateToApiDate, apiDateToJsDate, dateToDDMMMM } from '../../core/DateHelper.js';
import { pluralize } from '../../core/CountHelper.js';

//controls

@withStyles(styles) class HotelDetailsServices extends React.Component {
    constructor(props) {
        super(props);
    }

    getAmenitiesList(hotel) {
        var amenitiesList = [];
        if (hotel && hotel.Amenities) {
            for (var key in hotel.Amenities) {
                var item = hotel.Amenities[key];

                var countPart = Math.ceil(item.List.length / 2);
                var listOrigin = [].concat(item.List);
                var listPart2 = [].concat(listOrigin.splice(countPart, listOrigin.length));
                var listPart1 = [].concat(listOrigin);

                amenitiesList.push({CategoryName: item.CategoryName, ListPart1: listPart1, ListPart2: listPart2 })
            }
            return amenitiesList;
        }
    }

    renderItem(item, ix) {
        return (
            <li key={ix} className="b-hotel-details-services-section-item">
                { item }
            </li>
        )
    }

    renderSection(item, ix) {
        return (
            <div key={ix} className="b-hotel-details-services-section">
                <div className="b-hotel-details-services-section__header">
                    { item.CategoryName }
                </div>
                <div className="b-hotel-details-services-section__list">
                    <ul className="b-hotel-details-services-section__list-part">
                        {
                            item.ListPart1.map(this.renderItem, this)
                        }
                    </ul>
                    <ul className="b-hotel-details-services-section__list-part">
                        {
                            item.ListPart2.map(this.renderItem, this)
                        }
                    </ul>
                </div>
            </div>
        )
    }

    render() {
        var hotel = this.props.data;
        console.log('hotel', hotel);

        var amenitiesList = this.getAmenitiesList(hotel);

        if (amenitiesList && amenitiesList.length > 0) {
            return (
                <div className="b-hotel-details-services">
                    <div className="b-hotel-details-services__title">Сервисы</div>
                    <div className="b-hotel-details-services__description">

                        {
                            amenitiesList.map(this.renderSection, this)
                        }


                    </div>
                </div>
            )
        }

        return null;
    }

}

export default HotelDetailsServices;
