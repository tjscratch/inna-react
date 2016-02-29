import React, { PropTypes, Component } from 'react';
import styles from './ButtonSecondary.scss';
import withStyles from '../../../../decorators/withStyles';

@withStyles(styles)
class ButtonSecondary extends Component {
    constructor (props) {
        super(props);
    }

    thisOnClick (e) {
        e.preventDefault();

        var { onClick } = this.props;

        if (onClick) {
            onClick(e);
        }
    }

    render () {
        let children = this.props.children;
        let ButtonClass = this.props.ButtonType == 'Link' ? 'ButtonSecondary__link' : 'ButtonSecondary__button';
        if (children) {
            return (
                <div className={`ButtonSecondary ${ButtonClass}`} onClick={this.thisOnClick.bind(this)}>
                    {children}
                </div>
            );
        }

    }

}

export default ButtonSecondary;
