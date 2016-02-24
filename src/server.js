/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import 'babel/polyfill';
import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import express from 'express';
import compression from 'compression';
import ReactDOM from 'react-dom/server';
import Router from './Router';

import { inspect } from 'util';

import { createStore, getStore } from './store/storeHolder';

const server = global.server = express();

server.set('port', (process.env.PORT || 5000));

server.use(compression({
    filter: function (req, res) {
        return true;
    }
}));

server.use(express.static(path.join(__dirname, 'public')));

//
// Register API middleware
// -----------------------------------------------------------------------------
//server.use('/api/content', require('./api/content'));

var proxy = require('express-http-proxy');

server.use('/api/v1/*', proxy('api.test.inna.ru', {
    forwardPath: function(req, res) {
        //var url = require('url').parse(req.originalUrl);
        //console.log('url', url);
        //return require('url').parse(req.originalUrl).path;

        return require('url').parse(req.baseUrl).path;
    },
    filter: function(req, res) {
        return req.method == 'POST';
    }
}));

//server.use('/api/v1/*', proxy('api.test.inna.ru'));

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------

// The top-level React component + HTML template for it
const templateFile = path.join(__dirname, 'templates/index.html');
const template = _.template(fs.readFileSync(templateFile, 'utf8'));

server.get('*', async (req, res, next) => {
    try {
        //создаем новое хранилище на каждый запрос
        createStore();

        let statusCode = 200;
        const data = {title: '', description: '', css: '', body: '', initialState: ''};
        const css = [];
        const context = {
            onInsertCss: value => css.push(value),
            onSetTitle: value => data.title = value,
            onSetMeta: (key, value) => data[key] = value,
            onPageNotFound: () => statusCode = 404,
            //onSetInitialState: (state) => data.initialState = state
            onSetInitialState: (state) => {}
        };

        await Router.dispatch({path: req.path, context}, (state, component) => {
            data.body = ReactDOM.renderToString(component);
            data.css = css.join('');
        });

        //pass store to client
        var state = getStore().getState();
        data.initialState = JSON.stringify(state);

        const html = template(data);
        res.status(statusCode).send(html);
    } catch (err) {
        next(err);
    }
});

//
// Launch the server
// -----------------------------------------------------------------------------

server.listen(server.get('port'), () => {
    if (process.send) {
        process.send('online');
    } else {
        console.log('The server is running at http://localhost:' + server.get('port'));
    }
});
