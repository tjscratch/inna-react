/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

//default
import React, { PropTypes } from 'react';
import styles from './PackagesSearchResultsPage.scss';
import withStyles from '../../decorators/withStyles';
import withViewport from '../../decorators/withViewport';
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import Location from '../../core/Location';

import { connect } from 'react-redux';
import { getStore } from '../../store/storeHolder';
import { searchTickets } from '../../actions/action_search_tickets';
import { searchHotels } from '../../actions/action_search_hotels';

//api
import api from './../../core/ApiClient';
import apiUrls from './../../constants/ApiUrls.js';
import siteUrls from './../../constants/SiteUrls.js';

//helpers
import { routeDateToApiDate } from '../../helpers/DateHelper.js'
import { setSearchParams, setSearchParam } from '../../helpers/LocationHelper';
import { routeDateToJsDate, dateToDDMMM, getNightsCount } from '../../helpers/DateHelper.js';
import { pluralize } from '../../helpers/CountHelper.js';

//controls
import { WaitMsg, ErrorMsg } from '../ui/PopupMessages';

import SearchForm from '../SearchForm';
import RecommendedBundle from '../RecommendedBundle';
import { PackagesFilters, AviaFilters } from '../ListFilters';
import { MobileSelectedFilter } from '../MobileFilters';
import HotelsResultsList from '../HotelsResultsList';
import TicketsResultsList from '../TicketsResultsList';
import PackagesListInfoBlock from '../PackagesListInfoBlock';

//enums
import ListType from './ListType.js';
import DisplayEnum from './DisplayEnum.js';

@withViewport
@withStyles(styles) class PackagesSearchResultsPage extends React.Component {
    static contextTypes = {
        onSetTitle: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        let { data, directory, routeParams, routeQuery } = props;

        //берем из location.hash
        this.state = {
            hotelsData: null,
            ticketsData: null,
            recommendedData: null,

            //выбранный билет
            ticketId: routeQuery.ticket || null,
            //выбранный отель
            hotelId: routeQuery.hotel || null,

            //Cheapest: false
            //HotelId: 47547
            //TicketId: 2103344931
            defaultRecommendedPair: null,

            //тип списка - отели или билеты
            listType: this.getListTypeFromProps(props),

            //из урла, или рекомендованный - текущая страница (для мобильной), реком. вар., список отелей или список билетов
            display: routeQuery.display || DisplayEnum.Recommended,

            //error: true
        };

        //console.log('init, state:', this.state);
    }

    componentWillReceiveProps(props) {
        //this.props на данном этапе имеет предыдущее значение !!!
        //props - новые свойства, которые получит контрол
        //console.log('componentWillReceiveProps', JSON.stringify(props.routeQuery), JSON.stringify(this.props.routeQuery));

        //флаги соответствия состояния и урла
        this.setState({
            listType: this.getListTypeFromProps(props),
            display: props.routeQuery.display || DisplayEnum.Recommended,
            ticketId: props.routeQuery.ticket || null,
            hotelId: props.routeQuery.hotel || null,
        });
    }

    componentDidMount() {
        this.getData().then(()=> {
            //проставляем ссылки на рек вариант
            this.setQueryString();
        });
    }

    bundleBuyClick() {
        console.log('bundle buy click');
        //купить

        //формируем урл на страницу отеля
        var params = [];
        var routeParams = this.props.routeParams;
        for (var key in routeParams) {
            params.push(routeParams[key]);
        }
        params.push(this.state.recommendedData.Hotel.HotelId);
        params.push(this.state.recommendedData.AviaInfo.VariantId1);
        params.push(this.state.recommendedData.AviaInfo.VariantId2);
        params.push(this.state.recommendedData.Hotel.ProviderId);
        var url = `${siteUrls.HotelDetails}${params.join('-')}`;
        //console.log(url);

        //открываем в новом окне (нахуя? - не понятно...)
        //window.open(url);

        //открываем в этом
        Location.pushState(null, url);
    }

    getListTypeFromProps(props) {
        return props.routeQuery.display == ListType.Tickets ? ListType.Tickets : ListType.Hotels;
    }

