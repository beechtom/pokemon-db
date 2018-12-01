var mysql = require('mysql');

// Connect mySQL
var pool  = mysql.createPool({
    host    : 'classmysql.engr.oregonstate.edu',
    user    : 'cs340_beecht',
    password: '4518',
    database: 'cs340_beecht',
    multipleStatements: true,
});

module.exports = pool;