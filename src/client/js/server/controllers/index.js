const router = require("express").Router();
const path = require("path");
const jsonFunc = require("../models/json");

const fileNameLib = path.resolve(__dirname, "../../../json/lib.json");
const fileNamePrj = path.resolve(__dirname, "../../../json/prj.json");

router.post("/client/deleteLibManageData", async function(req, res) {
    let id = req.body.id;
    let resJSON = jsonFunc.deleteJSONDataById(fileNameLib, id);
    if (resJSON) {
        res.json({
            code: 0
        });
    }
    else {
        res.json({
            code: 1
        })
    }
});
router.post("/client/getLibManageData", async function(req, res) {
    let searchKey = req.body.searchKey;
    let searchVal = req.body.searchVal;

    let resJSON = [];
    if (searchKey === "libName") {
        resJSON = jsonFunc.getJSONDataByField(fileNameLib,
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
router.post("/client/getPrjDirData", async function(req, res) {
    let resJSON = jsonFunc.getJSONDataByOrder(fileNamePrj,
                                              "prjDate",
                                              "date",
                                              "desc")
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
