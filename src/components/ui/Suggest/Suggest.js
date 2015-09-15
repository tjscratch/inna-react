import React, { PropTypes } from 'react';
import styles from './Suggest.scss';
import withStyles from '../../../decorators/withStyles';

@withStyles(styles) class SearchForm extends React.Component {


    render() {
        return (
            <div className="b-suggest-container">
                <div className="b-suggest">
                    <input className="b-suggest__input" type="text" placeholder="suggest"/>
                </div>
            </div>
        );
    }

}

export default SearchForm;
