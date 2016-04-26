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
                    <span className="b-nav__text">+7 495 742-1212</span>
                    <a className="b-nav__link" href="/about" onClick={Link.handleClick}>О компании</a>
                    <a className="b-nav__link" href="/contact" onClick={Link.handleClick}>Контакты</a>
                    <a className="b-nav__help b-help" href="https://inna.ru/#/help" title="Помощь" target="_blank">
                        <i className="b-help__icon" title="Помощь" alt="Помощь"></i>
                    </a>
                </div>
            </div>
        );
    }

}

export default Navigation;
