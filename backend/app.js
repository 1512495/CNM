var express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    cors = require('cors');

var http = require('http').Server(app);
var io = require('socket.io')(http);

var userCtrl = require('./apiController/userCtrl');
var authRepo = require('./repo/authRepo');
var verifyAccessToken = require('./repo/authRepo').verifyAccessToken;

var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());

// app.use('/user', verifyAccessToken, userCtrl);
app.use('/user', userCtrl);

app.get('/login', (req, res) => {
    var userEntity = {
        Username: 1,
        Password: 'raw pwd'
    }
    var acToken = authRepo.generateAccessToken(userEntity);
    res.json({
        acToken
    });
})

app.get('/', function (req, res) {
    res.sendStatus(200);
});


var PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
    console.log(`API running on PORT ${PORT}`);
});

io.on('connection', (socket) => {
    console.log("A User connected");

    socket.on("disconnect", () => {
        console.log("User disconnected");
    })
})