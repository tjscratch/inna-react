/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import styles from './PackagesSearchResultsPage.scss';
import withStyles from '../../decorators/withStyles';

@withStyles(styles)
class PackagesSearchResultsPage {

    static contextTypes = {
        onSetTitle: PropTypes.func.isRequired
    };

    render() {
        let title = 'Инна-Тур - Динамические пакеты';
        this.context.onSetTitle(title);
        return (
            <section className="b-packages-results-page">
                {title}
                <div className="b-packages-results-page__form"></div>
                <div className="b-packages-results-page__recommended-bundle"></div>
                <div className="b-packages-results-page__filter"></div>
                <div className="b-packages-results-page__results"></div>
                <div className="b-packages-results-page__right-info-block"></div>
            </section>
        );
    }

}

export default PackagesSearchResultsPage;
