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
import PackagesResultsList from '../PackagesResultsList';
import AviaResultsList from '../AviaResultsList';
import PackagesListInfoBlock from '../PackagesListInfoBlock';

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
            ticketsData: null,
            //error: true
        };
    }

    getData() {
        return new Promise((resolve, reject)=>{
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
                    let recPair = data.RecommendedPair;
                    //добавляем доп поля для карточки авиа и отеля
                    recPair.AviaInfo.CurrentListType = this.state.listType;
                    recPair.Hotel.CurrentListType = this.state.listType;
                    recPair.Hotel.HotelsCount = data.HotelCount;

                    this.setState({
                        hotelsData: data.Hotels,
                        recommendedData: recPair
                    });
                    resolve(data);
                }
                else {
                    console.log('PackagesSearchHotels data is null');
                    this.setState({
                        error: true
                    });
                    reject();
                }
            });
        });
    }

    getAviaData() {
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
            TicketClass: routeParams.flightClass,
            HotelId: this.state.recommendedData.Hotel.HotelId,
            TicketId: this.state.recommendedData.AviaInfo.VariantId1
        };

        api.cachedGet(apiUrls.PackagesSearchTickets, params).then((data)=> {
            console.log('SearchTickets data', data);

            if (data) {
                //добавляем доп поля для карточки авиа
                var recPair = this.state.recommendedData;
                recPair.AviaInfo.TicketsCount = data.AviaInfos.length;
                this.setState({
                    ticketsData: data.AviaInfos,
                    recommendedData: recPair
                });
            }
            else {
                console.log('SearchTickets data is null');
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
        this.getData().then(()=>{
            //сразу запрашиваем данные по перелетам
            this.getAviaData();
        });
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
                            {
                                this.state.listType == ListType.Packages ?
                                <PackagesResultsList data={this.state.hotelsData} /> :
                                <AviaResultsList data={this.state.ticketsData} />
                            }
                        </div>
                        {
                            (this.state.listType == ListType.Packages) ?
                            <div className="b-packages-results__info-block">
                                <PackagesListInfoBlock data={this.state.hotelsData} />
                            </div> :
                            null
                        }
                    </div>
                </div>
            </section>
        );
    }
}

export default PackagesSearchResultsPage;
