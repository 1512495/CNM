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


router.get('/:id', (req, res)=> {
    var id = +req.params.id;
    userRepo.single(id)
    .then(row => {
        res.json(row)
    })
    .catch(err => {
        res.statusCode = 500;
        res.end('View error log on console');
    })
})


router.post('/', (req, res) => {

    var user = {
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        phone: req.body.phone,
        sex: req.body.sex,
        accountType_id: 1,
        status: 0
    }
    console.log(user);

    userRepo.add(user)
    .then(value => {
        res.statusCode = 201;
        res.json({
            msg: 'register success'
        })
    })
    .catch(err => {
        res.statusCode = 500;
        res.end('View error log on console');
    })
})


router.get('/login', (req, res) => {

    var user = {
        username: req.body.username,
        password: req.body.password
    }
    userRepo.login(user)
    .then(row => {
         if (row.length > 0) {
            res.json({
                msg: 'login success'
            })
        }
    })
    .catch(err => {
        res.statusCode = 500;
        res.end('View error log on console');
    })
})

module.exports = router;