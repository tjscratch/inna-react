import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import withViewport from '../../../decorators/withViewport';
import api from '../../../core/ApiClient';
import apiUrls from '../../../constants/ApiUrls.js';
import styles from './Suggest.scss';
import withStyles from '../../../decorators/withStyles';

import Overlay from '../../ui/Overlay';

@withViewport
@withStyles(styles) class Suggest extends React.Component {

    
    constructor(props) {
        super(props);
        this.state = {
            value: null,
            locationId: null,
            showSuggest: false,
            suggestListData: null
        };
    }

    onSetResult(data){
        if (this.props.setResult) {
            this.props.setResult(data)
        }
    }

    selectedSuggestItem(item) {
        //console.log('selectedSuggestItem')
        //console.log(item);
        this.onSetResult(item);
        this.setState({
            value: item.Name,
            locationId: item.Id
        })
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
            api.get(apiUrls.DictionaryHotel, requestParams)
                .then((data)=> {
                    this.setState({
                        suggestListData: data,
                        showSuggest: true
                    })
                });
        } else {
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
                        <li className="b-suggest-item" key={index}
                            onClick={this.selectedSuggestItem.bind(this, item)}
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
                        <div>
                            <input className="b-suggest__input" 
                                   type="text" 
                                   placeholder="suggest"
                                   onFocus={this.handleFocus.bind(this)}
                                   onBlur={this.handleBlur.bind(this)}
                                   onChange={this.handleChange.bind(this)}
                                   value={this.state.value}
                                />
                            {this.renderSuggestList()}
                        </div>
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
            <div className="b-suggest-container"
                 
                >
                <div className="b-suggest">
                    <input className="b-suggest__input" 
                           type="text" 
                           placeholder="suggest"
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

export default Suggest;
