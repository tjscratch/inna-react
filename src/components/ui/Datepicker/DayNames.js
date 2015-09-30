import React, { PropTypes } from 'react';

class DayNames extends React.Component {
    
    render() {
        return (
            <div className="b-datepicker-week-names">
                <div className="b-datepicker-week-names__name">пн</div>
                <div className="b-datepicker-week-names__name">вт</div>
                <div className="b-datepicker-week-names__name">ср</div>
                <div className="b-datepicker-week-names__name">чт</div>
                <div className="b-datepicker-week-names__name">пт</div>
                <div className="b-datepicker-week-names__name">сб</div>
                <div className="b-datepicker-week-names__name">вс</div>
            </div>
        );
    }
    
}

export default DayNames;
