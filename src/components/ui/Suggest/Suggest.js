import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import withViewport from '../../../decorators/withViewport';
import styles from './Suggest.scss';
import withStyles from '../../../decorators/withStyles';

import Overlay from '../../ui/Overlay';

@withViewport
@withStyles(styles) class SearchForm extends React.Component {

    constructor() {
        super();
        this.state = {
            showOverlay: false,
            value: 't'
        };
    }

    handleFocus(event) {
        //если узкий ViewPort - то в оверлее
        //if (this.props.viewport.width < 500) {
            this.setState({
                showOverlay: true
            });
        //}
    }

    handleBlur(event) {
        this.setState({
            showOverlay: false
        });
    }

    handleChange(event) {
        this.setState({
            value: event.target.value
        });

        //console.log(this.props.viewport);
        //document.body.style.height = this.props.viewport.height;
    }

    renderOverlaySuggest() {
        if (this.state.showOverlay) {
            return (
                <Overlay>
                    <ul className="b-suggest__list b-suggest__list_overlay">
                        <li className="b-suggest__list-item">Москва</li>
                        <li className="b-suggest__list-item">Барселона</li>
                        <li className="b-suggest__list-item">Москва</li>
                        <li className="b-suggest__list-item">Барселона</li>
                        <li className="b-suggest__list-item">Москва</li>
                        <li className="b-suggest__list-item">Барселона</li>
                    </ul>
                </Overlay>
            )
        }

        return null;
    }

    render() {
        return (
            <div className="b-suggest-container">
                {this.renderOverlaySuggest()}
                <div className="b-suggest">
                    <input className="b-suggest__input" type="text" placeholder="suggest" ref="input" key="input"
                           onFocus={this.handleFocus.bind(this)}
                           onBlur={this.handleBlur.bind(this)}
                           onChange={this.handleChange.bind(this)}
                           value={this.state.value}
                        />
                </div>
            </div>
        );
    }

}

export default SearchForm;
