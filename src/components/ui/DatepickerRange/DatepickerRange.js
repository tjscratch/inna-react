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
    }


    openDatepicker(type, isShow) {
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
        document.body.addEventListener('click', this.bodyClick.bind(this));
        document.querySelector(".b-datepicker-range").addEventListener('click', this.clickStop.bind(this));
    }

    componentDidUnmount() {
        document.body.removeEventListener('click', this.bodyClick.bind(this));
    }

    bodyClick(event) {
        this.setState({
            datepickerStartShow: false,
            datepickerEndShow: false
        })
    }

    clickStop(event){
        event.stopPropagation();
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
