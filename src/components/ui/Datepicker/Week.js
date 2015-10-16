import React, { PropTypes } from 'react';
//import moment from 'moment';

class Week extends React.Component {

    render() {

        var days      = [],
            date      = this.props.date,
            month     = this.props.month,
            startDate = this.props.startDate ? this.props.startDate : new Date();

        //console.log(startDate);

        for (var i = 0; i < 7; i++) {

            if (this.props.selected) {
                var isBefore = date.isBefore(startDate, "day");
            } else {
                var isBefore = date.isBefore(startDate, "day");
            }

            var day = {
                name: date.format("dd").substring(0, 1),
                number: date.date(),
                isCurrentMonth: date.month() === month.month(),
                isToday: date.isSame(startDate, "day"),
                isBefore: isBefore,
                date: date
            };
            if (day.isBefore) {
                var dayItem = (
                    <div className="b-datepicker-week__day b-datepicker-week__day-disabled">
                        {day.number}
                    </div>
                )
            } else {
                var dayItem = (
                    <div
                        key={day.date.toString()}
                        className={
                    "b-datepicker-week__day b-datepicker-week__day-active" + 
                    (day.isToday ? " b-datepicker-week__day-today" : "") +  
                    (day.date.isSame(this.props.selected) ? " b-datepicker-week__day-selected" : "")
                    }
                        onClick={this.props.select.bind(null, day)}>
                        {day.number}
                    </div>
                )
            }
            days.push(dayItem);
            date = date.clone();
            date.add(1, "d");
        }

        return (
            <div className="b-datepicker-week" key={days[0].toString()}>
                {days}
            </div>
        );
    }

}

export default Week;
