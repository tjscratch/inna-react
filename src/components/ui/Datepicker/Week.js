import React, { PropTypes } from 'react';
import moment from 'moment';

class Week extends React.Component {

    render() {

        var days  = [],
            date  = this.props.date,
            month = this.props.month;

        for (var i = 0; i < 7; i++) {
            var day = {
                name: date.format("dd").substring(0, 1),
                number: date.date(),
                isCurrentMonth: date.month() === month.month(),
                isToday: date.isSame(new Date(), "day"),
                date: date
            };
            days.push(
                <span 
                    key={day.date.toString()} 
                    className={
                    "b-datepicker-week__day" + 
                    (day.isToday ? " b-datepicker-week__today" : "") + 
                    (day.isCurrentMonth ? "" : " b-datepicker-week__different-month") + 
                    (day.date.isSame(this.props.selected) ? " b-datepicker-week__selected" : "")
                    } 
                    onClick={this.props.select.bind(null, day)}>
                    {day.number}
                </span>
            );
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
