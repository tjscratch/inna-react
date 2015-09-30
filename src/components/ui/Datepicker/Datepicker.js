import React, { PropTypes } from 'react';
import moment from 'moment';
import styles from './Datepicker.scss';
import withStyles from '../../../decorators/withStyles';
import DayNames from './DayNames.js';
import Week from './Week.js';


@withStyles(styles) class Datepicker extends React.Component {

    constructor() {
        super();


        this.state = {
            month: moment().startOf("day").clone(),
            selected: null
        }
        
    }


    previous() {
        console.log(this)
        var month = this.state.month;
        console.log(this)
        month.add(-1, "M");
        this.setState({month: month});
    }

    next() {
        var month = this.state.month;
        month.add(1, "M");
        this.setState({month: month});
    }

    select(day) {
        console.log(day)
        console.log(day.date)
        this.setState({selected: day.date});
        this.forceUpdate();
    }

    render() {
        return (
            <div className="b-datepicker">
                <div className="b-datepicker-head">
                    <div className="b-datepicker-head__control" onClick={this.previous.bind(this)}>
                        <i className="b-datepicker-head__icons icon-emb-angle-left"></i>
                    </div>
                    <div className="b-datepicker-head__label">
                        {this.renderMonthLabel()}
                    </div>
                    <div className="b-datepicker-head__control" onClick={this.next.bind(this)}>
                        <i className="b-datepicker-head__icons icon-emb-angle-right"></i>
                    </div>
                </div>
                <DayNames />
                {this.renderWeeks()}
            </div>
        );
    }

    renderWeeks() {
        var weeks      = [],
            done       = false,
            date       = this.state.month.clone().startOf("month").add("w" - 1).day("Sunday"),
            monthIndex = date.month(),
            count      = 0;

        while (!done) {
            weeks.push(
                <Week key={date.toString()}
                      date={date.clone()}
                      month={this.state.month}
                      select={this.select.bind(this)}
                      selected={this.state.selected}/>
            );
            date.add(1, "w");
            done = count++ > 2 && monthIndex !== date.month();
            monthIndex = date.month();
        }

        return weeks;
    }

    renderMonthLabel() {
        return <span>{this.state.month.format("MMMM, YYYY")}</span>;
    }

}

export default Datepicker;
