const passport = require('passport');
const OAuth2Strategy = require('passport-oauth2').Strategy;

passport.use(
    new OAuth2Strategy({
        authorizationURL: 'https://staging-auth.wallstreetdocs.com/oauth/authorize',
        tokenURL: 'https://staging-auth.wallstreetdocs.com/oauth/token',
        clientID: process.env.clientId || '',
        clientSecret: process.env.clientSecret || '',
        callbackURL: "http://localhost:3000"
    },
    function(accessToken, refreshToken, profile, cb) {
        return cb(null, profile);
    }
));

module.exports = passport;