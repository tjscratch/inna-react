/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import classNames from 'classnames';
import styles from './Navigation.scss';
import withStyles from '../../decorators/withStyles';
import Link from '../Link';

@withStyles(styles) class Navigation extends React.Component {

    static propTypes = {
        className: PropTypes.string
    };

    render() {
        return (
            <div className={this.props.className} role="navigation">
                <div className="b-nav" role="navigation">
                    <a className="b-nav__link" href="http://book.inna.ru/?ch=newsite&utm_source=agency&utm_medium=link&utm_campaign=bookinna" target="_blank">О проекте</a>
                </div>
            </div>
        );
    }

}

export default Navigation;
