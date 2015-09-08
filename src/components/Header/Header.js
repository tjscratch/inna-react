/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React from 'react';
import styles from './Header.css';
import withStyles from '../../decorators/withStyles';
import Link from '../Link';
import Navigation from '../Navigation';

@withStyles(styles) class Header {

    render() {
        return (
            <div className="header">
                <div className="header-container">
                    <a className="header-brand" href="/" onClick={Link.handleClick}>
                        <img className="header-brand__brand-img" src={require('./logo-small.png')} width="100" height="39"
                             alt="Инна-Тур"/>
                        <img className="header-brand__brand-text" src={require('./innatour.png')} width="135" height="19"
                             alt="Инна-Тур"/>
                    </a>
                    <Navigation className="header-nav"/>
                </div>
            </div>
        );
    }

}

export default Header;
