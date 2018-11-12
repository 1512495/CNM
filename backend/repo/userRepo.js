var db = require('../fn/db');


exports.loadAll = () => {
    var sql = `select * from user`;
    return db.load(sql);
}


exports.single = id => {
    var sql = `select * from user where id = ${id}`;
    return db.load(sql);
}

exports.add = (user) => {
    var sql = `insert into user(username, password, name, accountType_id, status) values('${user.username}','${user.password}', '${user.name}', '${user.accountType_id}', '${user.status}')`;
    return db.save(sql);
}