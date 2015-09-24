/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import styles from './PackagesSearchResultsPage.scss';
import withStyles from '../../decorators/withStyles';
import SearchForm from '../SearchForm';
import api from './../../core/ApiClient';
import apiUrls from './../../constants/ApiUrls.js';

import RecommendedBundle from '../RecommendedBundle';
import { routeDateToApiDate } from '../../core/DateHelper.js'

import { WaitMsg } from '../ui/PopupMessages';

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
            hotelsData: null,
            //error: true
        };
    }

    getData() {
        let fromDateApi = routeDateToApiDate(this.props.routeParams.fromDate);
        let toDateApi = routeDateToApiDate(this.props.routeParams.toDate);
        let routeParams = this.props.routeParams;

        let params = {
            AddFilter: 'true',
            Adult: routeParams.adultCount,
            ArrivalId: routeParams.toId,
            DepartureId: routeParams.fromId,
            EndVoyageDate: toDateApi,
            StartVoyageDate: fromDateApi,
            TicketClass: routeParams.flightClass
        };

        api.cachedGet(apiUrls.PackagesSearchHotels, params).then((data)=> {
            //console.log('SearchHotels data', data);

            if (data) {
                this.setState({
                    hotelsData: data,
                    recommendedData: data.RecommendedPair
                });
            }
            else {
                console.log('PackagesSearchHotels data is null');
                this.setState({
                    error: true
                });
            }
        });
    }

    static contextTypes = {
        onSetTitle: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.getData();
    }

    renderOverlay() {
        if (this.state.hotelsData == null) {
            return (
                <WaitMsg
                    data={{title:'Ищем варианты', text:'Поиск займет не более 30 секунд', cancelText:'Прервать поиск'}}
                    close={()=>{
                        alert('popup close')
                    }}
                    cancel={()=>{
                        alert('popup cancel')
                    }}
                />
            );
        }
        //else if (this.state.error) {
        //    return (
        //        <PopupMessage data={{title:'Произошла ошибка', text:'Пожалуйста позвоните нам'}} />
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
                <div id="recommended" className="b-packages-results-page__recommended-bundle">
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
