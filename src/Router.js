/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React from 'react';
import Router from 'react-routing/src/Router';
import http from './core/HttpClient';
import App from './components/App';
import ContentPage from './components/ContentPage';
import ContactPage from './components/ContactPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import NotFoundPage from './components/NotFoundPage';
import ErrorPage from './components/ErrorPage';

import MainPage from './components/MainPage';
import PackagesSearchResultsPage from './components/PackagesSearchResultsPage';

import Storage from './storage.js';
import apiUrls from './constants/ApiUrls.js';

const router = new Router(on => {

    on('*', async (state, next) => {
        //console.log('route *');
        const component = await next();
        return component && <App context={state.context}>{component}</App>;
    });

    on('/', async (state) => {
        let sectionId = 4;
        //получаем все данные (массив) для этой страницы сразу
        let data = await Storage.getPageData(state.context, [`${apiUrls.SectionGet}${sectionId}`]);
        return <MainPage data={data}/>
    });

    //https://inna.ru/#/packages/search/6733-6623-03.10.2015-10.10.2015-0-2-1_2_3
    //https://inna.ru/#/packages/search/6733-6623-01.10.2015-08.10.2015-0-2-2
    on('/packages/search/:fromId-:toId-:fromDate-:toDate-:flightClass-:adultCount-:childAges?', async (state) => {
        //console.log('params', state.params);
        let data = await Storage.getPageData(state.context, [
            `${apiUrls.DirectoryById}${state.params.fromId}`,
            `${apiUrls.DirectoryById}${state.params.toId}`
        ]);
        return <PackagesSearchResultsPage
            routeQuery={state.query}
            routeParams={state.params}
            data={data}/>
    });

    on('/contact', async () => <ContactPage />);

    on('/login', async () => <LoginPage />);

    on('/register', async () => <RegisterPage />);

    on('*', async (state) => {
        //console.log('route next *, state.path', state.path);
        const content = await http.get(`/api/content?path=${state.path}`);
        return content && <ContentPage {...content} />;
    });

    on('error', (state, error) => state.statusCode === 404 ?
            <App context={state.context} error={error}><NotFoundPage /></App> :
            <App context={state.context} error={error}><ErrorPage /></App>
    );

});

export default router;
