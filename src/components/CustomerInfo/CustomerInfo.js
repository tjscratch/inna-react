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
            fields: {email, phone},
            } = this.props;

        //console.log('fields', this.props.fields);

        return (
            <div className="b-customer-info">
                <div className="b-customer-info__head">
                    Информация о покупателе
                </div>
                <div className="b-customer-info__body">
                    <div className="b-customer-info-body">
                        <div className="b-customer-info-body__email">
                            <label className="b-customer-info-label">Электронная почта</label>
                            <input readOnly={true} className="b-customer-info-field b-customer-info-field_email"
                                   type="email" value={email}
                                   placeholder="ivan.ivanov@gmail.com"/>
                        </div>
                        <div className="b-customer-info-body__phone">
                            <label className="b-customer-info-label">Мобильный телефон</label>
                            <input readOnly={true} className="b-customer-info-field"
                                   type="text" value={phone}
                                   placeholder="+7 (999) 999-99-99"/>
                        </div>
                        <div className="b-customer-info-body__agreement">
                            <Checkbox readOnly={true} text="Хочу получать спецпредложения"/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default CustomerInfo;