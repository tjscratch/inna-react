/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React from 'react';
import styles from './Header.scss';
import withStyles from '../../decorators/withStyles';
import withScroll from '../../decorators/withViewportScroll';
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
            <Logo className="b-header__logo"/>
            <Navigation className="b-header__nav"/>
          </div>
        </div>
      </header>
    );
  }

}

export default Header;
