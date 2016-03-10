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
import { searchTickets, changeTicket, flushTickets } from '../../actions/action_search_tickets';
import { searchHotels, changeHotel, flushHotels } from '../../actions/action_search_hotels';

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
import SelectedFilters from '../ListFilters/SelectedFilters'
import { MobileSelectedFilter } from '../MobileFilters';
import ResultsList from '../ResultsList';
import PackagesListInfoBlock from '../PackagesListInfoBlock';

//enums
import ListType from './ListType.js';
import DisplayEnum from './DisplayEnum.js';

@withViewport
@withStyles(styles)
class PackagesSearchResultsPage extends React.Component {
    static contextTypes = {
        onSetTitle: PropTypes.func.isRequired
    };

    constructor (props) {
        super(props);

        this.state = {
            error: false
        };
    }

    componentDidMount () {
        this.getData().then(()=> {
            //проставляем ссылки на рек вариант
            this.setQueryString();
        });
    }

    bundleBuyClick () {
        console.log('bundle buy click');
        //купить

        //формируем урл на страницу отеля
        var params = [];
        var { routeParams, recommendedData } = this.props;
        for (var key in routeParams) {
            params.push(routeParams[key]);
        }
        params.push(recommendedData.Hotel.HotelId);
        params.push(recommendedData.AviaInfo.VariantId1);
        params.push(recommendedData.AviaInfo.VariantId2);
        params.push(recommendedData.Hotel.ProviderId);
        var url = `${siteUrls.HotelDetails}${params.join('-')}`;
        //console.log(url);

        //открываем в новом окне (нахуя? - не понятно...)
        //window.open(url);

        //открываем в этом
        Location.pushState(null, url);
    }

    getListType () {
        var { routeQuery } = this.props;
        if (routeQuery && routeQuery.display == ListType.Tickets) {
            return ListType.Tickets;
        }

        return ListType.Hotels;
    }

    getDisplayType () {
        var { routeQuery } = this.props;
        if (routeQuery) {
            switch (routeQuery.display) {
                case DisplayEnum.Hotels:
                    return DisplayEnum.Hotels;
                case DisplayEnum.Tickets:
                    return DisplayEnum.Tickets;
                default:
                    return DisplayEnum.Recommended;
            }
        }

        return DisplayEnum.Recommended;
    }

    getData () {
        var display = this.getDisplayType();
        return new Promise((resolve) => {
            //сначала запрашиваем билеты
            if (display == DisplayEnum.Tickets) {
                this.getTicketData().then(()=> {
                    resolve();
                    this.getHotelData();
                });
            }
            else {
                this.getHotelData().then(()=> {
                    resolve();
                    this.getTicketData();
                });
            }
        });
    }

    getHotelData (selectedTicketId) {
        //console.log('getHotelData');
        //url без отеля и билета
        //https://inna.ru/api/v1/Packages/SearchHotels?AddFilter=true&Adult=1&ArrivalId=6623&DepartureId=6733&EndVoyageDate=2015-12-08&StartVoyageDate=2015-12-01&TicketClass=0
        //https://inna.ru/api/v1/Packages/SearchTickets?AddFilter=true&Adult=1&ArrivalId=6623&DepartureId=6733&EndVoyageDate=2015-12-08&HotelId=47547&StartVoyageDate=2015-12-01&TicketClass=0&TicketId=2103344931

        //url с отелем и билетом
        //https://inna.ru/api/v1/Packages/SearchHotels?AddFilter=true&Adult=1&ArrivalId=6623&DepartureId=6733&EndVoyageDate=2015-12-08&HotelId=47547&StartVoyageDate=2015-12-01&TicketClass=0&TicketId=2103344931&hotel=47547&ticket=2103344931
        //https://inna.ru/api/v1/Packages/SearchTickets?AddFilter=true&Adult=1&ArrivalId=6623&DepartureId=6733&EndVoyageDate=2015-12-08&HotelId=47547&StartVoyageDate=2015-12-01&TicketClass=0&TicketId=2103344931&hotel=47547&ticket=2103344931

        return new Promise((resolve, reject)=> {
            var { store, dispatch } = this.props;

            let { routeParams } = this.props;
            let fromDateApi = routeDateToApiDate(routeParams.fromDate);
            let toDateApi = routeDateToApiDate(routeParams.toDate);

            let params = {
                AddFilter: 'true',
                Adult: routeParams.adultCount,
                ArrivalId: routeParams.toId,
                DepartureId: routeParams.fromId,
                EndVoyageDate: toDateApi,
                StartVoyageDate: fromDateApi,
                TicketClass: routeParams.flightClass
            };

            var { ticket, hotel } = this.props.routeQuery;
            if (ticket) {
                params.TicketId = selectedTicketId ? selectedTicketId : ticket;
            }
            if (hotel) {
                params.HotelId = hotel;
            }

            dispatch(searchHotels(params))
                .then((action)=> {
                    var { data } = action;
                    if (data) {
                        resolve();
                    }
                    else {
                        console.error('PackagesSearchHotels err', err);
                        this.setState({
                            error: true
                        });
                        reject();
                    }
                })
        });
    }

