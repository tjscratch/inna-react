import React, {PropTypes, Component} from 'react';
import styles from './ReservationPackage.scss';
import withStyles from '../../decorators/withStyles';

import HotelDetailsPackage from '../HotelPage/HotelDetailsPackage';
import {WaitMsg, ErrorMsg} from '../ui/PopupMessages';

import {connect} from 'react-redux';
import {getHotelDetails, checkAvailability, makeReservation} from '../../actions/action_reservation';
import {getResevationPackageData, getResevationIsPackageAvailable} from '../../actions/action_reservation_package';
import {getParamsForHotelDetails, getParamsForCheckAvailability, getParamsForMakeReservation} from '../../helpers/apiParamsHelper';


@withStyles(styles)
class ReservationPackage extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    
    componentDidMount() {
        this.getData();
    }

    async getData(){
        var {routeParams, routeQuery, dispatch} = this.props;
        var {room} = routeQuery;
        var params = getParamsForHotelDetails(routeParams, room);
        var paramsAvia = getParamsForCheckAvailability(routeParams, room);
        
        await dispatch(getResevationPackageData(params));
        await dispatch(getResevationIsPackageAvailable(paramsAvia));
    }

    /**
     * Показывается когда идет загрузка данных и проверка доступности
     */
    renderLoading() {
        if (this.props.package_data == null || this.props.package_avialable == null) {
            return (
                <WaitMsg
                    data={{title:'Собираем данные', text:'Это может занять какое-то время'}}
                />
            );
        }
    }

    render() {
        var events = null;
        var {package_data} = this.props;
        var price = package_data ? package_data.Price : 0;

        return (
            <section className="ReservationPackage">
                {this.renderLoading()}
                <HotelDetailsPackage
                    title="Оформление и оплата"
                    price={price}
                    events={events} data={package_data}/>
            </section>
        )
    }
}


function mapStateToProps(state) {
    return {
        package_data: state.reservation_package_data,
        package_avialable: state.reservation_package_avialable
    }
}

export default connect(
    mapStateToProps
)(ReservationPackage)
