'use strict';

import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import withStyles from '../../../decorators/withStyles';

import styles from './Overlay.scss';

@withStyles(styles) class Overlay extends React.Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        container: PropTypes.object,
        elementType: PropTypes.string,
        className: PropTypes.string
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
        this._overlayContainer = document.createElement(thisProps.elementType);
        this._overlayContainer.className = `b-overlay ${thisProps.className}`;
        var container = thisProps.container;
        container.className += ' overlay-scroll-fix';
        container.appendChild(this._overlayContainer);
    }

    removeContainer() {
        ReactDOM.unmountComponentAtNode(this._overlayContainer);
        this.props.container.removeChild(this._overlayContainer);
        this.props.container.className = this.props.container.className.replace(' overlay-scroll-fix', '');
        this._overlayContainer = null;
    }

    renderOverlay(props) {
        var thisProps = props || this.props;
        ReactDOM.render(React.Children.only(thisProps.children), this._overlayContainer);
    }

    render() {
        return null;
    }
}

export default Overlay;
