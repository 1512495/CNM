var db = require('../fn/db');
var md5 = require('md5');

exports.loadAll = () => {
    var sql = `select * from user`;
    return db.load(sql);
}


exports.single = id => {
    var sql = `select * from user where id = ${id}`;
    return db.load(sql);
}

exports.add = (user) => {
    var password = md5(user.password);
    var sql = `insert into user(username, password, name, phone, sex, accountType_id, status) 
    values('${user.username}','${password}', '${user.name}', '${user.phone}',
     '${user.sex}', '${user.accountType_id}', '${user.status}')`;
    return db.save(sql);
}

exports.updateLocation = (user) => {
    var sql = `update user set latitude = ${user.lat}, longitude = ${user.long} where id = ${user.id}`;
    return db.save(sql);
}


exports.login = (user) => {
    var pass = md5(user.password);
    var sql = `select * from user where username = ${user.username} and password = ${pass}`;
    return db.load(sql);
}