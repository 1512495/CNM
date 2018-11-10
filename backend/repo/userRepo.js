var db = require('../fn/db');


exports.loadAll = () => {
    var sql = `select * from user`;
    return db.load(sql);
}

exports.getAddress = () => {
    var sql = `select dia_chi from user`;
    return db.load(sql);
}

exports.single = sdt => {
    var sql = `select * from user where sdt = ${sdt}`;
    return db.load(sql);
}

exports.add = (user) => {
    var sql = `insert into user(ho_ten, sdt, dia_chi, ghi_chu) values('${user.ho_ten}','${user.sdt}', '${user.dia_chi}', '${user.ghi_chu}')`;
    return db.save(sql);
}