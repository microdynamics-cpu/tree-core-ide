let dbPool = require("./db");

let dbFunc = {
    handleDBRecord: function(sql, callback) {
        dbPool.getConnection(function(err, conn) {
            if (err) {
                throw err;
            }
            console.log(sql);
            console.log("\n");
            conn.query(sql, function(err, res) {
                if (err) {
                    throw err;
                }
                console.log(res);
                console.log("\n");
                callback(res);
                conn.release();
            });
        });
    },
    handleDBRecordSync: function(sql) {
        return new Promise((resolve, reject) => {
            dbPool.getConnection(function(err, conn) {
                if (err) {
                    reject(err);
                }
                else {
                    console.log(sql);
                    console.log("\n");
                    conn.query(sql, function(err, res) {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(res);
                        }
                    });
                    conn.release();
                }
            });
        });
    },
    handleDBRecordByParams: function(sql, params, callback) {
        dbPool.getConnection(function(err, conn) {
            if (err) {
                throw err;
            }
            console.log(sql);
            console.log("\n");
            conn.query(sql, params, function(err, res) {
                if (err) {
                    throw err;
                }
                console.log(res);
                console.log("\n");
                callback(res);
                conn.release();
            });
        });
    },
    handleDBRecordByParamsSync: function(sql, params) {
        return new Promise((resolve, reject) => {
            dbPool.getConnection(function(err, conn) {
                if (err) {
                    reject(err);
                }
                else {
                    console.log(sql);
                    console.log("\n");
                    conn.query(sql, params, function(err, res) {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(res);
                        }
                    });
                    conn.release();
                }
            });
        });
    },
};

module.exports = dbFunc;
