/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React from 'react';
import styles from './Header.scss';
import withStyles from '../../decorators/withStyles';
import Link from '../Link';
import Navigation from '../Navigation';
import NavMobile from '../NavMobile';
import withViewport from '../../decorators/withViewport';

@withViewport
@withStyles(styles) class Header extends React.Component {

    render() {
        //let { width, height } = this.props.viewport;
        //this.renderCss(`.header-viewport:after {content:' ${width}x${height}';}`);

        return (
            <header className="header">
                <div className="b-header">
                    <NavMobile className="b-header__nav-mobile"/>
                    <div className="b-header__brand">
                        <a className="b-brand" href="/" onClick={Link.handleClick}>
                            <span className="b-brand__text">Ростур</span>
                        </a>
                    </div>
                    <Navigation className="b-header__nav"/>
                </div>
            </header>
        );
    }

}

export default Header;
