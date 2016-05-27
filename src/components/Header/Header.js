/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React from 'react';
import styles from './Header.scss';
import withStyles from '../../decorators/withStyles';
import withScroll from '../../decorators/withScroll';
import Navigation from '../Navigation';
import NavMobile from '../NavMobile';
import Logo from '../ui/Logo';

@withScroll
@withStyles(styles)
class Header extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    let scrollTop = this.props.viewportScroll.top;
    if (scrollTop > 100 && scrollTop < 500) {
      if (this.props.viewportScroll.scrollDown) {
        var scrollHead = 'b-header__hideDown';
      }
      if (this.props.viewportScroll.scrollUp) {
        var scrollHead = 'b-header__hideUp';
      }
    }
    if (scrollTop > 500) {
      if (this.props.viewportScroll.scrollDown) {
        var scrollHead = 'b-header__ScrollDown';
      }
      if (this.props.viewportScroll.scrollUp) {
        var scrollHead = 'b-header__ScrollUp';
      }
    }
    
    return (
      <header className="header">
        <div className={`b-header__container ${scrollHead}`}>
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
        </div>
      </header>
    );
  }
  
}

export default Header;
