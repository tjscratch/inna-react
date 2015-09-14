import React, { PropTypes } from 'react';
import styles from './SearchForm.scss';
import withStyles from '../../decorators/withStyles';

@withStyles(styles) class SearchForm {


    render() {
        return (
            <section className="b-search-form">
                <div className="b-search-form__tabs">
                    <div className="b-tabs">
                        <a href="#" className="b-tabs__item b-tabs__item_active">Перелет + отель</a>
                        <a href="#" className="b-tabs__item">Авиабилеты</a>
                    </div>
                </div>
                <div className="b-search-form__actions">
                    <div className="b-search-form-action__location-from">
                        <div className="b-suggest">
                        </div>
                    </div>
                    <div className="b-search-form-action__location-to">
                        <div className="b-suggest">
                        </div>
                    </div>
                </div>
            </section>
        );
    }

}

export default SearchForm;
