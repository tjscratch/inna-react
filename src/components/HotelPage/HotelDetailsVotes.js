import React, { PropTypes, Component } from 'react';
import styles from './HotelDetailsVotes.scss';
import withStyles from '../../decorators/withStyles';
import config from '../../config.js';


@withStyles(styles) class HotelDetailsVotes extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var hotel = this.props.data;

        //console.log('hotel', hotel);

        if (hotel.TaFactor) {
            var frameUrl = '';
            if (hotel.ProviderId == 4) {
                frameUrl = config.tripadvisorEx + hotel.HotelId;
            } else if (hotel.ProviderId == 2) {
                frameUrl = config.tripadvisorOk + hotel.HotelId;
            }

            if (frameUrl) {
                return (
                    <div className="b-hotel-details-votes">
                        <div className="b-hotel-details-votes__title"></div>
                        <div className="b-hotel-details-votes__description">
                            <iframe className="b-hotel-details-iframe"
                                    src={frameUrl}
                                    name="tripadvisor" height="500" width="100%" frameborder="0"></iframe>
                        </div>
                    </div>
                );
            }
        }

        return null;
    }

}

export default HotelDetailsVotes;
