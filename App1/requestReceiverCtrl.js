var express = require('express'),
    moment = require('moment'),
    low = require('lowdb'),
    fileSync = require('lowdb/adapters/FileSync');

var adapter = new fileSync('./db.json');
var db = low(adapter);

var router = express.Router();

router.get('/', (req, res) => {
   
    var requests = db.get('requests');
    
    res.json({
        requests
    });
})


router.get('/:phone', (req, res) => {
    var phone = req.params.phone;
    var products = db.get('requests').find({phone: phone}).get('address');
    res.json(products);
})


router.post('/', (req, res) => {
    var obj = {
        name: req.body.name,
        phone: req.body.phone,
        address: req.body.address,
        note: req.body.note
    }

    db.get('requests').push(obj).write();

    res.statusCode = 201;
    res.json({
        msg: 'added'
    });
})

module.exports = router;