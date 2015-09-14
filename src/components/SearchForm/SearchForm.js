import React, { PropTypes } from 'react';
import styles from './SearchForm.scss';
import withStyles from '../../decorators/withStyles';
import TabsNav from '../TabsNav';

@withStyles(styles) class SearchForm {


    render() {
        return (
            <section className="b-search-form">
                <div className="b-search-form__tabs">
                    <TabsNav/>
                </div>
                <div className="b-search-form__form">
                    <div className="b-search-form__actions">
                        <div className="b-search-form-action__location-from">
                            <div className="b-suggest">
                                Москва
                            </div>
                        </div>
                        <div className="b-search-form-action__location-to">
                            <div className="b-suggest">
                                Берлин
                            </div>
                        </div>
                        <div className="b-search-form-action__date-from">
                            <div className="b-suggest">
                                Туда
                            </div>
                        </div>
                        <div className="b-search-form-action__date-to">
                            <div className="b-suggest">
                                Обратно
                            </div>
                        </div>
                        <div className="b-search-form-action__people">
                            <div className="b-suggest">
                                2 человека, <span>эконом</span>
                            </div>
                        </div>
                        <div className="b-search-form-action__btn">
                            <span className="btn btn-green">
                                Найти
                            </span>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

}

export default SearchForm;
