import React, {PropTypes} from 'react';

import {connect} from 'react-redux';
import {getNeedSmsValidation} from '../../actions/action_sms';

import styles from './NeedSmsValidation.scss';
import withStyles from '../../decorators/withStyles';
import withViewport from '../../decorators/withViewport';
import Overlay from '../ui/Overlay';
import Btn from '../ui/Btn';
import moment from 'moment';
moment.locale('ru');

import ButtonSecondary from '../ui/Buttons/ButtonSecondary/ButtonSecondary.js'

@withViewport
@withStyles(styles)
class NeedSmsValidation extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            timer: 60
        }
    }

    componentDidMount () {
        var { dispatch } = this.props;
        var self = this;
        // dispatch(getNeedSmsValidation({ Phone: '+79099593106' }))

        var timer = 60;
        var fight = setInterval(function () {
            if (timer > 0) {
                timer = timer - 1;
                //console.log(timer);
                self.setState({
                    timer: moment(timer, "ss").format("s")
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

    checkNeedSmsValidation (event) {
        var { dispatch } = this.props;
        console.log(333333)
        console.log(event)
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
        let smsError = false;
        let showGetNewCode = false;
        return (
            <Overlay className="NeedSmsValidation__overlay">
                <div className="NeedSmsValidation">
                    <div className="NeedSmsValidation__title">
                        Подтверждение заказа
                    </div>
                    <label for="sms_code" className="NeedSmsValidation__notice">
                        На ваш номер направлен СМС код, введите его в форму:
                    </label>
                    <div className="NeedSmsValidation__input-container">
                        <input id="sms_code" className="b-field-text" type="text" autocomplete="off"/>
                    </div>
                    {smsError ?
                        <div className="NeedSmsValidation__error">
                            введен неправильный код
                        </div>
                        :
                        null
                    }
                    <div className="NeedSmsValidation__timeout">
                        запросить код заново можно через
                        &nbsp;
                        {this.state.timer} секунд.
                    </div>
                    {showGetNewCode ?
                        <div className="NeedSmsValidation__new" ng-click="submitSms()">
                            запросить заново
                        </div>
                        :
                        null
                    }
                    <Btn small={true} onClick={this.checkNeedSmsValidation.bind(this)}>Отправить</Btn>
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
