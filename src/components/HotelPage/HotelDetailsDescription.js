import React, { PropTypes } from 'react';
import styles from './HotelDetailsDescription.scss';
import withStyles from '../../decorators/withStyles';

//helpers
import { routeDateToApiDate, apiDateToJsDate, dateToDDMMMM } from '../../core/DateHelper.js';
import { pluralize } from '../../core/CountHelper.js';

//controls

@withStyles(styles) class HotelDetailsDescription extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            expanded: false
        }
    }

    toggleExpand() {
        this.setState({
            expanded: !this.state.expanded
        });
    }

    render() {
        var hotel = this.props.data;

        if (hotel.Description) {
            return (
                <div className="b-hotel-details-description">
                    <div className="b-hotel-details-description__title">Описание отеля</div>
                    <div className={`b-hotel-details-description-wrap ${this.state.expanded ? 'b-hotel-details-description-wrap_expanded' : ''}`}>
                        {hotel.Description.map((item, ix)=> {
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
                    <div className="b-hotel-details-description-toggle"
                         onClick={this.toggleExpand.bind(this)}>
                        {this.state.expanded ? 'Свернуть' : 'Развернуть'}
                    </div>
                </div>
            )
        }

        return null;
    }

}

export default HotelDetailsDescription;
