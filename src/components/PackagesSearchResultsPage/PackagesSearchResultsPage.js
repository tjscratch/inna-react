/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import styles from './PackagesSearchResultsPage.scss';
import withStyles from '../../decorators/withStyles';
import withViewport from '../../decorators/withViewport';
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import Location from '../../core/Location';
import { setSearchParamsWithHash, setSearchParam, setHash } from '../../core/LocationHelper';

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
import { MobileSelectedFilter } from '../MobileFilters';
import PackagesResultsList from '../PackagesResultsList';
import AviaResultsList from '../AviaResultsList';
import PackagesListInfoBlock from '../PackagesListInfoBlock';

import ListType from './ListType.js';
import DisplayEnum from './DisplayEnum.js';

@withViewport
@withStyles(styles) class PackagesSearchResultsPage extends React.Component {
    static contextTypes = {
        onSetTitle: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        let data = props.data;
        let routeParams = props.state.params;

        this.formData = {
            from: data[0],
            to: data[1],
            ...routeParams
        };

        //this.getHash()
        //берем из location.hash
        this.state = {
            listType: this.getInitialListType(),
            hotelsData: null,
            ticketsData: null,
            //display: this.getHash() || DisplayEnum.Recommended,
            //error: true
        };

        //console.log('init, state:', this.state);
    }

    getInitialListType() {
        var hashType = this.getHash();
        switch (hashType) {
            case ListType.Hotels: return ListType.Hotels;
            case ListType.Tickets: return ListType.Tickets;
            default: return ListType.Hotels;
        }
    }

    getHash() {
        if (canUseDOM) {
            return location.hash.substring(1);
        }

        return null;
    }

    getData() {
        return new Promise((resolve, reject)=> {
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
            //console.log('SearchTickets data', data);

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

    setRecommendedInQueryString() {
        var hash = null;
        var state = null;
        //скролим к выбранному варианту
        //если не передано что-нибудь
        if (!window.location.hash) {
            //скролим страницу к рек. варианту
            hash = 'recommended';
            state = {display: DisplayEnum.Recommended};
        }

        //если первый запрос, и не сохранили реком. отель и билет
        var query = this.props.state.query;
        if (!query.hotel || !query.ticket) {
            var rec = this.state.recommendedData;

            //проставляем в урл
            setSearchParamsWithHash([
                {name:'hotel', value:rec.Hotel.HotelId},
                {name:'ticket', value:rec.AviaInfo.VariantId1}
            ], hash, state);
        }
        else if (hash) {
            //проставляем в урл
            setHash(hash, state);
        }
    }

    componentDidMount() {
        this.getData().then(()=> {
            //проставляем ссылки на рек вариант
            this.setRecommendedInQueryString();

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

        var stateDisplay = type == ListType.Hotels ? DisplayEnum.Hotels : DisplayEnum.Tickets;

        this.setState({
            listType: type,
            recommendedData: pair,
            //display: stateDisplay,
        });

        //console.log('type', type, 'this.state.display', stateDisplay, 'stateDisplay', stateDisplay);

        //проставляем хэш
        //location.hash = type;
        setHash(type, {display: stateDisplay});
    }

    chooseHotel(hotel) {
        console.log('hotel', hotel.HotelId);
        //меняем параметры в урле через history api
        setSearchParam('hotel', hotel.HotelId);
    }

    chooseTicket(ticket) {
        console.log('ticket', ticket.VariantId1);
        //меняем параметры в урле через history api
        setSearchParam('ticket', ticket.VariantId1);
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
            changeListType: this.changeListType.bind(this),
            chooseHotel: this.chooseHotel.bind(this),
            chooseTicket: this.chooseTicket.bind(this)
        };

        //флаг - показывать список отелей или билетов
        //let displayList = (this.state.display == DisplayEnum.Hotels || this.state.display == DisplayEnum.Tickets);

        //display из hash в урле, передается из роутера
        var propsState = this.props.state.state;
        var propsStateDisplay = propsState ? propsState.display : this.getHash();
        var displayList = (propsStateDisplay == DisplayEnum.Hotels || propsStateDisplay == DisplayEnum.Tickets);
        //console.log('displayList', displayList);

        return (
            <section className="b-packages-results-page">
                {this.renderOverlay()}
                <div className="b-packages-results-page__form">
                    <SearchForm data={this.formData}/>
                </div>
                <div className="b-packages-results-page__mobile-filter">
                    <MobileSelectedFilter listType={this.state.listType}/>
                </div>
                <div id="recommended"
                     className={`b-packages-results-page__recommended-bundle ${this.props.viewport.isMobile && displayList ? 'g-hidden' : ''}`}>
                    <div className="b-recommended-bundle-bg">
                    </div>
                    <RecommendedBundle
                        events={events}
                        data={this.state.recommendedData}
                        />
                </div>
                <div className="b-packages-results-page__filter">
                    {this.state.listType == ListType.Hotels ? <PackagesFilters /> : <AviaFilters />}
                </div>
                <div className={`b-packages-results-page__results ${this.props.viewport.isMobile && !displayList ? 'g-hidden' : ''}`}>
                    <div className="b-packages-results">
                        <div className="b-packages-results__content">
                            {
                                this.state.listType == ListType.Hotels ?
                                    <PackagesResultsList
                                        events={events}
                                        data={this.state.hotelsData}/> :
                                    <AviaResultsList
                                        events={events}
                                        data={this.state.ticketsData}/>
                            }
                        </div>
                        {
                            (this.state.listType == ListType.Hotels) ?
                                <div className="b-packages-results__info-block">
                                    <PackagesListInfoBlock data={this.state.hotelsData}/>
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
