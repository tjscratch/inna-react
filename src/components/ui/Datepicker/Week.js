import React, { PropTypes } from 'react';
import moment from 'moment';

class Week extends React.Component {

    render() {

        var days = [];
        var date = this.props.date;
        var month = this.props.month;
        var selectedStartDate = this.props.startDate ? moment.utc(this.props.startDate, "DD.MM.YYYY").clone().toDate() : null;
        var selectedEndDate = this.props.endDate ? moment.utc(this.props.endDate, "DD.MM.YYYY").clone().toDate() : null;

        if(this.props.range){
            //console.log("selectedStartDate", selectedStartDate)
            //console.log("selectedEndDate", selectedEndDate)
            if(this.props.start){
                var startDate = new Date();
            }else{
                var startDate = selectedStartDate ? selectedStartDate : new Date();
            }
        }else{
            var startDate = new Date();
        }


        for (var i = 0; i < 7; i++) {

            var isBefore = date.isBefore(startDate, "day");
            var isStart = date.isSame(selectedStartDate);
            var isEnd = date.isSame(selectedEndDate);
            var isRange = date.isAfter(selectedStartDate, "day") && date.isBefore(selectedEndDate, "day");
            
            var day = {
                name: date.format("dd").substring(0, 1),
                number: date.date(),
                isCurrentMonth: date.month() === month.month(),
                isToday: date.isSame(startDate, "day"),
                isBefore: isBefore,
                isStart: isStart,
                isEnd: isEnd,
                isRange: isRange,
                date: date
            };
            
            if (day.isBefore) {
                var dayItem = (
                    <div className="b-datepicker-week__day b-datepicker-week__day-disabled"
                         key={day.date.toString()}>
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
                    (day.isStart ? " b-datepicker-week__day-selected-start" : "") + 
                    (day.isEnd ? " b-datepicker-week__day-selected-end" : "") +
                    (day.isRange ? " b-datepicker-week__day-selected-range" : "")
                    }
                        onClick={this.props.select.bind(null, day)}>
                        <i className="icon-emb-flight-1"></i>
                        <span className="b-datepicker-week__day-number">
                            {day.number}
                        </span>
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
