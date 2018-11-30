'use strict';

const express = require('express');
const cookieSession = require('cookie-session');
const expressHandlebars = require('express-handlebars');
const bunyan = require('bunyan');
const passport = require('./config/passport-oauth2');
const keys = require('./config/keys');

const app = express();

//create log files
const log = bunyan.createLogger({
    name: 'app',
    streams: [{
        path: 'logs/app.log',
    }]
});

const analytics = bunyan.createLogger({
    name: 'analytics',
    streams: [{
        path: 'logs/analytics.log',
    }]
});

//set static routes
app.use('/assets', express.static('assets'));

// set view engine
app.engine('handlebars', expressHandlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// set up session cookies
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

//read post body
app.use(express.json());

//user routes
app.get('/', (req, res) => {
    if(req.query.code) {
        log.info(`callback code=${req.query.code}`);
        res.redirect(`/auth/callback?code=${req.query.code}`);
    } else if(req.user && req.user.id) {
        res.redirect('/profile');
    } else {
        res.render('home');
    }
});

app.get('/profile', (req, res) => {
    if(!req.user || !req.user.id) {
        return res.redirect('/');
    } else {
        res.render('profile', { user: req.user });
    }
});

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

app.post('/analytics', (req, res) => {
    analytics.info(req.body);
    res.json({});
});

//auth routes
app.get('/auth', passport.authenticate('oauth2'));

app.get('/auth/callback', passport.authenticate('oauth2', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/profile');
});

//start server
app.listen(3000, () => {
    log.info('app now listening for requests on port 3000');
});