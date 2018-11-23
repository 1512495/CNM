var express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    cors = require('cors');
userRepo = require('./repo/userRepo');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var requestCtrl = require('./apiController/requestCtrl');
var userCtrl = require('./apiController/userCtrl');
var authRepo = require('./repo/authRepo');
var verifyAccessToken = require('./repo/authRepo').verifyAccessToken;


app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());


app.use('/user', verifyAccessToken, userCtrl);
//app.use('/user', userCtrl);
app.use('/request', verifyAccessToken, requestCtrl);

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


var listRequest;
var currentRequest;

function getPendingRequest() {
    userRepo.loadAll().then((res) => {
        listRequest = res;
    });
}


var rad = function (x) {
    return x * Math.PI / 180;
};

var getDistance = function (p1, p2) {
    if (p1.lat && p2.lat) {
        var R = 6378137; // Earth’s mean radius in meter
        var dLat = rad(p2.lat - p1.lat);
        var dLong = rad(p2.lng - p1.lng);
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) *
            Math.sin(dLong / 2) * Math.sin(dLong / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d; // returns the distance in meter
    }
    else {
        var R = 6378137; // Earth’s mean radius in meter
        var dLat = rad(p2.lat() - p1.lat());
        var dLong = rad(p2.lng() - p1.lng());
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(rad(p1.lat())) * Math.cos(rad(p2.lat())) *
            Math.sin(dLong / 2) * Math.sin(dLong / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d; // returns the distance in meter
    }
};


var driverList = [];
var currentDriver;

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
        if (data.status == 1) {
            driverList.push(data);
        }
        getPendingRequest();
        if (listRequest) {
            console.log(listRequest[1]);
        }
    });
})