const router = require("express").Router();
const dbFunc = require("../models/mysql");
const baseFunc = require("../utils/base");

router.post("/server/getLibChartData", async function(req, res) {
    let chartType = req.body.chartType;

    if (chartType === "pie") {
        let sql = "SELECT COUNT(*) AS count " +
                  "FROM TCLibInfo li " +
                  "WHERE li.libType = '基础模块'; " +
                  "SELECT COUNT(*) AS count " +
                  "FROM TCLibInfo li " +
                  "WHERE li.libType = '外设模块'; " +
                  "SELECT COUNT(*) AS count " +
                  "FROM TCLibInfo li " +
                  "WHERE li.libType = '处理器核'; " +
                  "SELECT COUNT(*) AS count " +
                  "FROM TCLibInfo li " +
                  "WHERE li.libType = '片上系统'; ";
        dbFunc.handleDBRecord(sql, function(resDB) {
            if (resDB.length === 4) {
                res.json({
                    code: 0,
                    data: [{
                        name: "基础模块",
                        value: resDB[0][0].count
                    }, {
                        name: "外设模块",
                        value: resDB[1][0].count
                    }, {
                        name: "处理器核",
                        value: resDB[2][0].count
                    }, {
                        name: "片上系统",
                        value: resDB[3][0].count
                    }]
                });
            }
            else {
                res.json({
                    code: 1,
                    data: [{
                        name: "基础模块",
                        value: 0
                    }, {
                        name: "外设模块",
                        value: 0
                    }, {
                        name: "处理器核",
                        value: 0
                    }, {
                        name: "片上系统",
                        value: 0
                    }]
                })
            }
        });
    }
    else if (chartType === "bar") {
        let xAxisData = [];
        let seriesData = [{
            type: "bar",
            name: "基础模块",
            emphasis: {
                focus: "series"
            },
            data: []
        }, {
            type: "bar",
            name: "外设模块",
            emphasis: {
                focus: "series"
            },
            data: []
        }, {
            type: "bar",
            name: "处理器核",
            emphasis: {
                focus: "series"
            },
            data: []
        }, {
            type: "bar",
            name: "片上系统",
            emphasis: {
                focus: "series"
            },
            data: []
        }];
        // 获取软件库被创建的月份信息（已做去重处理）
        // Get the month information of the software library created
        // (Duplicate content has been deleted)
        let sql = "SELECT DISTINCT(SUBSTRING(li.libCreateDate, 1, 7)) AS libDate " +
                  "FROM TCLibInfo li " +
                  "ORDER BY SUBSTRING(li.libCreateDate, 1, 7) ASC";
        let resDB = await dbFunc.handleDBRecordSync(sql);
        for (let i = 0; i < resDB.length; i++) {
            let libDate = resDB[i].libDate;
            xAxisData.push(libDate);
            // 获取每个月份下每种软件库的数量
            // Get the number of each software library in each month
            sql = "SELECT COUNT(*) AS count " +
                    "FROM TCLibInfo li " +
                    "WHERE li.libType = '基础模块' AND " +
                        "li.libCreateDate LIKE '" + libDate + "%'; " +
                    "SELECT COUNT(*) AS count " +
                    "FROM TCLibInfo li " +
                    "WHERE li.libType = '外设模块' AND " +
                        "li.libCreateDate LIKE '" + libDate + "%'; " +
                    "SELECT COUNT(*) AS count " +
                    "FROM TCLibInfo li " +
                    "WHERE li.libType = '处理器核' AND " +
                        "li.libCreateDate LIKE '" + libDate + "%'; " +
                    "SELECT COUNT(*) AS count " +
                    "FROM TCLibInfo li " +
                    "WHERE li.libType = '片上系统' AND " +
                        "li.libCreateDate LIKE '" + libDate + "%'; ";
            let resDBChild = await dbFunc.handleDBRecordSync(sql);
            if (resDBChild.length === 4) {
                seriesData[0].data.push(resDBChild[0][0].count);
                seriesData[1].data.push(resDBChild[1][0].count);
                seriesData[2].data.push(resDBChild[2][0].count);
                seriesData[3].data.push(resDBChild[3][0].count);
            }
        }
        res.json({
            code: 0,
            data: {
                xAxisData: xAxisData,
                seriesData: seriesData
            }
        });
    }
});

router.post("/server/getLibInfoData", async function(req, res) {
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
    let resDB = await dbFunc.handleDBRecordSync(sql);
    for (let i = 0; i < resDB.length; i++) {
        let obj = resDB[i];
        let libInfoId = obj.libId;
        sql = "SELECT lv.* " +
              "FROM TCLibVersion lv " +
              "WHERE lv.libInfoId = '" + libInfoId + "' " +
              "ORDER BY lv.libUpdateDate DESC";
        let resDBChild = await dbFunc.handleDBRecordSync(sql);
        let libVersion = [];
        let libVersionArr = [];
        libVersion = resDBChild;
        for (let j = 0; j < resDBChild.length; j++) {
            libVersionArr.push(resDBChild[j].libVersion);
        }
        obj.libVersion = libVersion;
        obj.libVersionArr = libVersionArr;

        let libRating = obj.libRating;
        let libRatingStr = baseFunc.keepDecimalForce(libRating, 2);
        obj.libRatingStr = libRatingStr;
    }

    if (resDB.length > 0) {
        res.json({
            code: 0,
            data: resDB
        });
    }
    else {
        res.json({
            code: 1,
            data: []
        });
    }
});

router.post("/server/getLibVersionData", async function(req, res) {
    let libId = req.body.libId;

    let sql = "SELECT lv.libVersion " +
              "FROM TCLibVersion lv " +
              "WHERE lv.libInfoId = '" + libId + "'";
    let resDB = await dbFunc.handleDBRecordSync(sql);

    if (resDB.length > 0) {
        res.json({
            code: 0,
            data: resDB
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
