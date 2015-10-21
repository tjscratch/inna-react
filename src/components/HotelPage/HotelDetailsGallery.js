import React, { PropTypes } from 'react';
import styles from './HotelDetailsGallery.scss';
import withStyles from '../../decorators/withStyles';

@withStyles(styles) class HotelDetailsGallery extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var data = this.props.data;

        if (data) {
            return (
                <div className="b-hotel-details-gallery">
                    <div className="b-gallery-wrap">
                        <div className="b-gallery-img-list">
                            {data.map((img, ix)=> {
                                return (
                                    <img className="b-gallery-img" src={img}/>
                                )
                            })}
                        </div>
                    </div>
                    <div className="b-gallery-disclaimer">
                        Фотографии предоставлены отелем. Компания ИННА ТУР не несет ответвенности за достоверность
                        предоставленной информации.
                    </div>
                </div>
            );
        }

        return null;
    }

}

export default HotelDetailsGallery;