    getData() {
        return new Promise((resolve) => {
            //сначала запрашиваем билеты
            if (this.state.display == DisplayEnum.Tickets) {
                this.getTicketData().then((data)=> {
                    //добавляем доп поля для карточки авиа
                    let recPair = data.RecommendedPair;
                    //recPair.AviaInfo.CurrentListType = this.state.listType;
                    //recPair.Hotel.CurrentListType = this.state.listType;
                    //recPair.AviaInfo.TicketsCount = data.AviaInfos.length;
                    //recPair.Hotel.HotelsCount = data.HotelCount;
                    //
                    ////пока так, потом будет приходить нормальная сразу в объекте
                    //recPair.PackagePrice = this.state.recommendedData ? this.state.recommendedData.PackagePrice : data.RecommendedPair.Hotel.PackagePrice;

                    //this.setState({
                    //    recommendedData: recPair,
                    //    defaultRecommendedPair: data.DefaultRecommendedPair
                    //});

                    resolve();
                    this.getHotelData();
                });
            }
            else {
                this.getHotelData().then((data)=> {
                    let recPair = data.RecommendedPair;
                    //добавляем доп поля для карточки авиа и отеля
                    //recPair.AviaInfo.CurrentListType = this.state.listType;
                    //recPair.Hotel.CurrentListType = this.state.listType;
                    //recPair.AviaInfo.TicketsCount = this.state.recommendedData ? this.state.recommendedData.AviaInfo.TicketsCount : null;
                    //recPair.Hotel.HotelsCount = data.HotelCount;
                    //
                    ////пока так, потом будет приходить нормальная сразу в объекте
                    //recPair.PackagePrice = this.state.recommendedData ? this.state.recommendedData.PackagePrice : data.RecommendedPair.Hotel.PackagePrice;

                    //this.setState({
                    //    recommendedData: recPair,
                    //    defaultRecommendedPair: data.DefaultRecommendedPair
                    //});

                    resolve();
                    this.getTicketData();
                });
            }
        });
    }

    getHotelData(selectedTicketId) {
        //console.log('getHotelData');
        //url без отеля и билета
        //https://inna.ru/api/v1/Packages/SearchHotels?AddFilter=true&Adult=1&ArrivalId=6623&DepartureId=6733&EndVoyageDate=2015-12-08&StartVoyageDate=2015-12-01&TicketClass=0
        //https://inna.ru/api/v1/Packages/SearchTickets?AddFilter=true&Adult=1&ArrivalId=6623&DepartureId=6733&EndVoyageDate=2015-12-08&HotelId=47547&StartVoyageDate=2015-12-01&TicketClass=0&TicketId=2103344931

        //url с отелем и билетом
        //https://inna.ru/api/v1/Packages/SearchHotels?AddFilter=true&Adult=1&ArrivalId=6623&DepartureId=6733&EndVoyageDate=2015-12-08&HotelId=47547&StartVoyageDate=2015-12-01&TicketClass=0&TicketId=2103344931&hotel=47547&ticket=2103344931
        //https://inna.ru/api/v1/Packages/SearchTickets?AddFilter=true&Adult=1&ArrivalId=6623&DepartureId=6733&EndVoyageDate=2015-12-08&HotelId=47547&StartVoyageDate=2015-12-01&TicketClass=0&TicketId=2103344931&hotel=47547&ticket=2103344931

        return new Promise((resolve, reject)=> {
            var { store, dispatch } = this.props;

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

            if (this.state.hotelId) {
                params.HotelId = this.state.hotelId;
            }
            if (this.state.ticketId) {
                params.TicketId = selectedTicketId ? selectedTicketId : this.state.ticketId;
            }

            dispatch(searchHotels(params))
                .then(()=> {
                    var state = getStore().getState();
                    var data = state.searchHotels;
                    //console.log('SearchHotels data', data);

                    if (data) {
                        //this.setState({
                        //    hotelsData: data.Hotels,
                        //});
                        resolve(data);
                    }
                    else {
                        console.error('PackagesSearchHotels data is null');
                        this.setState({
                            error: true
                        });
                        reject();
                    }
                })
                .catch((err)=> {
                    console.error('PackagesSearchHotels err', err);
                    this.setState({
                        error: true
                    });
                    reject();
                });
        });
    }

