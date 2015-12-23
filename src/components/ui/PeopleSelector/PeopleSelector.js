import React, { PropTypes } from 'react';
import moment from 'moment';
import styles from './PeopleSelector.scss';
import withStyles from '../../../decorators/withStyles';

import Checkbox from '../Checkbox';


@withStyles(styles)
class PeopleSelector extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            childCount: 0,
            flightClass: this.props.flightClass ? 'бизнес' : 'эконом'
        };
    }

    //bodyClick(event) {
    //    this.setState({
    //        isOpen: false
    //    });
    //    document.removeEventListener('click', this.bodyClick.bind(this), false);
    //}

    handleOpen(event) {
        this.setState({
            isOpen: !this.state.isOpen
        })
        //document.addEventListener('click', this.bodyClick.bind(this), false);
    }

    //stopPropagation(event) {
    //    this.handleOpen();
    //    event.stopPropagation();
    //    event.nativeEvent.stopImmediatePropagation();
    //}

    counter(type, count) {
        if (type == 'adult') {
            this.props.setAdultCount(count);
        }
        if (type == 'child') {
            var childCount = [];
            for (var i = 0; i < count; i++) {
                childCount.push(0);
            }
            this.props.setChildAges(childCount.join('_'));
        }
    }

    getPeopleCount() {
        var adultCount = 0;
        var childCount = 0;
        if (this.props.adultCount) {
            adultCount = +this.props.adultCount;
        }
        var childAges = this.props.childAges;
        if (childAges) {
            let agesArray = childAges.split('_');
            if (agesArray) {
                childCount = agesArray.length;
            }
        }
        
        var peopleCount = adultCount + childCount;
        if(peopleCount == 1 || peopleCount == 5 || peopleCount == 6 || peopleCount == 7){
            peopleCount = `${peopleCount} человек`
        }
        if(peopleCount == 2 || peopleCount == 3 || peopleCount == 4){
            peopleCount = `${peopleCount} человека`
        }
        
        return (
            <div className="b-people-selector__value">
                <div className="b-people-selector__value-peoples">
                    {peopleCount}
                </div>,
                <div className="b-people-selector__value-class">
                    {this.state.flightClass}
                </div>
            </div>
        )
    }

    renderPeoplesBtns() {
        var btns = [];
        for (var i = 1; i < 5; i++) {
            btns.push(
                <div key={i} className={this.props.adultCount == i ? 'b-people-selector-dropdown__btns-btn b-people-selector-dropdown__btns-btn_selected' : 'b-people-selector-dropdown__btns-btn'}
                     onClick={this.counter.bind(this, 'adult', i)}>{i}
                </div>
            )
        }
        return (
            <div>
                <div className="b-people-selector-dropdown__label">
                    Взрослые
                </div>
                <div className="b-people-selector-dropdown__btns">
                    {btns}
                </div>
            </div>
        );
    }

    setChildAge(index, event){
        var childCountArr = this.props.childAges.split('_');
        childCountArr[index] = event.target.value;
        this.props.setChildAges(childCountArr.join('_'));
    }
    
    renderChildsBtns() {

        var childCount = 0;
        var childAges = this.props.childAges;
        if (childAges) {
            let agesArray = childAges.split('_');
            if (agesArray) {
                childCount = agesArray.length;
            }
        }

        var btns = [];
        for (var i = 0; i < 4; i++) {
            btns.push(
                <div key={i} className={childCount == i ? 'b-people-selector-dropdown__btns-btn b-people-selector-dropdown__btns-btn_selected' : 'b-people-selector-dropdown__btns-btn'}
                     onClick={this.counter.bind(this, 'child', i)}>{i}
                </div>
            )
        }
        
        var options = [];
        for (var i = 0; i < 18; i++) {
            options.push(<option>{i}</option>)
        }
        var selects = [];
        for (var i = 0; i < childCount; i++) {
            selects.push(
                <select key={i} className="b-people-selector-dropdown__selects-select"
                        onChange={this.setChildAge.bind(this, i)}
                        value={this.props.childAges.split('_')[i]}>
                    {options}
                </select>
            )
        }

        return (
            <div>
                <div className="b-people-selector-dropdown__label">
                    Дети
                </div>
                <div className="b-people-selector-dropdown__btns">
                    {btns}
                </div>
                <div className="b-people-selector-dropdown__label">
                    Возраст детей
                </div>
                <div className="b-people-selector-dropdown__selects">
                    {selects}
                </div>
            </div>
        );
    }

    changeFlightClass(data){
        if(data){
            this.props.setFlightClass(1);
            this.setState({
                flightClass: 'бизнес'
            });
        }else{
            this.props.setFlightClass(0);
            this.setState({
                flightClass: 'эконом'
            });
        }
    }

    render() {
        return (
            <div className={this.state.isOpen ? 'b-people-selector b-people-selector__open' : 'b-people-selector'}
                //onClick={this.stopPropagation.bind(this)}
            >
                <div className="b-people-selector-dropdown__toggle" onClick={this.handleOpen.bind(this)}>
                    <input className="b-people-selector__input" onFocus={this.handleOpen.bind(this)}/>
                    {this.getPeopleCount()}
                    <div className="b-people-selector__icon-action">
                        {this.state.isOpen ? <i className="icon-emb-angle-up"></i> : <i className="icon-emb-angle-down"></i>}
                    </div>
                </div>

                <div className="b-people-selector-dropdown">
                    {this.renderPeoplesBtns()}
                    {this.renderChildsBtns()}
                    <div className="b-people-selector-dropdown__avia-class">
                        <Checkbox text="Бизнес-класс" 
                                  checked={this.props.flightClass} 
                                  checkboxChange={this.changeFlightClass.bind(this)}/>
                    </div>
                </div>
            </div>
        );
    }

}

export default PeopleSelector;
