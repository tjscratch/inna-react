import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import withViewport from '../../../decorators/withViewport';
import api from '../../../core/ApiClient';
import styles from './Suggest.scss';
import withStyles from '../../../decorators/withStyles';

import Overlay from '../../ui/Overlay';

@withViewport
@withStyles(styles) class SearchForm extends React.Component {

    constructor() {
        super();
        this.state = {
            showSuggest: false,
            value: null,
            suggestListData: null
        };
    }

    handleFocus(event) {
        this.setState({
            showSuggest: true
        });
    }

    handleBlur(event) {
        this.setState({
            showSuggest: true
        });
    }

    handleChange(event) {
        this.setState({
            value: event.target.value
        });
        if (event.target.value) {
            let requestParams = {term: event.target.value.trim()};
            api.get('/Dictionary/Hotel', requestParams)
                .then((data)=> {
                    this.setState({
                        suggestListData: data,
                        showSuggest: true
                    })
                });
        }else{
            this.setState({
                showSuggest: false
            });
        }
    }

    renderSuggestList() {
        return (
            <ul className="b-suggest__list">
                {this.state.suggestListData.map((item, index)=> {
                    return (
                        <li className="b-suggest__list-item" key={index}>
                            <span>{item.Name},</span>
                            <span>{item.CountryName}</span>
                            <span className="b-suggest__list-item__iata">{item.CodeIata}</span>
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
                        {this.renderSuggestList()}
                    </Overlay>
                )
            } else {
                return (
                    <div>
                        {this.renderSuggestList()}
                    </div>
                )
            }
        }
        return null;
    }

    render() {
        return (
            <div className="b-suggest-container">
                <div className="b-suggest">
                    <input className="b-suggest__input" type="text" placeholder="suggest" ref="input" key="input"
                           onFocus={this.handleFocus.bind(this)}
                           onBlur={this.handleBlur.bind(this)}
                           onChange={this.handleChange.bind(this)}
                           value={this.state.value}
                        />
                    {this.renderSuggest()}
                </div>
            </div>
        );
    }

}

export default SearchForm;
