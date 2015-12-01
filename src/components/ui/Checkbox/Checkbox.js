import React, { PropTypes, Component } from 'react';
import styles from './Checkbox.scss';
import withStyles from '../../../decorators/withStyles';

@withStyles(styles) class Checkbox extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <label className="ui-checkbox">
                <input className="ui-checkbox__input" name="roaming" type="checkbox"/>
                <span className="ui-checkbox__checkbox icon-emb-ok"></span>
                <span className="ui-checkbox__label">{this.props.text}</span>
            </label>
        );
    }

}

export default Checkbox;
