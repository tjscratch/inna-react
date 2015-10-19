import React, { PropTypes } from 'react';
import moment from 'moment';
import styles from './DatepickerRange.scss';
import withStyles from '../../../decorators/withStyles';
import Datepicker from '../../ui/Datepicker';


@withStyles(styles) class DatepickerRange extends React.Component {
    constructor(props) {
        super(props);
        //формат данных:
        /*
         fromDate - 09.11.2015
         toDate - 09.11.2015
         */
        this.state = {
            startDate: this.props.startDate ? this.props.startDate : null,
            endDate: this.props.endDate ? this.props.endDate : null,
            datepickerStartShow: false,
            datepickerEndShow: false
        };
    }


    openDatepicker(type, isShow) {
        console.log(this.props);
        if (type == 'start') {
            this.setState({
                datepickerStartShow: isShow,
                datepickerEndShow: !isShow
            })
        }
        if (type == 'end') {
            this.setState({
                datepickerStartShow: !isShow,
                datepickerEndShow: isShow
            })
        }
    }

    setSelectedDate(type, day) {
        if (type == 'start') {
            this.setState({
                fromDate: day.date.format("DD MMMM")
            })
            this.props.setStartDate(day.date.format("DD.MM.YYYY"));
            this.openDatepicker('start', false);
            this.openDatepicker('end', true);
        }
        if (type == 'end') {
            this.setState({
                toDate: day.date.format("DD MMMM")
            })
            this.openDatepicker('end', false);
        }
    }


    renderDatepickerStart() {
        if (this.state.datepickerStartShow) {
            return (
                <Datepicker
                    range={true}
                    setDate={this.setSelectedDate.bind(this)}
                    start={this.state.datepickerStartShow}
                    end={this.state.datepickerEndShow}
                    fromDate={this.state.fromDate}
                    toDate={this.state.toDate}
                    />
            )
        }
    }

    renderDatepickerEnd() {
        if (this.state.datepickerEndShow) {
            return (
                <Datepicker
                    range={true}
                    start={this.state.datepickerStartShow}
                    end={this.state.datepickerEndShow}
                    setDate={this.setSelectedDate.bind(this)}
                    fromDate={this.state.fromDate}
                    toDate={this.state.toDate}
                    />
            )
        }
    }

    render() {
        return (
            <div className="b-datepicker-range">
                <div className="b-datepicker-range__item b-datepicker-range__item-start">
                    <input className="b-datepicker-range__input"
                           placeholder="Туда"
                           type="text"
                           value={this.state.fromDate}
                           onFocus={this.openDatepicker.bind(this, 'start', true)}
                        />
                    <i className="b-datepicker-range__icon icon-emb-calendar"></i>
                    {this.renderDatepickerStart()}
                </div>
                <div className="b-datepicker-range__item b-datepicker-range__item-end">
                    <input className="b-datepicker-range__input"
                           placeholder="Обратно"
                           type="text"
                           onFocus={this.openDatepicker.bind(this, 'end', true)}
                           value={this.state.toDate}/>
                    <i className="b-datepicker-range__icon icon-emb-calendar"></i>
                    {this.renderDatepickerEnd()}
                </div>
            </div>
        );
    }

}

export default DatepickerRange;
