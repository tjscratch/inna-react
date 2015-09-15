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
            value: 't'
        };
    }

    
    handleChange(event) {
        this.setState({
            value: event.target.value
        });
        //console.log(withViewport());
        //console.log(this.state);
        //console.log(this.props);
        //console.log(this.props.viewport);
        //this.node = document.createElement('div');
        //this.node.className = 'b-overlay';
        //document.body.style.height = this.props.viewport.height;
        //document.body.appendChild(this.node);
        //document.body.className += 'overlay-scroll-fix';

        let content = (
            <ul className="b-suggest__list b-suggest__list_overlay">
                <li className="b-suggest__list-item">Москва</li>
                <li className="b-suggest__list-item">Барселона</li>
                <li className="b-suggest__list-item">Москва</li>
                <li className="b-suggest__list-item">Барселона</li>
                <li className="b-suggest__list-item">Москва</li>
                <li className="b-suggest__list-item">Барселона</li>
            </ul>
        );
        
        //<Overlay content={content}/>;
        //console.log('overlay', overlay);
        //Overlay.show(content);
        Overlay.show(content);

        //ReactDOM.render(
        //    overlay,
        //    this.node
        //);
    }

    renderSuggestList() {
        if (this.state.value) {
            return (
                <ul className="b-suggest__list">
                    <Overlay/>
                    <li className="b-suggest__list-item">Москва</li>
                    <li className="b-suggest__list-item">Барселона</li>
                    <li className="b-suggest__list-item">Москва</li>
                    <li className="b-suggest__list-item">Барселона</li>
                    <li className="b-suggest__list-item">Москва</li>
                    <li className="b-suggest__list-item">Барселона</li>
                </ul>
            )
        } else {
            return null;
        }
    }

    render() {
        return (
            <div className="b-suggest-container">
                <div className="b-suggest">
                    <input className="b-suggest__input" type="text" placeholder="suggest" ref="input" key="input"
                           onChange={this.handleChange.bind(this)}
                           value={this.state.value}
                        />
                </div>
            </div>
        );
    }

}

export default SearchForm;
