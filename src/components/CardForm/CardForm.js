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
        const {
            fields: { cardNum1, cardNum2, cardNum3, cardNum4, cardMonth, cardYear, cardHolder, cardCvv },
            } = this.props;

        return (
            <div className="b-pay-card">
                <div className="b-pay-card__image">
                    <img className="b-pay-card-image b-pay-card-image_card" src={require('./cc.png')}/>
                    <img className="b-pay-card-image b-pay-card-image_uniteller" src={require('./cc-uniteller.png')}/>
                </div>
                <div className="b-pay-card__form">
                    <form>
                        <div className="b-pay-form-block">
                            <div className="b-pay-form__lbl">
                                Номер карты (16 цифр)
                            </div>
                            <div className="b-pay-form__num">
                                <input {...cardNum1} type="text" maxLength="4" placeholder="0000"/>
                            </div>
                            <div className="b-pay-form__num">
                                <input {...cardNum2} type="text" maxLength="4" placeholder="0000"/>
                            </div>
                            <div className="b-pay-form__num">
                                <input {...cardNum3} type="text" maxLength="4" placeholder="0000"/>
                            </div>
                            <div className="b-pay-form__num">
                                <input {...cardNum4} type="text" maxLength="4" placeholder="0000"/>
                            </div>
                        </div>

                        <div className="b-pay-form-block">
                            <div className="b-pay-form__lbl b-pay-form__lbl_valid">
                                Действительна до
                            </div>
                            <div className="b-pay-form__num">
                                <label className="b-pay-form-num-label">Месяц</label>
                                <input {...cardMonth} type="text" placeholder="00"/>
                            </div>
                            <div className="b-pay-form__num">
                                <label className="b-pay-form-num-label">Год</label>
                                <input {...cardYear} type="text" placeholder="00"/>
                            </div>
                        </div>

                        <div className="b-pay-form-block">
                            <div className="b-pay-form__lbl">
                                Держатель карты
                            </div>
                            <div className="b-pay-form__num b-pay-form__num_name">
                                <input {...cardHolder} type="text" placeholder="IVAN IVANOV"/>
                            </div>
                        </div>

                        <div className="b-pay-form-block">
                            <div className="b-pay-form__lbl">
                                CVV / CVC
                            </div>
                            <div className="b-pay-form__num">
                                <input {...cardCvv} type="password"/>
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
