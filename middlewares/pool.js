var mysql = require('mysql');

// Connect mySQL
var pool  = mysql.createPool({
    host    : '*******************',
    user    : '*******************',
    password: '*******************',
    database: '*******************',
    multipleStatements: true,
});

module.exports = pool;
