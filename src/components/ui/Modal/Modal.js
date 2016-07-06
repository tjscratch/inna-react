'use strict';

import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {canUseDOM} from 'fbjs/lib/ExecutionEnvironment';
import withStyles from '../../../decorators/withStyles';

import styles from './Modal.scss';

@withStyles(styles)
class Modal extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    container: PropTypes.object,
    elementType: PropTypes.string,
    className: PropTypes.string,
    isOpen: PropTypes.func
  };

  static defaultProps = {
    container: canUseDOM ? document.body : null,
    elementType: 'div'
  };

  shouldComponentUpdate() {
    return false;
  }

  componentDidMount() {
    this.buildContainer();
    this.renderOverlay();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.container !== nextProps.container) {
      this.removeContainer();
      this.buildContainer(nextProps);
    }
    this.renderOverlay(nextProps);
  }

  componentWillUnmount() {
    this.removeContainer();
  }

  buildContainer(props) {
    var thisProps = props || this.props;
    var className = thisProps.className ? thisProps.className : '';
    this._overlayContainer = document.createElement(thisProps.elementType);
    this._overlayContainer.className = `Modal_Container ${className}`;
    var container = thisProps.container;
    container.className += ' ModalScrollFix';
    container.appendChild(this._overlayContainer);
  }

  removeContainer() {
    ReactDOM.unmountComponentAtNode(this._overlayContainer);
    this.props.container.removeChild(this._overlayContainer);
    this.props.container.className = this.props.container.className.replace(' ModalScrollFix', '');
    this._overlayContainer = null;
  }

  renderOverlay(props) {
    //var thisProps = props || this.props;
    //ReactDOM.render(React.Children.only(thisProps.children), this._overlayContainer);
    ReactDOM.render(this.renderChildren(props), this._overlayContainer);
  }

  closeModal(event){
    if(this.props.isOpen){
      this.props.isOpen(event);
    }
  }

  renderChildren(props) {
    var thisProps = props || this.props;
    return (
      <div className="Modal">
        <div className="Modal_Overlay" onClick={this.closeModal.bind(this)}></div>
        <div className="Modal_Body">
          {thisProps.children}
        </div>
      </div>
    )
  }

  render() {
    return null;
  }
}

export default Modal;
