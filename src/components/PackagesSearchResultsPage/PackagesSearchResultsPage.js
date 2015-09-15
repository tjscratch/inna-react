/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import styles from './PackagesSearchResultsPage.scss';
import withStyles from '../../decorators/withStyles';
import SearchForm from '../SearchForm';
import api from './../../core/ApiClient';

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
        this.getData();
    }

    getData() {
        function dateToApiDate(date) {
            if (date) {
                var parts = date.split('.');
                if (parts) {
                    parts = parts.reverse();
                }
                return parts.join('-');
            }
            return null;
        }

        let fromDateApi = dateToApiDate(this.props.routeParams.fromDate);
        let toDateApi = dateToApiDate(this.props.routeParams.toDate);
        let routeParams = this.props.routeParams;
        let url = `/Packages/SearchHotels?AddFilter=true&Adult=${routeParams.adultCount}&ArrivalId=${routeParams.toId}&DepartureId=${routeParams.fromId}&EndVoyageDate=${toDateApi}&StartVoyageDate=${fromDateApi}&TicketClass=${routeParams.flightClass}`;
        console.log('SearchHotels url', url);
        api.get(url).then((data)=> {
            console.log('SearchHotels data', data);
            this.setState({
                hotelsData: data
            });
        });
    }

    static contextTypes = {
        onSetTitle: PropTypes.func.isRequired
    };

    componentDidMount() {
        //
    }

    render() {
        let title = 'Инна-Тур - Динамические пакеты';
        this.context.onSetTitle(title);
        return (
            <section className="b-packages-results-page">
                <div className="b-packages-results-page__form">
                    <SearchForm data={this.formData}/>
                </div>
                <div className="b-packages-results-page__recommended-bundle">
                    <div className="b-recommended-bundle-bg">
                    </div>
                    <div className="b-recommended-bundle">
                        <div className="b-recommended-bundle__title">
                            Выбранный вариант
                        </div>
                        <div className="b-recommended-bundle__collapse">
                            Свернуть
                        </div>
                        <div className="b-recommended-bundle__content">
                            <div className="b-bundle-content">
                                <div className="b-bundle-content__avia">
                                    <div className="b-avia-card">
                                    </div>
                                </div>
                                <div className="b-bundle-content__dp">
                                    <div className="b-hotel-card">
                                    </div>
                                </div>
                                <div className="b-bundle-content__price">
                                    <div className="b-price-card">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="b-packages-results-page__filter">
                    фильтры
                </div>
                <div className="b-packages-results-page__results">
                    <div className="b-packages-results">
                        <div className="b-packages-results__content">
                            результаты
                        </div>
                        <div className="b-packages-results__info-block">
                            инфо блок
                        </div>
                    </div>
                </div>
            </section>
        );
    }

}

export default PackagesSearchResultsPage;
