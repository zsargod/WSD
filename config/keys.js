'use strict';

const baseUrl = 'https://staging-auth.wallstreetdocs.com/oauth';

module.exports = {
    profileUrl: `${baseUrl}/userinfo`,
    oauth2: {
        authorizationURL: `${baseUrl}/authorize`,
        tokenURL: `${baseUrl}/token`,
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: 'http://localhost:3000'
    },
    session: {
        cookieKey: process.env.COOKIE_KEY || 'wallstreetdocssecretkey'
    }
};
