var express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    cors = require('cors');
requestRepo = require('./repo/requestRepo');
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
    getPendingRequest();
});


var listRequest = [];
var currentRequest;

function getPendingRequest() {
    requestRepo.loadAll().then((res) => {
        for (let i = 0; i < res.length; i++) {
            if (res[i].status == 1) {
                listRequest.push(res[i]);
            }
        }
    });
}

setInterval(function () {
    getPendingRequest();
    if (listRequest) {
        currentRequest = listRequest[0];
        sendRequestToDriver(listRequest[0]);
    }
}, 15000);

async function sendRequestToDriver(request) {
    currentDriver = await getClosestDriver(request);
    await socket.broadcast.emit("request for driver", { driverId: 2, request: request });
}

function getClosestDriver(request) {
    if (driverList.length > 0) {
        let min = getDistance(driverList[0].lat, driverList[0].lng, request.latitude, request.longitude);
        currentDriver = driverList[0];
        for (let i = 0; i < driverList.length; i++) {
            if (min < getDistance(driverList[i].lat, driverList[i].lng, request.latitude, request.longitude)) {
                currentDriver = driverList[i];
            }
        }
    }
    return currentDriver;
}


var rad = function (x) {
    return x * Math.PI / 180;
};

var getDistance = function (p1lat, p1lng, p2lat, p2lng) {
    var R = 6378137; // Earth’s mean radius in meter
    var dLat = rad(p2lat - p1lat);
    var dLong = rad(p2lng - p1lng);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(rad(p1lat)) * Math.cos(rad(p2lat)) *
        Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d; // returns the distance in meter
};


var driverList = [];
var currentDriver;
const STATUS_READY = 1;
const STATUS_NOT_READY = 0;

io.on('connection', (socket) => {

    console.log("A User connected");

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
    socket.on("submit", () => {
        getPendingRequest();
        console.log("Submitted an address");
        socket.broadcast.emit('new address added');
    });
    socket.on("driver status", (data) => {
        if (data.status == STATUS_READY) {
            driverList.push(data);
        }
        if (data.status == STATUS_NOT_READY) {
            for (let i = 0; i < driverList.length; i++) {
                if (data.id == driverList[i].id) {
                    driverList.pop(i);
                }
            }
        }
        if (listRequest) {
            console.log(listRequest[1]);
        }
    });

    socket.on("driver accept request", (data) => {
        console.log("Tài xế đã nhận");
        console.log(data);
        for (let i = 0; i < driverList.length; i++) {
            if (data.id == driverList[i].id) {
                driverList.pop(i);
            }
        }
    });
    socket.on("driver decline request", (data) => {
        console.log("Tài xế đã từ chối");
        console.log(data);
    });
})