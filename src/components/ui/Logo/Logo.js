import React, {PropTypes} from 'react';
import Link from '../../Link';
import withStyles from '../../../decorators/withStyles';
import styles from './Logo.scss'

@withStyles(styles)
class Logo extends React.Component {
  static propTypes = {
    className: PropTypes.string
  };

  render() {
    return (
      <div className={this.props.className}>
        <a className="Logo" href="/" onClick={Link.handleClick}></a>
      </div>
    );
  }
}

export default Logo;
