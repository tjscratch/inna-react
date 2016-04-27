import React, {PropTypes} from 'react';

import {connect} from 'react-redux';
import {getNeedSmsValidation} from '../../actions/action_sms';

import styles from './NeedSmsValidation.scss';
import withStyles from '../../decorators/withStyles';
import withViewport from '../../decorators/withViewport';
import Overlay from '../ui/Overlay';
import moment from 'moment';
moment.locale('ru');

import ButtonSecondary from '../ui/Buttons/ButtonSecondary/ButtonSecondary.js'

@withViewport
@withStyles(styles)
class NeedSmsValidation extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            timer: null
        }
    }

    componentDidMount () {
        var { dispatch } = this.props;
        var self = this;
        // dispatch(getNeedSmsValidation({ Phone: '+79099593106' }))

        var timer = 60000;
        var fight = setInterval(function () {
            if (timer > 0) {
                timer = timer - 1000;
                console.log(timer);
                self.setState({
                    timer: moment(timer, "ss").format("ss")
                });
            } else {
                stopFight();
            }
        }, 1000);
        fight;
        var stopFight = function () {
            clearInterval(fight);
        };

        setTimeout(function () {
            clearInterval(fight);
        }, 60000);
    }

    checkNeedSmsValidation () {
        var { dispatch } = this.props;
        // dispatch(getNeedSmsValidation({ Phone: '+79099593106' }))

        // apiClient.post(apiUrls.getSmsCode, '{"Phone":"89099593106"}')
        //     .then((data) => {
        //         console.log(data)
        //     })
        // apiClient.post(apiUrls.checkSmsCode, { Phone: '+79099593106' })
        //     .then((data) => {
        //         console.log(data)
        //     })
    }

    render () {
        return (
            <Overlay>
                <div className="NeedSmsValidation">
                    <div className="checkSms">
                        <div className="checkSms__title">
                            Подтверждение заказа
                        </div>
                        <label for="sms_code" className="checkSms__notice">
                            На ваш номер направлен СМС код, введите его в форму:
                        </label>
                        <div className="checkSms__input-container">
                            <input id="sms_code" className="b-field-text" type="number" autocomplete="off"/>
                        </div>
                        <div className="checkSms__error">
                            введен неправильный код
                        </div>
                        <div className="checkSms__timeout">
                            запросить код заново можно через
                            {this.state.timer}
                        </div>
                        <div className="checkSms__timeout">
					<span className="checkSms__new" ng-click="submitSms()">
						запросить заново
					</span>
                        </div>
                        <span className="button" ng-click="submitSmsCode($event, sms_code)">Отправить</span>
                    </div>
                    <ButtonSecondary onClick={this.checkNeedSmsValidation.bind(this)}>Подтверждение по смс</ButtonSecondary>
                </div>
            </Overlay>
        )
    }
}

// function mapStateToProps (state) {
//     return {
//         data: state.hotelDetails
//     }
// }

export default connect()(NeedSmsValidation)
