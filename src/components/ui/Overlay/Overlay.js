'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';

var PropTypes = React.PropTypes;

var Overlay = null;
if (canUseDOM) {
    Overlay = React.createClass({
        displayName: 'Overlay',

        propTypes: {
            container: PropTypes.object,
            elementType: PropTypes.string
        },

        getDefaultProps: function getDefaultProps() {
            return {
                container: document.body,
                elementType: 'div'
            };
        },

        shouldComponentUpdate: function shouldComponentUpdate() {
            return false;
        },

        componentDidMount: function componentDidMount() {
            this.buildContainer();
            this.renderOverlay();
        },

        componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
            if (this.props.container !== nextProps.container) {
                this.removeContainer();
                this.buildContainer(nextProps);
            }
            this.renderOverlay(nextProps);
        },

        componentWillUnmount: function componentWillUnmount() {
            this.removeContainer();
        },

        buildContainer: function buildContainer(props) {
            var thisProps = props || this.props;
            this._overlayContainer = document.createElement(thisProps.elementType);
            this._overlayContainer.className = 'b-overlay';
            var container = thisProps.container;
            container.className += ' overlay-scroll-fix';
            console.log('overlay attach');
            container.appendChild(this._overlayContainer);
        },

        removeContainer: function removeContainer() {
            ReactDOM.unmountComponentAtNode(this._overlayContainer);
            this.props.container.removeChild(this._overlayContainer);
            this.props.container.className = this.props.container.className.replace(' overlay-scroll-fix', '');
            console.log('overlay detach');
            this._overlayContainer = null;
        },

        renderOverlay: function renderOverlay(props) {
            var thisProps = props || this.props;
            ReactDOM.render(React.Children.only(thisProps.children), this._overlayContainer);
        },

        render: function render() {
            return null;
        }
    });
}
else {
    Overlay = React.createClass({
        displayName: 'Overlay',

        render: function render() {
            return null;
        }
    });
}


export default Overlay;