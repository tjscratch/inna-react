import React, {PropTypes, Component} from 'react';
import styles from './Reservation.scss';
import withStyles from '../../decorators/withStyles';

import HotelDetailsPackage from '../HotelPage/HotelDetailsPackage';
import {WaitMsg, ErrorMsg} from '../ui/PopupMessages';

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
        return Promise.all([
            this.getHotelData()
        ]);
    }

    getHotelData() {
        return new Promise((resolve, reject)=> {
            var {routeParams, routeQuery, dispatch} = this.props;
            var {room} = routeQuery;
            var params = getParamsForHotelDetails(routeParams, room);

            dispatch(getHotelDetails(params))
                .then((action)=> {
                    var {data, err} = action;
                    if (data) {
                        //console.info('HotelDetails success', data);
                    }
                    else {
                        console.error('HotelDetails error', err);
                    }
                    this.checkAvailability()
                        .then(()=> {
                            resolve();
                        })
                });
        });
    }

    checkAvailability() {
        return new Promise((resolve, reject)=> {
            var {routeParams, routeQuery, dispatch} = this.props;
            var {room} = routeQuery;
            var params = getParamsForCheckAvailability(routeParams, room);

            dispatch(checkAvailability(params))
                .then((action)=> {
                    var {data, err} = action;
                    if (data) {
                    }
                    else {
                        console.error('checkAvailability err', err);
                    }
                    resolve();
                });
        });
    }


    /**
     * Показывается когда идет загрузка данных и проверка доступности
     */
    renderLoading() {
        var {data, availableData} = this.props;
        if (data == null || availableData == null) {
            return (
                <WaitMsg
                    data={{title:'Собираем данные', text:'Это может занять какое-то время'}}
                />
            );
        }
    }

    render() {
        var {data} = this.props;
        var events = null;

        var price = data ? data.Price : 0;
        var priceData = data ? {price: data.Price} : null;


        return (
            <section className="Reservation">
                {this.renderLoading()}
                <HotelDetailsPackage
                    title="Оформление и оплата"
                    price={price}
                    events={events} data={data}/>
            </section>
        )
    }
}


function mapStateToProps(state) {
    return {
        data: state.reservation,
        availableData: state.reservation_is_available
    }
}

export default connect(
    mapStateToProps
)(Reservation)
