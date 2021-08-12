let dbPool = require("./db");

let libFunc = {
    getLibInfoData: function(callback) {
        dbPool.getConnection(function(err, conn) {
            if (err) {
                throw err;
            }

            conn.query(
                "SELECT li.*, u.userName FROM `TCLibInfo` li, `TCUser` u " +
                "WHERE li.libUserId = u.userId " +
                "ORDER BY li.libCreateDate DESC", function(err, res) {
                if (err) {
                    throw err;
                }

                console.log(res);

                callback(res);
                conn.release();
            });
        });
    }
};

module.exports = libFunc;
