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
            fromDate: null,
            toDate: null,
            datepickerStartShow: false,
            datepickerEndShow: false
        };

        this.clickFn = this.bodyClick.bind(this);
    }


    openDatepicker(type, isShow, e) {
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
        let selectedDate = day.date.format("DD MMMM");
        let selectedDateProps = day.date.format("DD.MM.YYYY");

        if (type == 'start') {
            this.setState({
                fromDate: selectedDate,
                datepickerStartShow: false,
                datepickerEndShow: true
            })
            this.props.setStartDate(selectedDateProps);
        }
        if (type == 'end') {
            this.setState({
                toDate: selectedDate,
                datepickerStartShow: false,
                datepickerEndShow: false
            })
            this.props.setEndDate(selectedDateProps);
        }
    }


    renderDatepickerStart() {
        if (this.state.datepickerStartShow) {
            return (
                <Datepicker
                    range={true}
                    start={this.state.datepickerStartShow}
                    end={this.state.datepickerEndShow}
                    setDate={this.setSelectedDate.bind(this)}
                    startDate={this.props.startDate}
                    endDate={this.props.endDate}
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
                    startDate={this.props.startDate}
                    endDate={this.props.endDate}
                    />
            )
        }
    }

    componentDidMount() {
        document.addEventListener('click', this.clickFn, false);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.clickFn, false);
    }

    bodyClick(event) {
        this.setState({
            datepickerStartShow: false,
            datepickerEndShow: false
        })
    }

    stopPropagation(event) {
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
    }



    render() {
      console.log('this.props.startDate', this.props.startDate);
        return (
            <div className="b-datepicker-range" onClick={this.stopPropagation.bind(this)}>
                <div className="b-datepicker-range__item b-datepicker-range__item-start">
                    <div className="b-datepicker-range__input"
                           onClick={this.openDatepicker.bind(this, 'start', true)}>
                      {this.props.startDate ? this.props.startDate : 'Туда'}
                    </div>
                    <i className="b-datepicker-range__icon icon-emb-calendar"
                       onClick={this.openDatepicker.bind(this, 'start', true)}></i>
                    {this.renderDatepickerStart()}
                </div>
                <div className="b-datepicker-range__item b-datepicker-range__item-end">
                    <div className="b-datepicker-range__input"
                           onClick={this.openDatepicker.bind(this, 'end', true)}>
                      {this.props.endDate ? this.props.endDate : 'Обратно'}
                    </div>
                    <i className="b-datepicker-range__icon icon-emb-calendar"
                       onClick={this.openDatepicker.bind(this, 'end', true)}></i>
                    {this.renderDatepickerEnd()}
                </div>
            </div>
        );
    }

}

export default DatepickerRange;
