var express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    cors = require('cors');

var userCtrl = require('./apiController/userCtrl');

var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());

app.use('/user', userCtrl);

var PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`API running on PORT ${PORT}`);
});