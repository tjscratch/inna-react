import React, { PropTypes, Component } from 'react';
import styles from './RadioSwitch.scss';
import withStyles from '../../../decorators/withStyles';

@withStyles(styles) class RadioSwitch extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var { lbl1, lbl2, val1, val2, selected, formField } = this.props;

        var inp1Checked = formField ? formField.value === val1 : selected == val1;
        var inp2Checked = formField ? formField.value === val2 : selected == val2;

        //console.log('inp1Checked', inp1Checked, 'inp2Checked', inp2Checked);

        return (
            <ul className="b-radio-switch">
                <li>
                    <label>
                        <input type="radio" {...formField} value={val1} checked={inp1Checked}/>
                        <ins className="radio">{lbl1}</ins>
                    </label>
                </li>
                <li>
                    <label>
                        <input type="radio" {...formField} value={val2} checked={inp2Checked}/>
                        <ins className="radio">{lbl2}</ins>
                    </label>
                </li>
            </ul>
        );
    }

}

export default RadioSwitch;
