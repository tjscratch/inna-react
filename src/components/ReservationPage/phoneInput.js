import React, { PropTypes, Component } from 'react';


class phoneInput extends Component {
    constructor(props) {
        super(props);
    }

    handleChange(e) {

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

export default phoneInput;
