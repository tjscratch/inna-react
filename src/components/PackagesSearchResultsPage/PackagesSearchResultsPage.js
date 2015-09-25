/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import styles from './PackagesSearchResultsPage.scss';
import withStyles from '../../decorators/withStyles';

//api
import api from './../../core/ApiClient';
import apiUrls from './../../constants/ApiUrls.js';

//helpers
import { routeDateToApiDate } from '../../core/DateHelper.js'

//controls
import { WaitMsg } from '../ui/PopupMessages';
import SearchForm from '../SearchForm';
import RecommendedBundle from '../RecommendedBundle';
import { PackagesFilters, AviaFilters } from '../ListFilters';

import ListType from './ListType.js';

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
            listType: ListType.Packages,
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
                data.RecommendedPair.AviaInfo.CurrentListType = this.state.listType;
                data.RecommendedPair.Hotel.CurrentListType = this.state.listType;

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

    changeListType(type) {
        //переключаем список перелетов / пакетов
        var pair = this.state.recommendedData;
        if (pair) {
            pair.AviaInfo.CurrentListType = type;
            pair.Hotel.CurrentListType = type;
        }
        this.setState({
            listType: type,
            recommendedData: pair
        });
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

        let events = {
            changeListType: this.changeListType.bind(this)
        };

        return (
            <section className="b-packages-results-page">
                {this.renderOverlay()}
                <div className="b-packages-results-page__form">
                    <SearchForm data={this.formData}/>
                </div>
                <div id="recommended" className="b-packages-results-page__recommended-bundle">
                    <div className="b-recommended-bundle-bg">
                    </div>
                    <RecommendedBundle
                        events={events}
                        data={this.state.recommendedData}
                        />
                </div>
                <div className="b-packages-results-page__filter">
                    {this.state.listType == ListType.Packages ? <PackagesFilters /> : <AviaFilters />}
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
