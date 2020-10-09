const express = require('express');
const app = express();

const path = require('path');

// settings 
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

// static files
app.use(express.static(path.join(__dirname, 'public')));
/*app.use(express.json());
app.use(express.urlencoded({ extended: false }));*/

// routes
app.use(require('./routes/index').router);   

// starting the server
module.exports = app;