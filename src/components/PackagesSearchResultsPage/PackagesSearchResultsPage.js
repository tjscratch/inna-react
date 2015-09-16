/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import styles from './PackagesSearchResultsPage.scss';
import withStyles from '../../decorators/withStyles';
import SearchForm from '../SearchForm';
import api from './../../core/ApiClient';

import RecommendedBundle from '../RecommendedBundle';
import { routeDateToApiDate } from '../../core/DateHelper.js'

//let Overlay = require('../my.overlay.js');

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

        this.state = {
            hotelsData: null
        };

        //console.log('this.formData', this.formData);
        this.getData();
    }

    getData() {
        let fromDateApi = routeDateToApiDate(this.props.routeParams.fromDate);
        let toDateApi = routeDateToApiDate(this.props.routeParams.toDate);
        let routeParams = this.props.routeParams;

        let url = '/Packages/SearchHotels';
        let params = {
            AddFilter: 'true',
            Adult: routeParams.adultCount,
            ArrivalId: routeParams.toId,
            DepartureId: routeParams.fromId,
            EndVoyageDate: toDateApi,
            StartVoyageDate: fromDateApi,
            TicketClass: routeParams.flightClass
        };
        
        api.get(url, params).then((data)=> {
            console.log('SearchHotels data', data);
            this.setState({
                hotelsData: data,
                recommendedData: data.RecommendedPair
            });
        });
    }

    static contextTypes = {
        onSetTitle: PropTypes.func.isRequired
    };

    componentDidMount() {
        //
    }

    renderOverlay() {
        //if (this.state.hotelsData == null) {
        //    return (
        //        <Overlay>
        //            <div>тут мой оверлей</div>
        //        </Overlay>
        //    );
        //}

        return null;
    }

    render() {
        let title = 'Инна-Тур - Динамические пакеты';
        this.context.onSetTitle(title);
        return (
            <section className="b-packages-results-page">
                {this.renderOverlay()}
                <div className="b-packages-results-page__form">
                    <SearchForm data={this.formData}/>
                </div>
                <div className="b-packages-results-page__recommended-bundle">
                    <div className="b-recommended-bundle-bg">
                    </div>
                    <RecommendedBundle data={this.state.recommendedData}/>
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
