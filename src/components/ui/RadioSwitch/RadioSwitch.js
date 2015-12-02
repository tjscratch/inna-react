import React, { PropTypes, Component } from 'react';
import styles from './RadioSwitch.scss';
import withStyles from '../../../decorators/withStyles';

@withStyles(styles) class RadioSwitch extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var { lbl1, lbl2 } = this.props;

        return (
            <ul className="b-radio-switch">
                <li>
                    <label>
                        <input type="radio" name="male3"/>
                        <ins className="radio">{lbl1}</ins>
                    </label>
                </li>
                <li>
                    <label>
                        <input type="radio" name="male3"/>
                        <ins className="radio">{lbl2}</ins>
                    </label>
                </li>
            </ul>
        );
    }

}

export default RadioSwitch;
