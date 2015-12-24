import React, { PropTypes, Component } from 'react';
import styles from './CustomerInfo.scss';
import withStyles from '../../decorators/withStyles';

import MaskedInput from 'react-maskedinput';
import Checkbox from '../ui/Checkbox';

@withStyles(styles) class CustomerInfo extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            fields: {email, phone, phone_suffix, phone_number},
            handleSubmit,
            resetForm,
            submitting
            } = this.props;

        return (
            <div className="b-customer-info">
                <div className="b-customer-info__head">
                    Информация о покупателе
                </div>
                <div className="b-customer-info__body">
                    <div className="b-customer-info-body">
                        <div className="b-customer-info-body__email">
                            <label className="b-customer-info-label">Электронная почта</label>
                            <input className={`b-customer-info-field b-customer-info-field_email ${email.touched && email.error ? 'b-customer-info-field_error' : ''}`}
                                   type="email" {...email}
                                   placeholder="ivan.ivanov@gmail.com"/>
                            {email.touched && email.error && <div className="b-customer-info-err-label">{email.error}</div>}
                        </div>
                        <div className="b-customer-info-body__phone">
                            <label className="b-customer-info-label">Мобильный телефон</label>
                            <div className="b-customer-info-phone">
                                <div className="b-customer-info-phone__code">
                                    <input className="b-customer-info-field b-customer-info-field_code"
                                           type="text" {...phone_suffix}
                                           defaultValue="+7"/>
                                    <ul className="b-customer-info-phone-code-suggest">
                                        <li>Россия +7</li>
                                        <li>США +1</li>
                                    </ul>
                                </div>
                                <div className="b-customer-info-phone__number">
                                    <input className={`b-customer-info-field b-customer-info-field_number ${phone_number.touched && phone_number.error ? 'b-customer-info-field_error' : ''}`}
                                           type="tel" {...phone_number}
                                           placeholder="(999) 999-99-99"/>
                                    {phone_number.touched && phone_number.error && <div className="b-customer-info-err-label">{phone_number.error}</div>}
                                </div>
                            </div>
                        </div>
                        <div className="b-customer-info-body__phone-mobile">
                            <label className="b-customer-info-label">Мобильный телефон</label>
                            <input className={`b-customer-info-field ${phone.touched && phone.error ? 'b-customer-info-field_error' : ''}`}
                                   type="text" {...phone}
                                   placeholder="+7 (999) 999-99-99"/>
                            {phone.touched && phone.error && <div className="b-customer-info-err-label">{phone.error}</div>}
                        </div>
                        <div className="b-customer-info-body__agreement">
                            <Checkbox text="Хочу получать спецпредложения"/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default CustomerInfo;