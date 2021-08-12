const router = require("express").Router();

router.get("/lib/brief/getLibInfoData", function(req, res) {
    res.send({
        test: 1
    });
});

module.exports = router;
