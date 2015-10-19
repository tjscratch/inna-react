import React, { PropTypes } from 'react';
import moment from 'moment';
moment.locale('ru');
import styles from './Datepicker.scss';
import withStyles from '../../../decorators/withStyles';
import DayNames from './DayNames.js';
import Week from './Week.js';



@withStyles(styles) class Datepicker extends React.Component {

    constructor(props) {
        super(props);

        var month = moment().clone().utc().startOf("day");
        
        this.state = {
            month: month,
            selected: null,
            afaf: null
        }
    }

    previous() {
        var month = this.state.month;
        this.setState({month: month.add(-1, "M")});
    }

    next() {
        var month = this.state.month;
        this.setState({month: month.add(1, "M")});
    }

    select(day) {
        this.setState({selected: day});
        if(this.props.start){
            this.props.setDate('start', day);   
        }
        if(this.props.end){
            this.props.setDate('end', day);   
        }
        this.forceUpdate();
    }

    renderWeeks() {
        
        var weeks      = [],
            done       = false,
            date       = this.state.month.clone().startOf("month").day("Sunday").add(1, 'd'),
            monthIndex = date.month(),
            count      = 0;



        while (!done) {
            weeks.push(
                <Week key={date.toString()}
                      date={date.clone()}
                      month={this.state.month}
                      select={this.select.bind(this)}
                      selected={this.state.selected}
                      startDate={this.props.startDate}
                      endDate={this.props.endDate}
                    />
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

                <div className="b-datepicker__body">
                    {this.renderWeeks()}
                </div>
                <div>
                    {this.state.selected}
                </div>
            </div>
        );
    }
}

export default Datepicker;
