import React, { PropTypes, Component } from 'react';
import styles from './Passengers.scss';
import withStyles from '../../decorators/withStyles';

import RadioSwitch from '../ui/RadioSwitch';
import Checkbox from '../ui/Checkbox';

@withStyles(styles) class Passengers extends Component {
    constructor(props) {
        super(props);
    }

    renderItem(item, ix) {
        return (
            <div key={ix} className="b-passengers-list-item">
                <div className="b-passengers-list-item__gender">
                    <label className="b-passenger-label">Пол</label>
                    <RadioSwitch lbl1="М" lbl2="Ж"/>
                </div>
                <div className="b-passengers-list-item__second-name">
                    <label className="b-passenger-label">Фамилия</label>
                    <input className="b-passenger-field b-passenger-field_second-name"
                           type="text"
                           placeholder="IVANOV"/>
                </div>
                <div className="b-passengers-list-item__name">
                    <label className="b-passenger-label">Имя</label>
                    <input className="b-passenger-field b-passenger-field_name"
                           type="text"
                           placeholder="IVAN"/>
                </div>
                <div className="b-passengers-list-item__birth">
                    <label className="b-passenger-label">Дата рождения</label>
                    <input className="b-passenger-field b-passenger-field_birth"
                           type="text"
                           placeholder="дд.мм.гггг"/>
                </div>
                <div className="b-passengers-list-item__citizenship">
                    <label className="b-passenger-label">Гражданство</label>
                    <input className="b-passenger-field b-passenger-field_citizenship"
                           type="text"
                           placeholder="Россия"/>
                </div>
                <div className="b-passengers-list-item__document">
                    <label className="b-passenger-label">Документ</label>
                    <input className="b-passenger-field b-passenger-field_document"
                           type="text"
                           placeholder="Загранпаспорт"/>
                </div>
                <div className="b-passengers-list-item__series-number">
                    <label className="b-passenger-label">Серия и номер</label>
                    <input className="b-passenger-field b-passenger-field_series-number"
                           type="text"
                           placeholder="123456789"/>
                </div>
                <div className="b-passengers-list-item__valid-to">
                    <label className="b-passenger-label">Действителен до</label>
                    <input className="b-passenger-field b-passenger-field_valid-to"
                           type="text"
                           placeholder="дд.мм.гггг"/>
                </div>
                <div className="b-passengers-list-item__bonus-card">
                    <Checkbox text="Есть бонусная карта"/>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className="b-passengers-list">
                <div className="b-passengers-list__head">
                    Информация о покупателе
                </div>
                <div className="b-passengers-list__body">
                    <div className="b-passengers-list-container">
                        {this.props.data.map(this.renderItem, this)}
                    </div>
                </div>
            </div>
        );
    }

}

export default Passengers;