    getTicketData (selectedHotelId) {
        return new Promise((resolve, reject)=> {
            var { store, dispatch } = this.props;

            let { routeParams } = this.props;
            let fromDateApi = routeDateToApiDate(routeParams.fromDate);
            let toDateApi = routeDateToApiDate(routeParams.toDate);

            let params = {
                AddFilter: 'true',
                Adult: routeParams.adultCount,
                ArrivalId: routeParams.toId,
                DepartureId: routeParams.fromId,
                EndVoyageDate: toDateApi,
                StartVoyageDate: fromDateApi,
                TicketClass: routeParams.flightClass
            };

            var { ticket, hotel } = this.props.routeQuery;
            if (ticket) {
                params.TicketId = ticket;
            }
            if (hotel) {
                params.HotelId = selectedHotelId ? selectedHotelId : hotel;
            }

            dispatch(searchTickets(params))
                .then((action)=> {
                    var { data } = action;
                    if (data) {
                        resolve();
                    }
                    else {
                        console.error('SearchTickets err', err);
                        this.setState({
                            error: true
                        });
                        reject();
                    }
                })
        });
    }

    setQueryString () {
        //если первый запрос, и не сохранили реком. отель и билет
        var { routeQuery, recommendedData } = this.props;
        if (recommendedData && (!routeQuery.hotel || !routeQuery.ticket)) {
            //проставляем в урл
            setSearchParams([
                ['hotel', recommendedData.Hotel.HotelId],
                ['ticket', recommendedData.AviaInfo.VariantId1]
            ], true);//replace
        }
    }

    changeListType (type) {
        //переключаем список перелетов / пакетов
        //recommended - не проставляем в url
        var stateDisplay = type == ListType.Tickets ? DisplayEnum.Tickets : (type == ListType.Hotels ? ListType.Hotels : null);
        setSearchParams([
            ['display', stateDisplay]
        ]);
    }

