# WSD


Very simple web application that presents an unauthenticated landing page, with an option for the user to login via WSD OAuth2 Identity Service, retrieve their user profile and display it in a server-rendered view, enhanced with a custom jQuery plugin. The User profiles stored in session and will be destroyed once the server restarted.

## Getting Started

Clone repository to local machine.

```
git clone https://github.com/zsargod/WSD.git
```

### Prerequisites

Required sofwares

```
Node v6.5
GIT bash
```

### Installing

Once project has cloned, from console run

```
npm install
```

To start the local server run (replace XXX with the respected value)

```
CLIENT_ID=XXX CLIENT_SECRET=XXX node app
```

Once the server started. Open Chrome browswer (or other major recent browser).
[Click here](http://localhost:3000)

## Running the tests

```
npm test
```

### Running coding style tests

The project uses the Airbnb ES6 code standards

```
npm run eslint
```

## Built With

Server side:
* [NodeJs](https://nodejs.org/dist/latest-v6.x/) - Platform
* [ExpressJs](https://expressjs.com/) - Web framework
* [PassportJs](http://www.passportjs.org/packages/passport-oauth2/) - OAUTH 2.0 Authentication strategy
* [Bunyan](https://www.npmjs.com/package/bunyan-logger) - Logging
* [Handlebars](https://www.npmjs.com/package/express-handlebars) - Templateing engine
* [Cookie-session](https://www.npmjs.com/package/cookie-session) - Session management

Client side:
* [jQuery](https://jquery.com/) - JS Framework
* [Bootstrap](https://getbootstrap.com/) - CSS Framework

## Authors

* **David Zsargo**
