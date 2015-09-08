/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import classNames from 'classnames';
import styles from './Navigation.css';
import withStyles from '../../decorators/withStyles';
import Link from '../Link';

@withStyles(styles) class Navigation {

    static propTypes = {
        className: PropTypes.string
    };

    render() {
        return (
            <div className={classNames(this.props.className, 'navigation')} role="navigation">
                <span className="navigation-text">+7 495 742-1212</span>
                <a className="navigation-link" href="/about" onClick={Link.handleClick}>Где купить</a>
                <a className="navigation-link" href="/contact" onClick={Link.handleClick}>Агентствам</a>
            </div>
        );
    }

}

export default Navigation;
