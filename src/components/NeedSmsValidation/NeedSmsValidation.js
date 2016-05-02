import React, {PropTypes} from 'react';

import {connect} from 'react-redux';
import {getNeedSmsValidation, checkNeedSmsValidation} from '../../actions/action_sms';

import styles from './NeedSmsValidation.scss';
import withStyles from '../../decorators/withStyles';
import withViewport from '../../decorators/withViewport';
import Overlay from '../ui/Overlay';
import Btn from '../ui/Btn';
import moment from 'moment';
moment.locale('ru');

import apiClient from '../../core/ApiClient';
import apiUrls from '../../constants/ApiUrls';

import ButtonSecondary from '../ui/Buttons/ButtonSecondary/ButtonSecondary.js'

@withViewport
@withStyles(styles)
class NeedSmsValidation extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            timer: 60,
            error: false,
            code: null
        }
    }

    componentDidMount () {
        var { dispatch } = this.props;
        dispatch(getNeedSmsValidation({ Phone: this.props.phone }));
        this.startTimer(60);
    }

    startTimer (timer) {
        var self = this;
        var timer = timer;
        var fight = setInterval(function () {
            if (timer > 0) {
                timer = timer - 1;
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
            stopFight();
        }, 60000);
    }


    onNeedSmsValidation (event) {
        var { dispatch } = this.props;
        dispatch(checkNeedSmsValidation({ Phone: this.props.phone, Code: this.state.code }))
            .then((action)=> {
                console.log('onNeedSmsValidation')
                console.log(action)
                if (action.data.checkSms != 0) {
                    this.props.smsValid();
                    this.setState({
                        error: false
                    });
                } else {
                    this.setState({
                        error: true
                    });
                }
            })
            .catch((err, data)=> {
                this.setState({
                    error: true
                });
            })
    }

    getNeedSmsValidation (event) {
        var { dispatch } = this.props;
        this.setState({
            timer: 60
        });
        this.startTimer(60);
        dispatch(getNeedSmsValidation({ Phone: this.props.phone }));
    }

    handleTextChange (e) {
        this.setState({
            code: e.target.value
        });
    }

    renderCounter () {
        let showGetNewCode = this.state.timer > 0 ? false : true;
        if (showGetNewCode) {
            return (
                <div className="NeedSmsValidation__text">
                    <div className="NeedSmsValidation__new"
                         onClick={this.getNeedSmsValidation.bind(this)}>
                        Запросить заново
                    </div>
                </div>
            )
        } else {
            return (
                <div className="NeedSmsValidation__text">
                    Запросить код заново можно через
                    &nbsp;
                    {this.state.timer} сек.
                </div>
            )
        }
    }

    render () {
        var smsError = this.state.error ? true : false
        var smsErrorClass = this.state.error ? 'NeedSmsValidation__input-container-error' : ''
        return (
            <Overlay className="NeedSmsValidation__overlay">
                <div className="NeedSmsValidation">
                    <div className="NeedSmsValidation__title">
                        Подтверждение заказа
                    </div>
                    <label for="sms_code" className="NeedSmsValidation__notice">
                        На ваш номер направлен СМС код, введите его в форму:
                    </label>
                    <div className={`NeedSmsValidation__input-container ${smsErrorClass}`}>
                        <input id="sms_code"
                               className="NeedSmsValidation__input"
                               type="text"
                               value={this.state.code}
                               onChange={this.handleTextChange.bind(this)}
                        />
                    </div>
                    {smsError ?
                        <div className="NeedSmsValidation__error">
                            Введен неправильный код
                        </div>
                        :
                        null
                    }
                    {this.renderCounter()}
                    <Btn small={true}
                         onClick={this.onNeedSmsValidation.bind(this)}>
                        Отправить
                    </Btn>
                </div>
            </Overlay>
        )
    }
}

function mapStateToProps (state) {
    return {
        getSms: state.needSms.getSms,
        checkSms: state.needSms.checkSms
    }
}

export default connect(mapStateToProps)(NeedSmsValidation)
