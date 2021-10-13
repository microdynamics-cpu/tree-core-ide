const sqlite = require("sqlite3");

let db = null;

module.exports = {
    openDB: function(fileName) {
        db = new sqlite.Database(fileName, function(err) {
            if (err) {
                throw err;
            }
        });
    },
    closeDB: function() {
        db.close(function(err) {
            if (err) {
                throw err;
            }
        });
    },
    handleDBRecordMultip: function(sqls, callback) {
        console.log(sqls);
        db.exec(sqls, function(err) {
            if (err) {
                throw err;
            }
            console.log("success");
            callback();
        });
    },
    handleDBRecordMultipSync: function(sqls, callback) {
        db.serialize(function() {
            console.log(sqls);
            db.exec(sqls, function(err) {
                if (err) {
                    throw err;
                }
                console.log("success");
                callback();
            });
        });
    },
    handleDBRecordSingle: function(sql, callback) {
        console.log(sql);
        db.all(sql, function(err, rows) {
            if (err) {
                throw err;
            }
            console.log(rows);
            callback(rows);
        });
    },
    handleDBRecordSingleSync: function(sql, callback) {
        db.serialize(function() {
            console.log(sql);
            db.all(sql, function(err, rows) {
                if (err) {
                    throw err;
                }
                console.log(rows);
                callback(rows);
            });
        });
    }
};
