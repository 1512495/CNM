var express = require('express'),
    userRepo = require('../repo/userRepo');

var router = express.Router();

router.get('/', (req, res) => {
    userRepo.loadAll()
    .then(rows => {
        res.json(rows)
    })
    .catch(err => {
        res.statusCode = 500;
        res.end('View error log on console');
    })
    
})


router.get('/address', (req, res)=> {
    userRepo.getAddress()
    .then(rows => {
        res.json(rows)
    })
    .catch(err => {
        res.statusCode = 500;
        res.end('View error log on console');
    })
})


router.get('/:sdt', (req, res) => {
    var sdt = req.params.sdt;
    userRepo.single(sdt).then(row => {
        res.json({
            row
        });
    });
})


router.post('/', (req, res) => {

    var user = {
        ho_ten: req.body.ho_ten,
        sdt: req.body.sdt,
        dia_chi: req.body.dia_chi,
        ghi_chu: req.body.ghi_chu
    }
    console.log(user);

    userRepo.add(user)
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