import React, { PropTypes, Component } from 'react';
import styles from './Checkbox.scss';
import withStyles from '../../../decorators/withStyles';

@withStyles(styles) class Checkbox extends Component {
    constructor(props) {
        super(props);
    }

    checkboxChange(event){
        console.log(event.target)
        console.log(event.target.checked)
    }

    render() {
        var { text, children, align } = this.props;

        var classValue = 'ui-checkbox';
        if (align == 'top') {
            classValue += ' ui-checkbox_align-top';
        }

        return (
            <label className={classValue}>
                <input className="ui-checkbox__input" name="roaming" type="checkbox" onChange={this.checkboxChange.bind(this)}/>
                <span className="ui-checkbox__checkbox icon-emb-ok"></span>
                {
                    text ?
                        <span className="ui-checkbox__label">{text}</span>
                        :
                        <span className="ui-checkbox__label">{children}</span>
                }
            </label>
        );
    }

}

export default Checkbox;
