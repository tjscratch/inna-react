import React, { PropTypes, Component } from 'react';

import { transliterateAndToUpper } from '../../../helpers/inputHelper';

class upperInput extends Component {
    constructor(props) {
        super(props);
    }

    handleChange(e) {
        var { field } = this.props;
        if (e && e.target.value) {
            e.target.value = transliterateAndToUpper(e.target.value);
        }
        //console.log('field', field);
        field.onChange(e.target.value);
    }

    render() {
        var { field, className, type, placeholder } = this.props;

        var copyField = {
            ...field
        };
        delete copyField.onChange;

        var props = this.props;
        var copyProps = {
            ...props
        };
        delete copyProps.field;

        //оборачиваем onChange
        return (
            <input {...copyProps} {...copyField}
                   onChange={(e)=>this.handleChange(e)}
                />
        );
    }

}

export default upperInput;
