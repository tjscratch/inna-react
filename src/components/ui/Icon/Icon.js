import React, {PropTypes} from 'react';
import withStyles from '../../../decorators/withStyles';
import styles from './Icon.scss'

@withStyles(styles)
class Icon extends React.Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
    size: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    style: PropTypes.object
  };

  static defaultProps = {
    size: 24
  }

  _mergeStyles(...args) {
    return Object.assign({}, ...args);
  }

  renderGraphic() {
    switch (this.props.name) {
      case 'ArrowRight':
        return (
          <polygon
            points="10 3.33333333 8.83333333 4.5 13.5 9.16666667 3.33333333 9.16666667 3.33333333 10.8333333 13.5 10.8333333 8.83333333 15.5 10 16.6666667 16.6666667 10"></polygon>
        );
      case 'Back':
        return (
          <polygon points="15.4 7.4 14 6 8 12 14 18 15.4 16.6 10.8 12"></polygon>
        );
    }
  }

  render() {
    let styles = {
      fill: "currentcolor",
      verticalAlign: "middle",
      width: this.props.size,
      height: this.props.size
    };
    let iconClass = this.props.className ? ` ${this.props.className}` : '';
    return (
      <div className={`Icon${iconClass}`}>
        <svg viewBox={`0 0 24 24`} preserveAspectRatio="xMidYMid meet" fit
             style={this._mergeStyles(styles,this.props.style)}>
          {this.renderGraphic()}
        </svg>
      </div>
    );
  }

}

export default Icon;