    getTicketData(selectedHotelId) {
        return new Promise((resolve, reject)=> {
            var { store, dispatch } = this.props;

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

            if (this.state.hotelId) {
                params.HotelId = selectedHotelId ? selectedHotelId : this.state.hotelId;
            }
            if (this.state.ticketId) {
                params.TicketId = this.state.ticketId;
            }

            dispatch(searchTickets(params))
                .then(()=> {
                    var state = getStore().getState();
                    var data = state.searchTickets;
                    //console.log('SearchTickets data', data);

                    if (data) {
                        //this.setState({
                        //    ticketsData: data.AviaInfos
                        //});
                        resolve(data);
                    }
                    else {
                        console.error('SearchTickets data is null');
                        this.setState({
                            error: true
                        });
                        reject();
                    }
                })
                .catch((err)=> {
                    console.error('SearchTickets err', err);
                    this.setState({
                        error: true
                    });
                    reject();
                });
        });
    }

    setQueryString() {
        //если первый запрос, и не сохранили реком. отель и билет
        var query = this.props.routeQuery;
        if (!query.hotel || !query.ticket) {
            var pair = this.props.recommendedData;

            //проставляем в урл
            setSearchParams([
                ['hotel', pair.Hotel.HotelId],
                ['ticket', pair.AviaInfo.VariantId1],
            ], true);//replace
        }
        //else if (!query.display) {
        //    //проставляем в урл
        //    setSearchParam('display', DisplayEnum.Recommended);
        //}
    }

    changeListType(type) {
        //переключаем список перелетов / пакетов
        var pair = this.props.recommendedData;
        if (pair) {
            pair.AviaInfo.CurrentListType = type;
            pair.Hotel.CurrentListType = type;
        }

        this.setState({
            recommendedData: pair,
        });

        //меняем параметры в урле через history api
        //recommended - не проставляем в url
        var stateDisplay = type == ListType.Tickets ? DisplayEnum.Tickets : (type == ListType.Hotels ? ListType.Hotels : null);
        setSearchParams([
            //['hotel', pair.Hotel.HotelId],
            //['ticket', pair.AviaInfo.VariantId1],
            ['display', stateDisplay]
        ]);
    }

    chooseHotel(hotel) {
        console.log('chooseHotel recommendedData', this.props.recommendedData, 'hotel', hotel);

        //меняем отель в паре
        var pair = this.props.recommendedData;
        pair.Hotel = hotel;
        pair.PackagePrice = hotel.PackagePrice;
        //this.setState({
        //    recommendedData: pair,
        //    ticketsData: null
        //});

        //меняем параметры в урле через history api
        if (this.props.viewport.isMobile) {
            setSearchParams([
                ['hotel', hotel.HotelId],
                ['display', null]
            ]);
        }
        else {
            setSearchParam('hotel', hotel.HotelId);
        }

        this.getTicketData(hotel.HotelId);
    }

    chooseTicket(ticket) {
        console.log('chooseTicket recommendedData', this.props.recommendedData, 'ticket', ticket);

        //меняем отель в паре
        var pair = this.props.recommendedData;
        pair.AviaInfo = ticket;
        pair.PackagePrice = ticket.PackagePrice;
        //this.setState({
        //    recommendedData: pair,
        //    hotelsData: null
        //});

        //меняем параметры в урле через history api
        if (this.props.viewport.isMobile) {
            setSearchParams([
                ['ticket', ticket.VariantId1],
                ['display', null]
            ]);
        }
        else {
            setSearchParam('ticket', ticket.VariantId1);
        }

        this.getHotelData(ticket.VariantId1);
    }

    renderOverlay() {
        if (this.state.error) {
            return (
                <ErrorMsg
                    data={{title:'Произошла ошибка', text:'Пожалуйста позвоните нам'}}
                    close={()=>{
                                console.log('popup close');
                                window.location = '/';
                            }}
                    cancel={()=>{
                                console.log('popup cancel');
                                window.location = '/';
                            }}
                    />
            );
        }
        else if (this.props.recommendedData == null) {
            return (
                <WaitMsg
                    data={{title:'Ищем варианты', text:'Поиск займет не более 30 секунд', cancelText:'Прервать поиск'}}
                    close={()=>{
                        console.log('popup close');
                        window.location = '/';
                    }}
                    cancel={()=>{
                        console.log('popup cancel');
                        window.location = '/';
                    }}
                    />
            );
        }

        return null;
    }

