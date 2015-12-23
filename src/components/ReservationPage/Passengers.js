import React, { PropTypes, Component } from 'react';
import styles from './Passengers.scss';
import withStyles from '../../decorators/withStyles';
import withViewport from '../../decorators/withViewport';

import RadioSwitch from '../ui/RadioSwitch';
import Checkbox from '../ui/Checkbox';
import MaskedInput from 'react-maskedinput';

import { numOrder } from '../../helpers/CountHelper.js';
import { transliterateAndToUpper } from '../../helpers/inputHelper';

import { processField } from '../../actions/action_form';

import UpperInput from './upperInput';

@withViewport
@withStyles(styles) class Passengers extends Component {
    constructor(props) {
        super(props);
    }

    handleChangeToUpper(e, fieldName) {
        var { dispatch } = this.props;
        if (e.target.value) {
            //e.target.value = transliterateAndToUpper(e.target.value);
            //var val = transliterateAndToUpper(e.target.value);
            //dispatch(processField(fieldName, val));
        }
    }

    renderItem(passenger, ix) {
        var { viewport } = this.props;

        return (
            <div key={ix} className="b-passenger">
                <div className="b-passenger-num">
                    {`${numOrder(ix+1)} турист`}
                </div>
                <div className="b-passenger-item b-passenger-item_gender">
                    <label className="b-passenger-label">Пол</label>
                    {
                        viewport.isMobile ?
                            <input className="b-passenger-field b-passenger-field_gender"
                                   type="text" {...passenger.gender}
                                   placeholder="Мужской"/>
                            :
                            <RadioSwitch lbl1="М" lbl2="Ж" val1="male" val2="female" formField={passenger.gender} />
                    }
                </div>
                <div className="b-passenger-item b-passenger-item_second-name">
                    <label className="b-passenger-label">Фамилия</label>
                    <UpperInput className="b-passenger-field b-passenger-field_second-name"
                           type="text" field={passenger.lastName}
                           placeholder="IVANOV"/>
                </div>
                <div className="b-passenger-item b-passenger-item_name">
                    <label className="b-passenger-label">Имя</label>
                    <input className="b-passenger-field b-passenger-field_name"
                           type="text" {...passenger.name}
                           placeholder="IVAN"/>
                </div>
                <div className="b-passenger-item b-passenger-item_birth">
                    <label className="b-passenger-label">Дата рождения</label>
                    <MaskedInput mask="11.11.1111" className="b-passenger-field b-passenger-field_birth"
                           type="text" {...passenger.birth}
                           placeholder="дд.мм.гггг"/>
                </div>
                <div className="b-passenger-item b-passenger-item_citizenship">
                    <label className="b-passenger-label">Гражданство</label>
                    <input className="b-passenger-field b-passenger-field_citizenship"
                           type="text" {...passenger.citizenship}
                           placeholder="Россия"/>
                </div>
                <div className="b-passenger-item b-passenger-item_document">
                    <label className="b-passenger-label">Документ</label>
                    <input className="b-passenger-field b-passenger-field_document"
                           type="text" {...passenger.docType}
                           placeholder="Загранпаспорт"/>
                </div>
                <div className="b-passenger-item b-passenger-item_series-number">
                    <label className="b-passenger-label">Серия и номер</label>
                    <input className="b-passenger-field b-passenger-field_series-number"
                           type="text" {...passenger.docNumber}
                           placeholder="123456789"/>
                </div>
                <div className="b-passenger-item b-passenger-item_valid-to">
                    <label className="b-passenger-label">Действителен до</label>
                    <MaskedInput mask="11.11.1111" className="b-passenger-field b-passenger-field_valid-to"
                           type="text" {...passenger.docExpires}
                           placeholder="дд.мм.гггг"/>
                </div>
                <div className="b-passenger-item b-passenger-item_bonus-card">
                    <Checkbox text="Есть бонусная карта"/>
                </div>
            </div>
        )
    }

    render() {
        const {
            fields: {passengers},
            handleSubmit,
            resetForm,
            submitting
            } = this.props;

        return (
            <div className="b-passengers-list">
                <div className="b-passengers-list__head">
                    Пассажиры
                </div>
                <div className="b-passengers-list__body">
                    <div className="b-passengers-list-container">
                        {passengers.map(this.renderItem, this)}
                    </div>
                </div>
            </div>
        );
    }

}

export default Passengers;
