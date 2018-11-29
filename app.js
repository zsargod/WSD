const express = require('express');
const expressHandlebars = require('express-handlebars');
const passport = require('./config/passport-oauth2');
const app = express();

app.engine('handlebars', expressHandlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use('/assets', express.static('assets'));

app.get('/home', (req, res) => {
    res.render('home');
});

app.get('/profile', (req, res) => {
    res.render('profile');
});

app.get('/auth',
    passport.authenticate('oauth2'));

app.get('/', (req, res, next) => {
    if(req.query.code) {
        passport.authenticate('oauth2', function(err, user, info) {
            if (err) { return next(err); }
            if (!user) { return res.redirect('/home'); }
            return res.redirect('/profile');
        })(req, res, next);
    } else {
        res.redirect('/home');
    }
});

app.listen(3000, () => {
    console.log('app now listening for requests on port 3000');
});