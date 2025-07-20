const mysql2 = require('mysql2');

const {port, host, password, user, database, queueLimit} = require("../config/Config")

const pool = mysql2.createPool({
    connectionLimit: 10,
    host,
    user,
    password,
    database,
    queueLimit
});


module.exports = pool;