const mysql = require("mysql");

let dbPool = mysql.createPool({
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "root",
    database: "TreeCoreIDE",
    multipleStatements: true
});

module.exports = dbPool;
