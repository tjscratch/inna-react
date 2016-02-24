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

import UpperInput from '../ui/UpperInput';
import DropDown from '../ui/DropDown';

import documentsList from '../../constants/documentsList';

var genderValues = [{name: 'Неизвестно', value: '0'}, {name: 'Мужской', value: '1'}, {name: 'Женский', value: '2'}];

@withViewport
@withStyles(styles) class Passengers extends Component {
    constructor(props) {
        super(props);
    }

    renderItem(passenger, ix) {
        var { viewport, citizenshipList } = this.props;
        var { gender, lastName, name, birth, citizenship, docType, docNumber, docExpires } = passenger;

        var genderName = '';
        var genderItem = genderValues.find((g)=>{
            return g.value == gender
        });

        if (genderItem) {
            genderName = genderItem.name;
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
                            <input readOnly={true} className="b-passenger-field b-passenger-field_gender"
                                      type="text" placeholder="Мужской"
                                      value={genderName}/>
                            :
                            <RadioSwitch lbl1="М" lbl2="Ж" val1="1" val2="2" selected={gender}/>
                    }
                </div>
                <div className="b-passenger-item b-passenger-item_second-name">
                    <label className="b-passenger-label">Фамилия</label>
                    <input readOnly={true} className="b-passenger-field b-passenger-field_second-name"
                        type="text" value={lastName}
                        placeholder="IVANOV"/>
                </div>
                <div className="b-passenger-item b-passenger-item_name">
                    <label className="b-passenger-label">Имя</label>
                    <input readOnly={true} className="b-passenger-field b-passenger-field_name"
                        type="text" value={name}
                        placeholder="IVAN"/>
                </div>
                <div className="b-passenger-item b-passenger-item_birth">
                    <label className="b-passenger-label">Дата рождения</label>
                    <input readOnly={true} className="b-passenger-field b-passenger-field_birth"
                        type="text" value={birth}
                        placeholder="дд.мм.гггг"/>
                </div>
                <div className="b-passenger-item b-passenger-item_citizenship">
                    <label className="b-passenger-label">Гражданство</label>
                    <input readOnly={true} className="b-passenger-field b-passenger-field_citizenship"
                        type="text" value={citizenship} placeholder="Россия"/>
                </div>
                <div className="b-passenger-item b-passenger-item_series-number">
                    <label className="b-passenger-label">Серия и номер док.</label>
                    <input readOnly={true} className="b-passenger-field b-passenger-field_series-number"
                        type="text" value={docNumber}/>
                </div>
                <div className="b-passenger-item b-passenger-item_valid-to">
                    <label className="b-passenger-label">Действителен до</label>
                    <input readOnly={true} className="b-passenger-field b-passenger-field_valid-to"
                        type="text" value={docExpires}
                        placeholder="дд.мм.гггг"/>
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
            passengers,
            } = this.props;

        //console.log('passengers', passengers);

        if (passengers) {
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

        return null;
    }

}

export default Passengers;
