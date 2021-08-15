const router = require("express").Router();
let deFunc = require("../models/index");

router.post("/api/getLibInfoData", function(req, res) {
    let order = req.body.order;
    let dbFieldObj = {
        download: "li.libDownloadNum",
        rating: "li.libRating"
    };
    let dbField = dbFieldObj[order];
    if (dbField == undefined) {
        dbField = "li.libCreateDate";
    }

    let sql = "SELECT li.*, ui.* " +
              "FROM TCLibInfo li LEFT JOIN TCUserInfo ui " +
              "ON li.libUserId = ui.userId " +
              "ORDER BY " + dbField + " DESC";
    deFunc.getDBRecord(sql, function(resDB) {
        if (resDB.length > 0) {
            res.json({
                code: 0,
                msg: "success",
                data: resDB
            })
        }
        else {
            res.json({
                code: 1,
                msg: "error",
                data: []
            });
        }
    });
});



module.exports = router;
