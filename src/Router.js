/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React from 'react';
import Router from 'react-routing/src/Router';
import http from './core/HttpClient';
import App from './components/App';
import ContentPage from './components/ContentPage';
import NotFoundPage from './components/NotFoundPage';
import ErrorPage from './components/ErrorPage';

import MainPage from './components/MainPage';
import PackagesSearchResultsPage from './components/PackagesSearchResultsPage';
import HotelPage from './components/HotelPage';
import ReservationPage from './components/ReservationPage';
import BuyPage from './components/BuyPage';

import Storage from './storage.js';
import apiUrls from './constants/ApiUrls.js';
import siteUrls from './constants/SiteUrls.js';
import { routeDateToApiDate } from './helpers/DateHelper.js'
import _ from 'lodash';
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';

//======================store=============================
import { getTestData } from './actions/action_test';
import { getMainPageData } from './actions/action_main';
import { getDirectoryById } from './actions/action_directory';
import { getStore } from './store/storeHolder';

import ProviderWrapper from './components/ProviderWrapper';
//======================store=============================

//оборачиваем в Redux провайдер, передаем store
function wrapByProvider(component) {
    return (<ProviderWrapper component={component}/>)
}

const router = new Router(on => {

    on('*', async (state, next) => {
        const component = await next();
        return component && wrapByProvider(<App context={state.context}>{component}</App>);
    });

    //главная страница
    on(siteUrls.Root, async (state) => {

        //test data
        //if (canUseDOM) {
        //    var testAction = await getStore().dispatch(getTestData(false))
        //        .then((action)=> {
        //            console.log('getTestData success', action);
        //        }).catch((err)=> {
        //            console.log('getTestData error', err);
        //        });
        //    console.log('getTestData result', testAction);
        //}


        let sectionId = 4;
        //получаем данные для главной страницы
        await getStore().dispatch(getMainPageData(sectionId));
        return <MainPage/>
    });

    //страница результатов поиска ДП
    //https://inna.ru/#/packages/search/6733-6623-03.10.2015-10.10.2015-0-2-1_2_3
    //https://inna.ru/#/packages/search/6733-6623-01.10.2015-08.10.2015-0-2-2
    on(`${siteUrls.SearchPackages}:fromId-:toId-:fromDate-:toDate-:flightClass-:adultCount-:childAges?`, async (state) => {
        //получаем данные для страницы результатов поиска
        await getStore().dispatch(getDirectoryById(state.params.fromId));
        await getStore().dispatch(getDirectoryById(state.params.toId));

        return <PackagesSearchResultsPage
            routeQuery={state.query ? state.query : {}}
            routeParams={state.params}/>
    });

    //страница отеля
    //http://test.inna.ru/api/v1/Packages/SearchHotel?HotelId=121667&HotelProviderId=4&TicketToId=800411550&TicketBackId=800411644&Filter%5Baction%5D=buy&Filter%5BdisplayHotel%5D=121667&Filter%5BDepartureId%5D=6733&Filter%5BArrivalId%5D=6623&Filter%5BStartVoyageDate%5D=2015-12-01&Filter%5BEndVoyageDate%5D=2015-12-15&Filter%5BTicketClass%5D=0&Filter%5BAdult%5D=2&Filter%5BHotelId%5D=121667&Filter%5BTicketId%5D=800411550&Filter%5BTicketBackId%5D=800411644&Filter%5BProviderId%5D=4
    //http://test.inna.ru/api/v1/Packages/SearchHotel?HotelId=121667&HotelProviderId=4&TicketToId=800411550&TicketBackId=800411644&Filter%5Baction%5D=buy&Filter%5BdisplayHotel%5D=121667&Filter%5BDepartureId%5D=6733&Filter%5BArrivalId%5D=6623&Filter%5BStartVoyageDate%5D=2015-12-01&Filter%5BEndVoyageDate%5D=2015-12-15&Filter%5BTicketClass%5D=0&Filter%5BAdult%5D=2&Filter%5BHotelId%5D=121667&Filter%5BTicketId%5D=800411550&Filter%5BTicketBackId%5D=800411644&Filter%5BProviderId%5D=4&Rooms=true

    //дети
    //https://inna.ru/api/v1/Packages/SearchHotel?HotelId=47547&HotelProviderId=2&TicketToId=2109638805&TicketBackId=2109638826&Filter[action]=buy&Filter[displayHotel]=47547&Filter[DepartureId]=2767&Filter[ArrivalId]=6623&Filter[StartVoyageDate]=2015-12-01&Filter[EndVoyageDate]=2015-12-08&Filter[TicketClass]=0&Filter[Adult]=1&Filter[Children]=2_3&Filter[HotelId]=47547&Filter[TicketId]=2109638805&Filter[TicketBackId]=2109638826&Filter[ProviderId]=2
    // &Filter[ChildrenAges][]=2&Filter[ChildrenAges][]=3&Rooms=true

    //достаточно
    //https://inna.ru/api/v1/Packages/SearchHotel?HotelId=407760&HotelProviderId=4
    // &TicketToId=2109478486&TicketBackId=2109478583
    // &Filter[DepartureId]=2767&Filter[ArrivalId]=6623
    // &Filter[StartVoyageDate]=2015-12-01&Filter[EndVoyageDate]=2015-12-08&Filter[TicketClass]=0&Filter[Adult]=1
    on(`${siteUrls.HotelDetails}:fromId-:toId-:fromDate-:toDate-:flightClass-:adultCount-:childAges?-:hotelId-:ticketId-:ticketBackId-:providerId`, async (state) => {
        return <HotelPage
            routeQuery={state.query ? state.query : {}}
            routeParams={state.params}/>
    });

    on(`${siteUrls.PackageReservation}:fromId-:toId-:fromDate-:toDate-:flightClass-:adultCount-:childAges?-:hotelId-:ticketId-:ticketBackId-:providerId`, async (state) => {
        return <ReservationPage
            routeQuery={state.query ? state.query : {}}
            routeParams={state.params}/>
    });

    on(`${siteUrls.Buy}:orderNum`, async (state) => {
        return <BuyPage
            routeQuery={state.query ? state.query : {}}
            routeParams={state.params}/>
    });

    //on('*', async (state) => {
    //    //console.log('route next *, state.path', state.path);
    //    const content = await http.get(`/api/content?path=${state.path}`);
    //    return content && <ContentPage {...content} />;
    //});

    on('error', (state, error) => state.statusCode === 404 ?
            //<App context={state.context} error={error}><NotFoundPage /></App> :
            //<App context={state.context} error={error}><ErrorPage /></App>
            wrapByProvider(<App context={state.context} error={error}><NotFoundPage /></App>) :
            wrapByProvider(<App context={state.context} error={error}><ErrorPage /></App>)
    );

});

export default router;
