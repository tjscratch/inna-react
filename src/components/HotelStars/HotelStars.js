import React, { PropTypes, Component } from 'react';
import styles from './HotelStars.scss';
import withStyles from '../../decorators/withStyles';

@withStyles(styles) class HotelStars extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var stars = this.props.data;

        if (stars) {
            var starsList = [];
            for (let i = 0; i < stars; i++) {
                starsList.push(i);
            }

            return (
                <div className="b-hotel-star-block">
                    {starsList.map((item, ix)=>(<i key={ix} className="b-hotel-star icon-emb-star"></i>))}
                </div>
            )
        }

        return null;
    }

}

export default HotelStars;
