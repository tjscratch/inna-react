import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import withViewport from '../../../decorators/withViewport';
import api from '../../../core/ApiClient';
import apiUrls from '../../../constants/ApiUrls.js';
import styles from './Suggest.scss';
import withStyles from '../../../decorators/withStyles';

import Overlay from '../../ui/Overlay';
import SuggestModel from './SuggestModel';

@withViewport
@withStyles(styles) class Suggest extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            placeholder: props.data.placeholder,
            setCurrentLocation: props.data.setCurrentLocation,
            value: props.data.data ? `${props.data.data.Name}, ${props.data.data.CountryName}` : null,
            options: [],
            showSuggest: false,
            optionCounter: 0,
            onBlurDisabled: false,
            focus: false
        };
        this.setOptions = _.debounce(
            this.setOptions, 300,
            {
                'leading': true,
                'trailing': true
            });
    }


    setShowSuggest(stateSuggest) {
        if (this.state.options.length > 0) {
            this.setState({
                showSuggest: stateSuggest
            });
        }
    }


    handleFocus() {
        this.setShowSuggest(true);
        this.setState({
            focus: true
        });
    }


    handleBlur() {
        if (this.state.onBlurDisabled) {
            this.setShowSuggest(true);
        } else {
            this.setShowSuggest(false);
            this.setState({
                focus: false
            });
        }
    }

    handleOptionHover(event) {
        if (event.type == "mouseenter") {
            this.setState({
                onBlurDisabled: true
            });
        }
        if (event.type == "mouseleave") {
            this.setState({
                onBlurDisabled: false
            });
        }
    }

    handleChange(event) {
        let user_input = event.target.value;

        this.setState({
            value: user_input
        });
        if (user_input) {
            this.setOptions(user_input);
        }
    }


    setOptions(text) {
        SuggestModel.getSuggest(text)
            .then((data)=> {
                this.setState({
                    options: SuggestModel.focusOptionItem(data, 0)
                })
                this.setShowSuggest(true);
            })
    }


    onSetResult(data) {
        if (this.props.setResult) {
            this.props.setResult(data)
        }
    }

    handleOptionClick(item) {
        this.selectedOption(item);
    }

    onKeyDown(event) {
        let options = this.state.options;
        if (event.keyCode == 13) {
            var item = this.state.options[this.state.optionCounter];
            this.selectedOption(item);
        } else {
            let counter = SuggestModel.selectedKeyDown(this.state.optionCounter, options, event.keyCode);
            this.setState({
                options: SuggestModel.focusOptionItem(options, counter),
                optionCounter: counter
            });
        }
    }

    selectedOption(item) {
        this.onSetResult(item);
        this.setState({
            value: `${item.Name}, ${item.CountryName}`,
            focus: false
        });
        this.setShowSuggest(false);
    }


    componentDidMount() {
        if (this.state.setCurrentLocation) {
            SuggestModel.setCurrentLocation()
                .then((data)=> {
                    this.selectedOption(data);
                })
        }
    }

    componentDidUpdate() {
        var input;
        if (this.props.viewport.width < 1100) {
            input = ReactDOM.findDOMNode(this.refs.inputOverlay);
        } else {
            input = ReactDOM.findDOMNode(this.refs.inputBase);
        }
        if (input && this.state.focus) {
            input.focus();
            input.setSelectionRange(input.value.length, input.value.length);
        }
    }


    renderSuggestOptions() {
        return (
            <ul className="b-suggest-list"
                onMouseEnter={this.handleOptionHover.bind(this)}
                onMouseLeave={this.handleOptionHover.bind(this)}
                >
                {this.state.options.map((item, index)=> {
                    return (
                        <li className={`b-suggest-item ${item.selected ? 'b-suggest-item_selected' : ''}`}
                            key={index}
                            onClick={this.handleOptionClick.bind(this, item)}
                            >
                            <span className="b-suggest-item__city-name">{item.Name}</span>,
                            <span className="b-suggest-item__country-name">{item.CountryName}</span>
                            <span className="b-suggest-item__iata">{item.CodeIata}</span>
                        </li>
                    );
                }, this)}
            </ul>
        );
    }


    renderSuggest() {
        if (this.state.showSuggest) {
            if (this.props.viewport.width < 1100) {
                return (
                    <Overlay>
                        <div className="b-suggest-overlay">
                            <div className="b-suggest-overlay__close icon-emb-cancel"
                                 onClick={this.setShowSuggest.bind(this, false)}
                                ></div>
                            <input className={`b-suggest__input ${this.state.showSuggest ? "b-suggest__input_focus b-suggest__input_overlay" : ""}`}
                                   type="text"
                                   placeholder={this.state.placeholder}
                                   onFocus={this.handleFocus.bind(this)}
                                   onBlur={this.handleBlur.bind(this)}
                                   onChange={this.handleChange.bind(this)}
                                   onKeyDown={this.onKeyDown.bind(this)}
                                   value={this.state.value}
                                   ref="inputOverlay"
                                />
                            {this.renderSuggestOptions()}
                        </div>
                    </Overlay>
                );
            } else {
                return (
                    <div className="b-suggest__options">
                        {this.renderSuggestOptions()}
                    </div>
                );
            }
        }
        return null;
    }

    render() {
        return (
            <div className="b-suggest">
                <input className={`b-suggest__input ${this.state.showSuggest ? "b-suggest__input_focus" : ""}`}
                       type="text"
                       placeholder={this.state.placeholder}
                       onFocus={this.handleFocus.bind(this)}
                       onBlur={this.handleBlur.bind(this)}
                       onChange={this.handleChange.bind(this)}
                       onKeyDown={this.onKeyDown.bind(this)}
                       value={this.state.value}
                       ref="inputBase"
                    />
                {this.renderSuggest()}
            </div>
        );
    }

}

export default Suggest;
