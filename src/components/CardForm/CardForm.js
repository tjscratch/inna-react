import React, { PropTypes, Component } from 'react';
import styles from './CardForm.scss';
import withStyles from '../../decorators/withStyles';
import withViewport from '../../decorators/withViewport';

@withViewport
@withStyles(styles) class CardForm extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="b-pay-card">
                <div className="b-pay-card__image">
                </div>
                <div className="b-pay-card__form">
                    <form>
                        <div className="b-pay-form-block">
                            <div className="b-pay-form__lbl">
                                Номер карты (16 цифр)
                            </div>
                            <div className="b-pay-form__num">
                                <input type="text" placeholder="0000"/>
                            </div>
                            <div className="b-pay-form__num">
                                <input type="text" placeholder="0000"/>
                            </div>
                            <div className="b-pay-form__num">
                                <input type="text" placeholder="0000"/>
                            </div>
                            <div className="b-pay-form__num">
                                <input type="text" placeholder="0000"/>
                            </div>
                        </div>

                        <div className="b-pay-form-block">
                            <div className="b-pay-form__lbl b-pay-form__lbl_valid">
                                Действительна до
                            </div>
                            <div className="b-pay-form__num">
                                <label className="b-pay-form-num-label">Месяц</label>
                                <input type="text" placeholder="01"/>
                            </div>
                            <div className="b-pay-form__num">
                                <label className="b-pay-form-num-label">Год</label>
                                <input type="text" placeholder="18"/>
                            </div>
                        </div>

                        <div className="b-pay-form-block">
                            <div className="b-pay-form__lbl">
                                Держатель карты
                            </div>
                            <div className="b-pay-form__num b-pay-form__num_name">
                                <input type="text" placeholder="IVAN IVANOV"/>
                            </div>
                        </div>

                        <div className="b-pay-form-block">
                            <div className="b-pay-form__lbl">
                                CVV / CVC
                            </div>
                            <div className="b-pay-form__num">
                                <input type="password"/>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="b-pay-card__secure">
                    <div className="b-pay-secure">
                        <div className="b-pay-secure__text">
                            Мы не храним ваши данные у себя, а сразу перенаправляем их в зашифрованном виде,<br/>
                            используя платежный шлюз Промсвязьбанка
                        </div>
                        <div className="b-pay-secure__logos">
                            <div className="b-pay-secure-logo b-pay-secure-logo_uniteller">
                                <img src={require('./cc-uniteller.png')}/>
                            </div>
                            <div className="b-pay-secure-logo b-pay-secure-logo_others">
                                <img src={require('./logos-uniteller.png')}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default CardForm;
