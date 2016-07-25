import React, {PropTypes, Component} from 'react';
import styles from './Reservation.scss';
import withStyles from '../../decorators/withStyles';

import HotelDetailsPackage from '../HotelPage/HotelDetailsPackage';

import {connect} from 'react-redux';
import {getHotelDetails, checkAvailability, makeReservation} from '../../actions/action_reservation';
import {getParamsForHotelDetails, getParamsForCheckAvailability, getParamsForMakeReservation} from '../../helpers/apiParamsHelper';


@withStyles(styles)
class Reservation extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        this.getHotelData()
    }

    getHotelData() {
        return new Promise((resolve, reject)=> {
            var {routeParams, routeQuery, dispatch} = this.props;
            var {room} = routeQuery;

            var params = getParamsForHotelDetails(routeParams, room);//roomId

            dispatch(getHotelDetails(params))
                .then((action)=> {
                    var {data, err} = action;
                    if (data) {
                    }
                    else {
                        console.error('HotelDetails err', err);
                        this.setState({
                            error: true
                        });
                    }
                    //resolve();
                    this.checkAvailability().then(()=> {
                        resolve();
                    })
                });
        });
    }

    checkAvailability() {
        return new Promise((resolve, reject)=> {
            var {routeParams, routeQuery, dispatch} = this.props;
            var {room} = routeQuery;

            var params = getParamsForCheckAvailability(routeParams, room);//roomId

            dispatch(checkAvailability(params))
                .then((action)=> {
                    var {data, err} = action;
                    if (data) {
                    }
                    else {
                        console.error('checkAvailability err', err);
                        this.setState({
                            checkAvailabilityError: true
                        });
                    }
                    resolve();
                });
        });
    }


    render() {
        var {data, routeParams, viewport} = this.props;
        var events = null;

        var price = data ? data.Price : 0;
        var priceData = data ? {price: data.Price} : null;

        console.log(data);

        return (
            <section className="Reservation">
                {/*
                <HotelDetailsPackage
                    title="Оформление и оплата"
                    price={price}
                    events={events} data={data}/>
                 */}
            </section>
        )
    }

}


function mapStateToProps(state) {
    console.log(state);
    return {
        data: state.reservation,
        availableData: state.reservation_is_available
    }
}

export default connect(
    mapStateToProps
)(Reservation)
