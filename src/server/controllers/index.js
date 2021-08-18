const router = require("express").Router();
let deFunc = require("../models/index");

router.post("/api/getLibInfoData", function(req, res) {
    let searchKey = req.body.searchKey;
    let searchVal = req.body.searchVal;
    let sortType = req.body.sortType;

    let sqlWhereTemp = "";
    if (searchKey !== "") {
        let sqlWhereFieldObj = {
            name: {
                name: "li.libName",
                type: "varchar"
            },
            author: {
                name: "ui.userName",
                type: "varchar"
            },
            type: {
                name: "li.libType",
                type: "varchar"
            },
            download: {
                name: "li.libDownloadNum",
                type: "int"
            },
            rating: {
                name: "li.libRating",
                type: "float"
            }
        };
        let sqlWhereField = sqlWhereFieldObj[searchKey].name;
        let sqlWhereFieldType = sqlWhereFieldObj[searchKey].type;
        if (sqlWhereFieldType === "varchar") {
            sqlWhereTemp = sqlWhereField + " LIKE '%" + searchVal + "%' ";
        }
        else if (sqlWhereFieldType === "int" ||
                 sqlWhereFieldType === "float") {
            sqlWhereTemp = sqlWhereField + " = " + searchVal + " ";
        }
    }
    else {
        sqlWhereTemp = "1 = 1 ";
    }
    let sqlWhere = "WHERE " + sqlWhereTemp;

    let sqlSortFieldObj = {
        download: "li.libDownloadNum",
        rating: "li.libRating"
    };
    let sqlSortField = sqlSortFieldObj[sortType];
    if (sqlSortField == undefined) {
        sqlSortField = "li.libCreateDate";
    }
    let sqlSort = "ORDER BY " + sqlSortField + " DESC";

    let sql = "SELECT li.*, ui.* " +
              "FROM TCLibInfo li LEFT JOIN TCUserInfo ui " +
              "ON li.libUserId = ui.userId " + sqlWhere + sqlSort;
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

router.post("/api/getLibChartData", function(req, res) {
    let chartType = req.body.chartType;

    if (chartType === "pie") {
        let sql = "SELECT COUNT(*) " +
                  "FROM TCLibInfo li " +
                  "WHERE li.libType = '基础模块'; " +
                  "SELECT COUNT(*) " +
                  "FROM TCLibInfo li " +
                  "WHERE li.libType = '外设模块'; " +
                  "SELECT COUNT(*) " +
                  "FROM TCLibInfo li " +
                  "WHERE li.libType = '处理器核'; " +
                  "SELECT COUNT(*) " +
                  "FROM TCLibInfo li " +
                  "WHERE li.libType = '片上系统'; ";
        deFunc.getDBRecord(sql, function(resDB) {
            if (resDB.length === 4) {
                res.json({
                    code: 0,
                    msg: "success",
                    data: [{
                        name: "基础模块",
                        value: resDB[0][0]["COUNT(*)"]
                    },{
                        name: "外设模块",
                        value: resDB[1][0]["COUNT(*)"]
                    },{
                        name: "处理器核",
                        value: resDB[2][0]["COUNT(*)"]
                    },{
                        name: "片上系统",
                        value: resDB[3][0]["COUNT(*)"]
                    }]
                });
            }
            else {
                res.json({
                    code: 1,
                    msg: "error",
                    data: [{
                        name: "基础模块",
                        value: 0
                    },{
                        name: "外设模块",
                        value: 0
                    },{
                        name: "处理器核",
                        value: 0
                    },{
                        name: "片上系统",
                        value: 0
                    }]
                })
            }
        });
    }
    else if (chartType === "bar") {

    }
});

module.exports = router;
