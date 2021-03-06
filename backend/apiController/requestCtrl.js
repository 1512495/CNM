var express = require('express'),
    requestRepo = require('../repo/requestRepo');

var router = express.Router();

router.get('/', (req, res) => {
    requestRepo.loadAll()
        .then(rows => {
            res.json(rows)
        })
        .catch(err => {
            res.statusCode = 500;
            res.end('View error log on console');
        })

})

router.post('/update', (req, res) => {
    console.log(req.body);
    var request = {
        id: req.body.user_id,
        status: 1,
        latitude: req.body.lat,
        longitude: req.body.long,
        reserve_geocode_address: req.body.reserve_geocode_address,
    }

    requestRepo.updateCoordinate(request)
        .then(value => {
            res.statusCode = 201;
            res.json({
                msg: 'added'
            })
        })
        .catch(err => {
            res.statusCode = 500;
            res.end('View error log on console');
        })
})

router.post('/', (req, res) => {

    var request = {
        name: req.body.name,
        phone: req.body.phone,
        address: req.body.address,
        note: req.body.note
    }

    requestRepo.add(request)
        .then(value => {
            res.statusCode = 201;
            res.json({
                msg: 'added'
            })
        })
        .catch(err => {
            res.statusCode = 500;
            res.end('View error log on console');
        })
})





module.exports = router;