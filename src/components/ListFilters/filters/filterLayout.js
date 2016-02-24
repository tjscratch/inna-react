import React, { PropTypes } from 'react';

class FilterLayout extends React.Component {

    constructor (props) {
        super(props);

        this.state = {
            open: false
        };

        this.clickFn = this.bodyClick.bind(this);
    }

    onToggle (event) {
        event.preventDefault();
        this.setState({
            open: !this.state.open
        })
    }

    componentDidMount () {
        document.addEventListener('click', this.clickFn, false);
    }

    componentWillUnmount () {
        document.removeEventListener('click', this.clickFn, false);
    }

    bodyClick (event) {
        this.setState({
            open: false
        })
    }

    stopPropagation (event) {
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
    }


    render () {
        return (
            <div className={`b-filter`} onClick={this.stopPropagation.bind(this)}>
                <div className='b-filter__label'
                     onClick={this.onToggle.bind(this)}>
                    {this.props.label}
                </div>
                <div className={`b-filter__body ${this.state.open ? 'open' : 'close'}`}>
                    {this.props.children}
                </div>
            </div>
        );
    }

}

export default FilterLayout;
