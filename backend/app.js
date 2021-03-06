var express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    cors = require('cors');
var session = require('express-session');
var requestRepo = require('./repo/requestRepo');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var requestCtrl = require('./apiController/requestCtrl');
var userCtrl = require('./apiController/userCtrl');
var authRepo = require('./repo/authRepo');
var requestRepo = require('./repo/requestRepo');
var verifyAccessToken = require('./repo/authRepo').verifyAccessToken;


app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))


app.use('/user', verifyAccessToken, userCtrl);
app.use('/request', verifyAccessToken, requestCtrl);

app.get('/login', (req, res) => {
    var userEntity = {
        username: 1,
        password: 'raw pwd',
    }
    var acToken = authRepo.generateAccessToken(userEntity);
    res.json({
        acToken
    });
})


// app.get('/moi', (req, res) => {
//     console.log("ss: " + req.session.profileName);
//     if(req.session.profileName) {

//         res.json({
//             status: 1
//         })
//     } else {
//         res.json({
//             status: 0
//         })
//     }

// });

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

setInterval(async () => {
    if (listRequest.length == 0) {
        await getPendingRequest();
    }
    if (listRequest) {
        currentRequest = await listRequest[0];
        await sendRequestToDriver(listRequest[0]);
        await console.log(currentRequest);
    }
}, 20000);

async function sendRequestToDriver(request) {
    if (driverList) {
        currentDriver = await getClosestDriver(request);
        for (let i = 0; i < driverList.length; i++) {
            if (driverList[i].id == currentDriver.id) {
                await io.sockets.emit("request for driver", { driverId: currentDriver.id, request: request });
            }
            else {
                console.log("Cannot found")
            }
        }
    }
}

function getClosestDriver(request) {
    console.log(driverList);
    if (driverList.length > 0) {
        let min = getDistance(driverList[0].lat, driverList[0].lng, request.latitude, request.longitude);
        currentDriver = driverList[0];
        if (driverList.length > 1) {
            for (let i = 0; i < driverList.length; i++) {
                if (min < getDistance(driverList[i].lat, driverList[i].lng, request.latitude, request.longitude)) {
                    currentDriver = driverList[i];
                }
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
                    driverList.splice(i, 1);
                }
            }
        }
    });

    socket.on("driver accept", (data) => {
        for (let i = 0; i < listRequest.length; i++) {
            if (currentRequest.id == listRequest[i].id) {
                requestRepo.updateStatus({ id: currentRequest.id, status: 2 });
                listRequest.splice(i, 1);
            }
        }

        for (let i = 0; i < driverList.length; i++) {
            if (data.id == driverList[i].id) {
                driverList.splice(i, 1);
            }
        }
        socket.broadcast.emit('new address added');
    });
    socket.on("driver decline", (data) => {
        for (let i = 0; i < driverList.length; i++) {
            if (data.id == driverList[i].id) {
                driverList.splice(i, 1);
            }
        }
        socket.broadcast.emit('new address added');
    });

    socket.on("driver done", (data) => {
        console.log("Tài xế đã thực hiện xong");
        console.log(data);
        requestRepo.updateStatus({ id: data.request.id, status: 4 });
        socket.broadcast.emit('new address added');
        getPendingRequest();
    });
})