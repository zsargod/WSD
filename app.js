const express = require('express');
const expressHandlebars = require('express-handlebars');
const app = express();

app.engine('handlebars', expressHandlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use('/assets', express.static('assets'));

app.get('/', (req, res) => {
    res.render('home');
});

app.listen(3000, () => {
    console.log('app now listening for requests on port 3000');
});