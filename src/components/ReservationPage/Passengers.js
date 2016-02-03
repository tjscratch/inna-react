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
import DropDown from '../ui/DropDown';

var genderValues = [{name: 'Мужской', value: 'male'}, {name: 'Женский', value: 'female'}];

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
        var { viewport, citizenshipList, filterDocsList } = this.props;
        var { gender, lastName, name, birth, citizenship, docType, docNumber, docExpires } = passenger;

        //список документов
        var documentsList = filterDocsList(citizenship.value);
        //console.log('documentsList filterDocsList', citizenship.value, JSON.stringify(documentsList));

        var docNumPlaceholder = '1234 567890';
        switch (docType.value) {
            case 2: docNumPlaceholder = '123456789'; break;
            case 3: docNumPlaceholder = 'I-МЮ №123456'; break;
        }

        return (
            <div key={ix} className="b-passenger">
                <div className="b-passenger-num">
                    {`${numOrder(ix + 1)} турист`}
                </div>
                <div className="b-passenger-item b-passenger-item_gender">
                    <label className="b-passenger-label">Пол</label>
                    {
                        viewport.isMobile ?
                            <DropDown className="b-passenger-field b-passenger-field_gender"
                                      type="text" placeholder="Мужской"
                                      values={genderValues} {...gender}/>
                            :
                            <RadioSwitch lbl1="М" lbl2="Ж" val1="male" val2="female" formField={gender}/>
                    }
                    {gender.touched && gender.error && <div className="b-passenger-err-label b-passenger-err-label_gender">{gender.error}</div>}
                </div>
                <div className="b-passenger-item b-passenger-item_second-name">
                    <label className="b-passenger-label">Фамилия</label>
                    <UpperInput
                        className={`b-passenger-field b-passenger-field_second-name ${lastName.touched && lastName.error ? 'b-passenger-field_error' : ''}`}
                        type="text" field={lastName}
                        placeholder="IVANOV"/>
                    {lastName.touched && lastName.error &&
                    <div className="b-passenger-err-label">{lastName.error}</div>}
                </div>
                <div className="b-passenger-item b-passenger-item_name">
                    <label className="b-passenger-label">Имя</label>
                    <UpperInput
                        className={`b-passenger-field b-passenger-field_name ${name.touched && name.error ? 'b-passenger-field_error' : ''}`}
                        type="text" {...name}
                        placeholder="IVAN"/>
                    {name.touched && name.error && <div className="b-passenger-err-label">{name.error}</div>}
                </div>
                <div className="b-passenger-item b-passenger-item_birth">
                    <label className="b-passenger-label">Дата рождения</label>
                    <MaskedInput mask="11.11.1111"
                                 className={`b-passenger-field b-passenger-field_birth ${birth.touched && birth.error ? 'b-passenger-field_error' : ''}`}
                                 type="text" {...birth}
                                 placeholder="дд.мм.гггг"/>
                    {birth.touched && birth.error && <div className="b-passenger-err-label">{birth.error}</div>}
                </div>
                <div className="b-passenger-item b-passenger-item_citizenship">
                    <label className="b-passenger-label">Гражданство</label>
                    <DropDown className={`b-passenger-field b-passenger-field_citizenship ${citizenship.touched && citizenship.error ? 'b-passenger-field_error' : ''}`}
                              type="text" {...citizenship} placeholder="Россия"
                              values={citizenshipList} {...citizenship}/>
                    {citizenship.touched && citizenship.error && <div className="b-passenger-err-label">{citizenship.error}</div>}
                </div>
                <div className="b-passenger-item b-passenger-item_document">
                    <label className="b-passenger-label">Документ</label>
                    {
                        /*<input className={`b-passenger-field b-passenger-field_document ${docType.touched && docType.error ? 'b-passenger-field_error' : ''}`}
                               type="text" {...docType}
                               placeholder="Загранпаспорт"/>*/
                    }
                    <DropDown className={`b-passenger-field b-passenger-field_citizenship ${docType.touched && docType.error ? 'b-passenger-field_error' : ''}`}
                              type="text" {...docType} placeholder="Загранпаспорт"
                              values={documentsList} {...docType}/>
                    {docType.touched && docType.error && <div className="b-passenger-err-label">{docType.error}</div>}
                </div>
                <div className="b-passenger-item b-passenger-item_series-number">
                    <label className="b-passenger-label">Серия и номер</label>
                    <input className={`b-passenger-field b-passenger-field_series-number ${docNumber.touched && docNumber.error ? 'b-passenger-field_error' : ''}`}
                           type="text" {...docNumber}
                           placeholder={docNumPlaceholder}/>
                    {docNumber.touched && docNumber.error && <div className="b-passenger-err-label">{docNumber.error}</div>}
                </div>
                <div className="b-passenger-item b-passenger-item_valid-to">
                    <label className="b-passenger-label">Действителен до</label>
                    <MaskedInput mask="11.11.1111"
                                 className={`b-passenger-field b-passenger-field_valid-to ${docExpires.touched && docExpires.error ? 'b-passenger-field_error' : ''}`}
                                 type="text" {...docExpires}
                                 placeholder="дд.мм.гггг"/>
                    {docExpires.touched && docExpires.error && <div className="b-passenger-err-label">{docExpires.error}</div>}
                </div>
                {
                    /*<div className="b-passenger-item b-passenger-item_bonus-card">
                        <Checkbox text="Есть бонусная карта"/>
                    </div>*/
                }

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
