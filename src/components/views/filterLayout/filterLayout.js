import React, { PropTypes } from 'react';

class FilterLayout extends React.Component {

    constructor (props) {
        super(props);
        this.clickFn = this.bodyClick.bind(this);
    }

    onToggle (event) {
        event.preventDefault();
        this.props.toggle(this.props.index)
    }

    componentDidMount () {
        document.addEventListener('click', this.clickFn, false);
    }

    componentWillUnmount () {
        document.removeEventListener('click', this.clickFn, false);
    }

    bodyClick (event) {
        this.props.toggle('allClose')
    }

    stopPropagation (event) {
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
    }


    render () {
        let selected = this.props.selected ? 'b-filter_selected' : null;
        return (
            <div className={`b-filter ${selected}`} onClick={this.stopPropagation.bind(this)}>
                <div className='b-filter__label'
                     onClick={this.onToggle.bind(this)}>
                    {this.props.label}
                </div>
                <div className={`b-filter__body ${this.props.open ? 'open' : 'close'}`}>
                    {this.props.children}
                </div>
            </div>
        );
    }

}

export default FilterLayout;
