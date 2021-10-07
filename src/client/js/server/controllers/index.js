const router = require("express").Router();
const path = require("path");
const jsonFunc = require("../models/json");

router.post("/client/getLibManageData", async function(req, res) {
    let searchKey = req.body.searchKey;
    let searchVal = req.body.searchVal;

    const fileName = path.resolve(__dirname, "../../../json/lib.json");

    let resJSON = [];
    if (searchKey === "libName") {
        resJSON = jsonFunc.getJSONDataByField(fileName,
                                              "like",
                                              searchKey,
                                              searchVal);
    }
    resJSON = jsonFunc.handleJSONDataOrder(resJSON,
                                           "libDate",
                                           "date",
                                           "desc");

    if (resJSON.length > 0) {
        res.json({
            code: 0,
            data: resJSON
        });
    }
    else {
        res.json({
            code: 1,
            data: []
        });
    }
});

module.exports = router;
