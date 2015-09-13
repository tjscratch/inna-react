import React, { PropTypes } from 'react';
import api from './../../core/ApiClient';
import styles from './OffersList.css';
import withStyles from '../../decorators/withStyles';

@withStyles(styles) class Offer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            offer: this.props.offer
        };
    }

    render() {
        if (this.state.offer) {
            return (
                <div className="b-offers-list">
                </div>
            );
        }
        else {
            return null;
        }
    }

}

export default Offer;
