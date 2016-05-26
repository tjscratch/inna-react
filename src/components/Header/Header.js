/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React from 'react';
import styles from './Header.scss';
import withStyles from '../../decorators/withStyles';
import Navigation from '../Navigation';
import NavMobile from '../NavMobile';
import Logo from '../ui/Logo';

@withStyles(styles)
class Header extends React.Component {

  render() {
    return (
      <header className="header">
        <div className="b-header">
          <NavMobile className="b-header__nav-mobile"/>
          <div className="b-header__brand">
            <Logo/>
            {/**
            <a className="b-brand" href="/" onClick={Link.handleClick}>

              <img className="b-brand__img" src={require('./logo-small.png')} width="100" height="39" alt="Инна-Тур"/>
              <img className="b-brand__text" src={require('./innatour.png')} width="135" height="19" alt="Инна-Тур"/>
              <img className="b-brand__img-mobile" src={require('./inna-logo.png')} width="72" height="30"
                   alt="Инна-Тур"/>
            </a>
             **/}
          </div>
          <Navigation className="b-header__nav"/>
        </div>
      </header>
    );
  }

}

export default Header;
