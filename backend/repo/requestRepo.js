var db = require('../fn/db');


exports.loadAll = () => {
    var sql = `select * from request`;
    return db.load(sql);
}


exports.loadChuaDinhVi = () => {
    var sql = `select * from request where status = 0`;
    return db.load(sql);
}

exports.add = (request) => {
    var sql = `insert into request(name, phone, address, note) values('${request.name}','${request.phone}', '${request.address}', '${request.note}')`;
    return db.save(sql);
}


exports.updateCoordinate = (request) => {
    console.log(request.reserve_geocode_address);
    var sql = `update request set status = ${request.status}, latitude = ${request.latitude}, longitude = ${request.longitude}, reserve_geocode_address = '${request.reserve_geocode_address}' where id = ${request.id}`;
    return db.save(sql);
}