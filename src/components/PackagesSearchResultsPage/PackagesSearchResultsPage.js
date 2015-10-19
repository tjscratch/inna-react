/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import styles from './PackagesSearchResultsPage.scss';
import withStyles from '../../decorators/withStyles';
import withViewport from '../../decorators/withViewport';
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import Location from '../../core/Location';
import { setSearchParams, setSearchParam } from '../../core/LocationHelper';

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
import HotelsResultsList from '../HotelsResultsList';
import TicketsResultsList from '../TicketsResultsList';
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
        let routeParams = props.routeParams;

        //данные для формы
        this.formData = {
            from: data[0],
            to: data[1],
            ...routeParams
        };

        //берем из location.hash
        this.state = {
            hotelsData: null,
            ticketsData: null,
            recommendedData: null,

            //выбранный билет
            ticketId: props.routeQuery.ticket || null,
            //выбранный отель
            hotelId: props.routeQuery.hotel || null,

            //Cheapest: false
            //HotelId: 47547
            //TicketId: 2103344931
            defaultRecommendedPair: null,

            //тип списка - отели или билеты
            listType: this.getListTypeFromProps(props),

            //из урла, или рекомендованный - текущая страница (для мобильной), реком. вар., список отелей или список билетов
            display: props.routeQuery.display || DisplayEnum.Recommended,

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
                    recPair.AviaInfo.CurrentListType = this.state.listType;
                    recPair.Hotel.CurrentListType = this.state.listType;
                    recPair.AviaInfo.TicketsCount = data.AviaInfos.length;
                    recPair.Hotel.HotelsCount = data.HotelCount;

                    //пока так, потом будет приходить нормальная сразу в объекте
                    recPair.PackagePrice = this.state.recommendedData ? this.state.recommendedData.PackagePrice : data.RecommendedPair.Hotel.PackagePrice;

                    this.setState({
                        recommendedData: recPair,
                        defaultRecommendedPair: data.DefaultRecommendedPair,
                    });

                    resolve();
                    this.getHotelData();
                });
            }
            else {
                this.getHotelData().then((data)=> {
                    let recPair = data.RecommendedPair;
                    //добавляем доп поля для карточки авиа и отеля
                    recPair.AviaInfo.CurrentListType = this.state.listType;
                    recPair.Hotel.CurrentListType = this.state.listType;
                    recPair.AviaInfo.TicketsCount = this.state.recommendedData ? this.state.recommendedData.AviaInfo.TicketsCount : null;
                    recPair.Hotel.HotelsCount = data.HotelCount;

                    //пока так, потом будет приходить нормальная сразу в объекте
                    recPair.PackagePrice = this.state.recommendedData ? this.state.recommendedData.PackagePrice : data.RecommendedPair.Hotel.PackagePrice;

                    this.setState({
                        recommendedData: recPair,
                        defaultRecommendedPair: data.DefaultRecommendedPair
                    });

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

            //console.log('getHotelData, params.TicketId', params.TicketId);

            api.cachedGet(apiUrls.PackagesSearchHotels, params).then((data)=> {
            //api.get(apiUrls.PackagesSearchHotels, params).then((data)=> {
                console.log('SearchHotels data', data);

                if (data) {
                    this.setState({
                        hotelsData: data.Hotels,
                    });
                    resolve(data);
                }
                else {
                    console.error('PackagesSearchHotels data is null');
                    this.setState({
                        error: true
                    });
                    reject();
                }
            });
        });
    }

    getTicketData(selectedHotelId) {
        //console.log('getTicketData');
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
                TicketClass: routeParams.flightClass,
            };

            if (this.state.hotelId) {
                params.HotelId = selectedHotelId ? selectedHotelId : this.state.hotelId;
            }
            if (this.state.ticketId) {
                params.TicketId = this.state.ticketId;
            }

            //console.log('getTicketData, params.HotelId', params.HotelId);

            api.cachedGet(apiUrls.PackagesSearchTickets, params).then((data)=> {
            //api.get(apiUrls.PackagesSearchTickets, params).then((data)=> {
                console.log('SearchTickets data', data);

                if (data) {
                    this.setState({
                        ticketsData: data.AviaInfos,
                    });
                    resolve(data);
                }
                else {
                    console.error('SearchTickets data is null');
                    this.setState({
                        error: true
                    });
                    reject();
                }
            });
        });
    }

    setQueryString() {
        //если первый запрос, и не сохранили реком. отель и билет
        var query = this.props.routeQuery;
        if (!query.hotel || !query.ticket) {
            var pair = this.state.recommendedData;

            //проставляем в урл
            setSearchParams([
                ['hotel', pair.Hotel.HotelId],
                ['ticket', pair.AviaInfo.VariantId1],
                //['display', DisplayEnum.Recommended]
            ]);
        }
        //else if (!query.display) {
        //    //проставляем в урл
        //    setSearchParam('display', DisplayEnum.Recommended);
        //}
    }

    changeListType(type) {
        //переключаем список перелетов / пакетов
        var pair = this.state.recommendedData;
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
        console.log('this.state.recommendedData', this.state.recommendedData, 'hotel', hotel);

        //меняем отель в паре
        var pair = this.state.recommendedData;
        pair.Hotel = hotel;
        pair.PackagePrice = hotel.PackagePrice;
        this.setState({
            recommendedData: pair,
            ticketsData: null
        });

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
        console.log('this.state.recommendedData', this.state.recommendedData, 'ticket', ticket);

        //меняем отель в паре
        var pair = this.state.recommendedData;
        pair.AviaInfo = ticket;
        pair.PackagePrice = ticket.PackagePrice;
        this.setState({
            recommendedData: pair,
            hotelsData: null
        });

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
        if (this.state.recommendedData == null) {
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

    renderRecommended(events) {
        //на мобиле скрываем когда на списке отелей или билетов
        if (!(this.props.viewport.isMobile && this.state.display != DisplayEnum.Recommended)) {
            return (
                <div id="recommended"
                     className="b-packages-results-page__recommended-bundle">
                    <div className="b-recommended-bundle-bg">
                    </div>
                    <RecommendedBundle
                        events={events}
                        data={this.state.recommendedData}
                        defaultRecommendedPair={this.state.defaultRecommendedPair}
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
                                        data={this.state.hotelsData}/> :
                                    <TicketsResultsList
                                        events={events}
                                        data={this.state.ticketsData}/>
                            }
                        </div>
                        {
                            (!this.props.viewport.isMobile && this.state.listType == ListType.Hotels) ?
                                <div className="b-packages-results__info-block">
                                    <PackagesListInfoBlock data={this.state.hotelsData}/>
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
            chooseTicket: this.chooseTicket.bind(this)
        };

        return (
            <section className="b-packages-results-page">
                {this.renderOverlay()}
                <div className="b-packages-results-page__form">
                    <SearchForm data={this.formData}/>
                </div>
                <div className="b-packages-results-page__mobile-filter">
                    <MobileSelectedFilter listType={this.state.listType}/>
                </div>
                {this.renderRecommended(events)}
                <div className="b-packages-results-page__filter">
                    {this.state.listType == ListType.Hotels ? <PackagesFilters /> : <AviaFilters />}
                </div>
                {this.renderResults(events)}
            </section>
        );
    }
}

export default PackagesSearchResultsPage;
