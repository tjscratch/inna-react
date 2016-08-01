/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { Component } from 'react';
import styles from './Header.scss';
import withStyles from '../../decorators/withStyles';
import withScroll from '../../decorators/withViewportScroll';
import Navigation from '../Navigation';
import NavMobile from '../NavMobile';
import Logo from '../ui/Logo';

@withScroll
@withStyles(styles)
class Header extends Component {
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
      <header className={`container__Header ${scrollHead ? scrollHead : ''}`}>
          <div className="Header">
            <Logo className="Header__logo"/>
            <NavMobile className="Header__nav-mobile"/>
            <div className="Header__nav-container">
              <div className="nav">
                <Navigation />
              </div>
            </div>
            <div className="Header__info-container">
              <div className="info">
                <Logo className="info__logo"/>
                <div className="info_tel-login">
                  <div className="tel">
                    <span className="tel__icon icon-emb-phone"></span>
                    <span className="tel__number-time">
                      <span className="number">+7 495 742-1212</span><br/>
                      <span className="time">круглосуточно</span>
                    </span>
                  </div>
                  <div className="login">
                    <span className="login__icon"></span>
                    <span className="login__btn">Вход</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </header>
    );
  }

}

export default Header;
