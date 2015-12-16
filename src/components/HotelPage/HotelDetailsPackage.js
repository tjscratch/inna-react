import React, { PropTypes } from 'react';
import styles from './HotelDetailsPackage.scss';
import withStyles from '../../decorators/withStyles';

//helpers
import { routeDateToApiDate, apiDateToJsDate, dateToDDMMMM } from '../../helpers/DateHelper.js';
import { pluralize } from '../../helpers/CountHelper.js';

//controls
import Price from '../Price';
import HotelCard from '../HotelCard';
import TicketCard from '../TicketCard';

@withStyles(styles) class HotelDetailsPackage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var { data, events } = this.props;
        var ticket = data ? data.AviaInfo : null;
        var hotel = data ? data.Hotel : null;

        var checkInDate = hotel ? apiDateToJsDate(hotel.CheckIn) : null;
        var checkOutDate = hotel ? apiDateToJsDate(hotel.CheckOut) : null;

        if (data && ticket) {
            return (
                <div className="b-hotel-details-package">
                    <div className="b-hotel-details-package__title">{this.props.title}</div>
                    <div className="b-hotel-details-package__price">
                        Стоимость пакета, включая налоги и сборы:&nbsp;&nbsp;<Price data={this.props.price}/>
                    </div>
                    <div className="b-hotel-details-package__include">
                        В стоимость пакета включен перелет {ticket.CityFrom} – {ticket.CityTo} – {ticket.CityFrom},
                        проживание {hotel.HotelName} с {dateToDDMMMM(checkInDate)}
                        по {dateToDDMMMM(checkOutDate)} {checkOutDate.getFullYear()},
                        на {hotel.NightCount} {pluralize(hotel.NightCount, ['ночь', 'ночи', 'ночей'])},
                        медицинская страховка, топливный сбор. Стоимость окончательная со всеми налогами и сборами.
                    </div>
                    <div className="b-hotel-details-package__package">
                        <div className="b-hotel-details-bundle">
                            <div className="b-hotel-details-bundle__ticket">
                                <TicketCard events={events} data={ticket} allowActions={true} />
                            </div>
                            <div className="b-hotel-details-bundle__hotel">
                                <HotelCard data={hotel}  allowActions={true}/>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return null;
    }

}

export default HotelDetailsPackage;
