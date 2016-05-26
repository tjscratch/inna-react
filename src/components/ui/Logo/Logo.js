import React from 'react'
import Link from '../../Link';
import withStyles from '../../../decorators/withStyles';
import styles from './Logo.scss'

@withStyles(styles)
class Logo extends React.Component {
  render() {
    return (
      <a className="Logo" href="/" onClick={Link.handleClick}></a>
    );
  }
}

export default Logo;
