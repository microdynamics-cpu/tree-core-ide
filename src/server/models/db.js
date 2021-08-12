const mysql = require("mysql");

let dbPool = mysql.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "TreeCoreIDE"
});

module.exports = dbPool;
