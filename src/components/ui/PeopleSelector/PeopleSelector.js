import React, { PropTypes } from 'react';
import moment from 'moment';
import styles from './PeopleSelector.scss';
import withStyles from '../../../decorators/withStyles';


@withStyles(styles) class PeopleSelector extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
        
        };
    }
    

    componentDidMount() {
        document.addEventListener('click', this.bodyClick.bind(this), false);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.bodyClick.bind(this), false);
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
        return (
            <div className="b-people-selector" onClick={this.stopPropagation.bind(this)}>
                <div className="b-suggest">
                    <input className="b-suggest__input" placeholder="5 негров, в багажнике" type="text"/>
                </div>
            </div>
        );
    }

}

export default PeopleSelector;
