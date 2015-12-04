import React, { PropTypes } from 'react';
import moment from 'moment';
import styles from './PeopleSelector.scss';
import withStyles from '../../../decorators/withStyles';

import Checkbox from '../Checkbox';


@withStyles(styles) class PeopleSelector extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        };
    }

    bodyClick(event) {
        this.setState({
            isOpen: false
        });
        document.removeEventListener('click', this.bodyClick.bind(this), false);
    }

    handleOpen(event) {
        document.addEventListener('click', this.bodyClick.bind(this), false);
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    stopPropagation(event) {
        this.handleOpen();
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
    }


    setPeooples(count) {
        this.props.setAdultCount(count);
    }


    render() {
        return (
            <div className={this.state.isOpen ? 'b-people-selector b-people-selector__open' : 'b-people-selector'}
                 onClick={this.stopPropagation.bind(this)}
                >
                <input className="b-people-selector__input" onFocus={this.handleOpen.bind(this)}/>

                <div className="b-people-selector__value">
                    <div className="b-people-selector__value-peoples">
                        {this.props.adultCount}
                        2 человека,
                    </div>
                    <div className="b-people-selector__value-class">
                        эконом
                    </div>
                </div>

                <div className="b-people-selector__icon-action">
                    {this.state.isOpen ? <i className="icon-emb-angle-up"></i> : <i className="icon-emb-angle-down"></i>}
                </div>

                <div className="b-people-selector-dropdown">
                    <div className="b-people-selector-dropdown__label">
                        Взрослые
                    </div>
                    <div className="b-people-selector-dropdown__btns">
                        <div className="b-people-selector-dropdown__btns-btn" onClick={this.setPeooples.bind(this, 1)}>1</div>
                        <div className="b-people-selector-dropdown__btns-btn b-people-selector-dropdown__btns-btn_selected"
                             onClick={this.setPeooples.bind(this, 2)}>2
                        </div>
                        <div className="b-people-selector-dropdown__btns-btn" onClick={this.setPeooples.bind(this, 3)}>3</div>
                        <div className="b-people-selector-dropdown__btns-btn" onClick={this.setPeooples.bind(this, 4)}>4</div>
                    </div>
                    <div className="b-people-selector-dropdown__label">
                        Дети
                    </div>
                    <div className="b-people-selector-dropdown__btns">
                        <div className="b-people-selector-dropdown__btns-btn">1</div>
                        <div className="b-people-selector-dropdown__btns-btn b-people-selector-dropdown__btns-btn_selected">2</div>
                        <div className="b-people-selector-dropdown__btns-btn">3</div>
                        <div className="b-people-selector-dropdown__btns-btn">4</div>
                    </div>

                    <div className="b-people-selector-dropdown__avia-class">
                        <Checkbox text="Бизнес-класс"/>
                    </div>
                </div>
            </div>
        );
    }

}

export default PeopleSelector;
