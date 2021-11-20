const express = require('express');
const {engine} = require('express-handlebars');
const methodOverride = require('method-override');
const {handleError} = require("./utils/errors");
const {clientRouter} = require("./routers/client");
const {homeRouter} = require("./routers/home");

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.urlencoded({
  extended: true,
}));
app.engine('.hbs', engine({
  extname: '.hbs',
}));
app.set('view engine', '.hbs');

app.use('/', homeRouter);
app.use('/client', clientRouter);

app.use(handleError)


app.listen(3000, 'localhost', () => console.log('App is working'));