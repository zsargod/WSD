const request = require('request');
const passport = require('passport');
const OAuth2Strategy = require('passport-oauth2').Strategy;
const keys = require('./keys');
const profileStorage = require('./profile-storage');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const user = profileStorage.fetch(id) || {};
  done(null, user);
});

passport.use(
  new OAuth2Strategy(keys.oauth2,
    ((accessToken, refreshToken, profile, done) => {
      const options = {
        url: keys.profileUrl,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      new Promise((resolve, reject) => {
        request(options, (error, response, body) => {
          if (!error && response.statusCode === 200) {
            resolve(JSON.parse(body));
          } else {
            reject(error);
          }
        });
      }).then((fetchedProfile) => {
        profileStorage.save(fetchedProfile);
        done(null, fetchedProfile);
      }, error => done(error, null));
    })),
);

module.exports = passport;
