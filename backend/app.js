var express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    cors = require('cors');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var requestCtrl = require('./apiController/requestCtrl');
var userCtrl = require('./apiController/userCtrl');
var authRepo = require('./repo/authRepo');
var verifyAccessToken = require('./repo/authRepo').verifyAccessToken;



app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());

// app.use('/user', verifyAccessToken, userCtrl);
app.use('/user', userCtrl);
app.use('/request', requestCtrl);

app.get('/login', (req, res) => {
    var userEntity = {
        username: 1,
        password: 'raw pwd',
        name: 'Tấn Phan',
        accountType: 1,
        status: 0
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
    });
    socket.on("submit", () => {
        console.log("Submitted an address");
        socket.broadcast.emit('new address added');
    });
    socket.on("driver status", (data) => {
        console.log(data);
    })
})