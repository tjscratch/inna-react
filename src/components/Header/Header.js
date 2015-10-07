/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React from 'react';
import styles from './Header.scss';
import withStyles from '../../decorators/withStyles';
import Link from '../Link';
import Navigation from '../Navigation';
import NavMobile from '../NavMobile';
import withViewport from '../../decorators/withViewport';

@withViewport
@withStyles(styles) class Header {

    render() {
        let { width, height } = this.props.viewport;

        return (
            <header className="header">
                <span ref="viewport" className="header-viewport">Viewport: {`${width}x${height}`}</span>
                <div className="b-header">
                    <NavMobile className="b-header__nav-mobile"/>
                    <div className="b-header__brand">
                        <a className="b-brand" href="/" onClick={Link.handleClick}>
                            <img className="b-brand__img" src={require('./logo-small.png')} width="100" height="39" alt="Инна-Тур"/>
                            <img className="b-brand__text" src={require('./innatour.png')} width="135" height="19" alt="Инна-Тур"/>
                            <img className="b-brand__img-mobile" src={require('./inna-logo.png')} width="72" height="30" alt="Инна-Тур"/>
                        </a>
                    </div>
                    <Navigation className="b-header__nav"/>
                </div>
            </header>
        );
    }

}

export default Header;
