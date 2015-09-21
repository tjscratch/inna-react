import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import withViewport from '../../../decorators/withViewport';
import api from '../../../core/ApiClient';
import apiUrls from '../../../constants/ApiUrls.js';
import styles from './Suggest.scss';
import withStyles from '../../../decorators/withStyles';

import Overlay from '../../ui/Overlay';
import SuggestOptions from './SuggestOptions';

@withViewport
@withStyles(styles) class Suggest extends React.Component {

    
    constructor(props) {
        super(props);
        this.state = {
            value: null,
            showSuggest: false,
            suggestListData: null
        };
    }

    onSetLocation(item) {
        this.onSetResult(item);
        this.setState({
            value: item.Name
        })
    }

    onSetResult(data){
        if (this.props.setResult) {
            this.props.setResult(data)
        }
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
                    this.refs.suggestOptions.setData(data);
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

    renderSuggest() {
        if (this.state.showSuggest) {
            if (this.props.viewport.width < 1100) {
                return (
                    <Overlay>
                        <input className="b-suggest__input"
                               type="text"
                               placeholder="suggest"
                               onFocus={this.handleFocus.bind(this)}
                               onBlur={this.handleBlur.bind(this)}
                               onChange={this.handleChange.bind(this)}
                               value={this.state.value}
                            />
                        <SuggestOptions ref="suggestOptions" data={this.state.suggestListData}/>
                    </Overlay>
                )
            } else {
                return (
                    <SuggestOptions ref="suggestOptions" setLocation={this.onSetLocation.bind(this)} data={this.state.suggestListData}/>
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
