/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React from 'react';
import styles from './Header.css';
import withStyles from '../../decorators/withStyles';
import Link from '../Link';
import Navigation from '../Navigation';

@withStyles(styles) class Header {

    render() {
        return (
            <header className="header">
                <div className="b-header">
                    <div className="b-header__brand">
                        <a className="b-brand" href="/" onClick={Link.handleClick}>
                            <img className="b-brand__img" src={require('./logo-small.png')} width="100" height="39" alt="Инна-Тур"/>
                            <img className="b-brand__text" src={require('./innatour.png')} width="135" height="19" alt="Инна-Тур"/>
                        </a>
                    </div>
                    <Navigation className="b-header__nav"/>
                </div>
            </header>
        );
    }

}

export default Header;
