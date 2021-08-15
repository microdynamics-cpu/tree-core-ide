let dbPool = require("./db");

let dbFunc = {
    handleDBRecord: function(sql, callback) {
        dbPool.getConnection(function(err, conn) {
            if (err) {
                throw err;
            }
            let query = conn.query(sql, function(err, res) {
                if (err) {
                    throw err;
                }
                console.log(res);
                console.log("\n");
                callback(res);
                conn.release();
            });
            console.log(query.sql);
        });
    },
    handleDBRecordByParams: function(sql, params, callback) {
        dbPool.getConnection(function(err, conn) {
            if (err) {
                throw err;
            }
            let query = conn.query(sql, params, function(err, res) {
                if (err) {
                    throw err;
                }
                console.log(res);
                console.log("\n");
                callback(res);
                conn.release();
            });
            console.log(query.sql);
        });
    },
    addDBRecord: function(sql, callback) {
        this.handleDBRecord(sql, callback);
    },
    addDBRecordByParams: function(sql, params, callback) {
        this.handleDBRecordByParams(sql, params, callback);
    },
    deleteDBRecord: function(sql, callback) {
        this.handleDBRecord(sql, callback);
    },
    deleteDBRecordByParams: function(sql, params, callback) {
        this.handleDBRecordByParams(sql, params, callback);
    },
    getDBRecord: function(sql, callback) {
        this.handleDBRecord(sql, callback);
    },
    getDBRecordByParams: function(sql, params, callback) {
        this.handleDBRecordByParams(sql, params, callback);
    },
    updateDBRecord: function(sql, callback) {
        this.handleDBRecord(sql, callback);
    },
    updateDBRecordByParams: function(sql, params, callback) {
        this.handleDBRecordByParams(sql, params, callback);
    }
};

module.exports = dbFunc;
