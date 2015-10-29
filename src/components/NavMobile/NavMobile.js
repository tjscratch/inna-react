/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import classNames from 'classnames';
import styles from './NavMobile.scss';
import withStyles from '../../decorators/withStyles';
import Link from '../Link';

@withStyles(styles) class NavMobile {

    static propTypes = {
        className: PropTypes.string
    };

    menuOpen(event) {
        event.preventDefault();
        alert('menu open');
    }

    render() {
        return (
            <div className={this.props.className} role="navigation">
                <div className="b-nav-mobile" role="navigation">
                    <a className="b-nav-mobile-menu icon-emb-menu" href="javascript:void(0);"
                       onClick={this.menuOpen}></a>
                </div>
            </div>
        );
    }

}

export default NavMobile;
