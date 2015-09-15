/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import styles from './PackagesSearchResultsPage.scss';
import withStyles from '../../decorators/withStyles';
import SearchForm from '../SearchForm';

@withStyles(styles) class PackagesSearchResultsPage extends React.Component {
    constructor(props) {
        super(props);

        let data = props.data;
        let routeParams = props.routeParams;

        this.formData = {
            from: data[0],
            to: data[1],
            ...routeParams
        };

        //console.log('this.formData', this.formData);
    }

    static contextTypes = {
        onSetTitle: PropTypes.func.isRequired
    };

    render() {
        let title = 'Инна-Тур - Динамические пакеты';
        this.context.onSetTitle(title);
        return (
            <section className="b-packages-results-page">
                <div className="b-packages-results-page__form">
                    <SearchForm data={this.formData} />
                </div>
                <div className="b-packages-results-page__recommended-bundle">
                    результаты
                </div>
                <div className="b-packages-results-page__filter"></div>
                <div className="b-packages-results-page__results"></div>
                <div className="b-packages-results-page__right-info-block"></div>
            </section>
        );
    }

}

export default PackagesSearchResultsPage;