    chooseHotel (hotel) {
        var { viewport, dispatch } = this.props;

        //меняем отель в паре
        dispatch(changeHotel(hotel, hotel.PackagePrice));
        //обнуляем список билетов
        dispatch(flushTickets());

        //меняем параметры в урле через history api
        if (viewport.isMobile) {
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

    chooseTicket (ticket) {
        var { viewport, dispatch } = this.props;

        //меняем билет в паре
        dispatch(changeTicket(ticket, ticket.PackagePrice));
        //обнуляем список отелей
        dispatch(flushHotels());

        //меняем параметры в урле через history api
        if (viewport.isMobile) {
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

    renderOverlay () {
        if (this.state.error) {
            return (
                <ErrorMsg
                    data={{title:'Произошла ошибка', text:'Пожалуйста позвоните нам'}}
                    close={()=>{
                                console.log('popup close');
                                Location.pushState(null, '/');
                            }}
                    cancel={()=>{
                                console.log('popup cancel');
                                Location.pushState(null, '/');
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
                        Location.pushState(null, '/');
                    }}
                    cancel={()=>{
                        console.log('popup cancel');
                        Location.pushState(null, '/');
                    }}
                />
            );
        }

        return null;
    }

    renderRecommended (events) {
        var { viewport, recommendedData, defaultRecommendedPair } = this.props;
        var display = this.getDisplayType();

        //кнопки переключения на списки отелей и билетов
        var listType = this.getListType();
        var showChangeTickets = false;
        var showChangeHotels = false;
        switch (listType) {
            case ListType.Hotels:
                showChangeTickets = true;
                break;
            case ListType.Tickets:
                showChangeHotels = true;
                break;
        }

        //на мобиле скрываем когда на списке отелей или билетов
        if (!(viewport.isMobile && display != DisplayEnum.Recommended)) {
            return (
                <div id="recommended" className="b-packages-results-page__recommended-bundle">
                    <div className="b-recommended-bundle-bg">
                    </div>
                    <RecommendedBundle
                        events={events}
                        showChangeTickets={showChangeTickets}
                        showChangeHotels={showChangeHotels}
                        data={recommendedData}
                        defaultRecommendedPair={defaultRecommendedPair}
                    />
                </div>
            );
        }
        return null;
    }

    renderResults (events) {
        //console.log(this.props)
        var { viewport, ticketsData, hotelsData } = this.props;
        var listType = this.getListType();
        var display = this.getDisplayType();

        //на мобиле список показываем, когда не на рекомендуемом
        if (!(viewport.isMobile && display == DisplayEnum.Recommended)) {
            return (
                <div className="b-packages-results-page__results">
                    <div className="b-packages-results">
                        <div className="b-packages-results__content">
                            {
                                listType == ListType.Hotels ?
                                    <ResultsList
                                        typeList='hotel'
                                        events={events}
                                        data={hotelsData}/> :
                                    <ResultsList
                                        typeList='ticket'
                                        events={events}
                                        data={ticketsData}/>
                            }
                        </div>
                        {
                            (!viewport.isMobile && listType == ListType.Hotels) ?
                                <div className="b-packages-results__info-block">
                                    <SelectedFilters data={this.props.hotelsFilters}/>
                                    <PackagesListInfoBlock data={hotelsData}/>
                                </div> :
                                null
                        }
                    </div>
                </div>
            )
        }

        return null;
    }

    render () {
        var title = 'Инна-Тур - Динамические пакеты';
        this.context.onSetTitle(title);

        var events = {
            changeListType: this.changeListType.bind(this),
            chooseHotel: this.chooseHotel.bind(this),
            chooseTicket: this.chooseTicket.bind(this),
            bundleBuyClick: this.bundleBuyClick.bind(this)
        };


        let { directory, routeParams, routeQuery, hotelsFilters } = this.props;


        if (directory) {
            //данные для формы
            var formData = {
                from: directory[routeParams.fromId],
                to: directory[routeParams.toId],
                ...routeParams
            };

            var fromDate = routeDateToJsDate(formData.fromDate);
            var toDate = routeDateToJsDate(formData.toDate);
            var nightsCount = getNightsCount(fromDate, toDate);

            var listType = this.getListType();

            return (
                <section className="b-packages-results-page">
                    {this.renderOverlay()}
                    <div className="b-packages-results-page__form">
                        <SearchForm {...this.props}/>
                    </div>
                    <div className="b-packages-results-page__mobile-filter">
                        {listType == ListType.Hotels ?
                            <MobileSelectedFilter disableFilterBtn={false}
                                                  filters={<PackagesFilters hotelsFilters={hotelsFilters}/>}>
                                <div
                                    className="b-packages-results-page__head-filter__caption">{formData.to ? formData.to.CountryName : ''}</div>
                                <div className="b-packages-results-page__head-filter__description">
                                    {nightsCount} {pluralize(nightsCount, ['ночь', 'ночи', 'ночей'])}
                                    &nbsp;с {fromDate.getDate()} по {dateToDDMMM(toDate)}
                                    &nbsp;{formData.adultCount} {pluralize(formData.adultCount, ['взрослый', 'взрослых', 'взрослых'])}</div>
                            </MobileSelectedFilter>
                            :
                            <MobileSelectedFilter disableFilterBtn={true} listType={listType}>
                                <div
                                    className="b-packages-results-page__head-filter__caption">{formData.to ? formData.to.CountryName : ''}</div>
                                <div className="b-packages-results-page__head-filter__description">
                                    {nightsCount} {pluralize(nightsCount, ['ночь', 'ночи', 'ночей'])}
                                    &nbsp;с {fromDate.getDate()} по {dateToDDMMM(toDate)}
                                    &nbsp;{formData.adultCount} {pluralize(formData.adultCount, ['взрослый', 'взрослых', 'взрослых'])}</div>
                            </MobileSelectedFilter>
                        }
                    </div>
                    {this.renderRecommended(events)}
                    <div className="b-packages-results-page__filter">
                        {listType == ListType.Hotels ? <PackagesFilters hotelsFilters={hotelsFilters}/> : <AviaFilters />}
                    </div>
                    {this.renderResults(events)}
                </section>
            );
        }

        return null;
    }
}

//export default PackagesSearchResultsPage;

function mapStateToProps (state) {
    return {
        directory: state.directory,
        ticketsData: state.searchTickets ? state.searchTickets.AviaInfos : null,
        hotelsData: state.searchHotels ? state.searchHotels.Hotels : null,
        hotelsFilters: state.searchHotels ? state.searchHotels.hotelsFilters : null,
        recommendedData: state.searchRecommended ? state.searchRecommended.recommendedData : null,
        defaultRecommendedPair: state.searchRecommended ? state.searchRecommended.defaultRecommendedPair : null,
        //data: state.searchResults
    }
}

export default connect(
    mapStateToProps
)(PackagesSearchResultsPage)
