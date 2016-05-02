import React, { PropTypes, Component } from 'react';
import styles from './Btn.scss';
import withStyles from '../../../decorators/withStyles';


/**
 * todo заменить кнопку поиска в форме поиска на этот компонент
 */
@withStyles(styles)
class Btn extends Component {
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
        let ButtonClass = this.props.className ? this.props.className : 'btn-green';
        let BtnSmall = this.props.small ? 'btn-small' : null;
        if (children) {
            return (
                <span className={`btn ${ButtonClass} ${BtnSmall}`} onClick={this.thisOnClick.bind(this)}>
                    {children}
                </span>
            );
        }

    }

}

export default Btn;