    renderRecommended(events) {
        //на мобиле скрываем когда на списке отелей или билетов
        if (!(this.props.viewport.isMobile && this.state.display != DisplayEnum.Recommended)) {
            return (
                <div id="recommended" className="b-packages-results-page__recommended-bundle">
                    <div className="b-recommended-bundle-bg">
                    </div>
                    <RecommendedBundle
                        events={events}
                        data={this.props.recommendedData}
                        defaultRecommendedPair={this.props.defaultRecommendedPair}
                        />
                </div>
            );
        }
        return null;
    }

    renderResults(events) {
        //на мобиле список показываем, когда не на рекомендуемом
        if (!(this.props.viewport.isMobile && this.state.display == DisplayEnum.Recommended)) {
            return (
                <div className="b-packages-results-page__results">
                    <div className="b-packages-results">
                        <div className="b-packages-results__content">
                            {
                                this.state.listType == ListType.Hotels ?
                                    <HotelsResultsList
                                        events={events}
                                        data={this.props.hotelsData}/> :
                                    <TicketsResultsList
                                        events={events}
                                        data={this.props.ticketsData}/>
                            }
                        </div>
                        {
                            (!this.props.viewport.isMobile && this.state.listType == ListType.Hotels) ?
                                <div className="b-packages-results__info-block">
                                    <PackagesListInfoBlock data={this.props.hotelsData}/>
                                </div> :
                                null
                        }
                    </div>
                </div>
            )
        }

        return null;
    }

    render() {
        var title = 'Инна-Тур - Динамические пакеты';
        this.context.onSetTitle(title);

        var events = {
            changeListType: this.changeListType.bind(this),
            chooseHotel: this.chooseHotel.bind(this),
            chooseTicket: this.chooseTicket.bind(this),
            bundleBuyClick: this.bundleBuyClick.bind(this)
        };

        let { directory, routeParams, routeQuery } = this.props;

        var formData = null;
        if (directory) {
            //данные для формы
            formData = {
                from: directory[routeParams.fromId],
                to: directory[routeParams.toId],
                ...routeParams
            };
        }

        //console.log('form data', formData);
        if (formData) {
            var fromDate = routeDateToJsDate(formData.fromDate);
            var toDate = routeDateToJsDate(formData.toDate);
            var nightsCount = getNightsCount(fromDate, toDate);

            return (
                <section className="b-packages-results-page">
                    {this.renderOverlay()}
                    <div className="b-packages-results-page__form">
                        <SearchForm {...this.props}/>
                    </div>
                    <div className="b-packages-results-page__mobile-filter">
                        <MobileSelectedFilter>
                            <div
                                className="b-packages-results-page__head-filter__caption">{formData.to ? formData.to.CountryName : ''}</div>
                            <div className="b-packages-results-page__head-filter__description">
                                {nightsCount} {pluralize(nightsCount, ['ночь', 'ночи', 'ночей'])}
                                &nbsp;с {fromDate.getDate()} по {dateToDDMMM(toDate)}
                                &nbsp;{formData.adultCount} {pluralize(formData.adultCount, ['взрослый', 'взрослых', 'взрослых'])}</div>
                        </MobileSelectedFilter>
                    </div>
                    {this.renderRecommended(events)}
                    <div className="b-packages-results-page__filter">
                        {this.state.listType == ListType.Hotels ? <PackagesFilters /> : <AviaFilters />}
                    </div>
                    {this.renderResults(events)}
                </section>
            );
        }

        return null;
    }
}

//export default PackagesSearchResultsPage;

function mapStateToProps(state) {
    return {
        directory: state.directory,
        ticketsData: state.searchTickets ? state.searchTickets.AviaInfos : null,
        hotelsData: state.searchHotels ? state.searchHotels.Hotels : null,
        recommendedData: state.searchRecommended ? state.searchRecommended.recommendedData : null,
        defaultRecommendedPair: state.searchRecommended ? state.searchRecommended.defaultRecommendedPair : null,
        //data: state.searchResults
    }
}

export default connect(
    mapStateToProps
)(PackagesSearchResultsPage)
