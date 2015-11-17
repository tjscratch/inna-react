import React, { PropTypes, Component } from 'react';
import styles from './HotelDetailsMap.scss';
import withStyles from '../../decorators/withStyles';

import GoogleMap from 'google-map-react';
//import shouldPureComponentUpdate from 'react-pure-render/function';


@withStyles(styles) class HotelDetailsMap extends Component {
    constructor(props) {
        super(props);
    }

    //shouldComponentUpdate = shouldPureComponentUpdate;

    render() {
        var hotel = this.props.data;

        //console.log('hotel', hotel);

        if (hotel) {
            var center = {lat: hotel.Latitude, lng: hotel.Longitude};
            var zoom = 16;

            return (
                <div className="b-hotel-details-map">
                    <div className="b-hotel-details-map__title">{`${hotel.HotelCityName}, ${hotel.Address}`}</div>
                    <div className="b-hotel-details-map__description b-hotel-details-no-scroll">
                        <GoogleMap
                            center={center}
                            zoom={zoom}>
                            <img src={require('./pin-grey.png')} width="21" height="32"
                                 lat={hotel.Latitude} lng={hotel.Longitude} alt={hotel.HotelName}/>
                        </GoogleMap>
                    </div>
                </div>
            );
        }

        return null;
    }

}

export default HotelDetailsMap;
