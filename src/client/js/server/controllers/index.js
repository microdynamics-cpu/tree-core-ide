const router = require("express").Router();
const path = require("path");
const jsonFunc = require("../models/json");

router.post("/client/getLibManageData", async function(req, res) {
    console.log(req.body);
    console.log(111);
});

module.exports = router;

// const fileName = path.resolve(__dirname, "../../json/lib.json");
