/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React from 'react'; // eslint-disable-line no-unused-vars
import EventEmitter from 'eventemitter3';
import {canUseDOM} from 'fbjs/lib/ExecutionEnvironment';

let EE;
let viewportScroll = {scrollX: 0, scrollY: 0};
const SCROLL_EVENT = 'scroll';

function handleWindowScroll() {
  if (viewportScroll.scrollX !== window.scrollX || viewportScroll.scrollY !== window.scrollY) {
    viewportScroll = {
      scrollX: window.scrollX,
      scrollY: window.scrollY
    };
    EE.emit(SCROLL_EVENT, viewportScroll);
  }
}

function withViewport(ComposedComponent) {
  return class WithViewport extends React.Component {
    
    constructor() {
      super();
      
      this.state = {
        viewportScroll: canUseDOM ? {
          scrollX: window.scrollX,
          scrollY: window.scrollY
        } : viewportScroll
      };
    }
    
    componentDidMount() {
      if (!EE) {
        EE = new EventEmitter();
        window.addEventListener('scroll', handleWindowScroll);
      }
      EE.on(SCROLL_EVENT, this.handleResize, this);
    }
    
    componentWillUnmount() {
      EE.removeListener(SCROLL_EVENT, this.handleResize, this);
      if (!EE.listeners(SCROLL_EVENT, true)) {
        window.removeEventListener('scroll', handleWindowScroll);
        EE = null;
      }
    }
    
    render() {
      return <ComposedComponent {...this.props} viewportScroll={this.state.viewportScroll}/>;
    }
    
    handleResize(value) {
      this.setState({viewportScroll: value}); // eslint-disable-line react/no-set-state
    }
    
  };
}

export default withViewport;
