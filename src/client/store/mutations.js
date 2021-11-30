export default {
    // 服务端处理函数
    // Server handle function
    getLibChartData: function(state, { chartType, data }) {
        if (chartType === "pie") {
            state.libChartPieData = data;
        }
        else if (chartType === "bar") {
            state.libChartBarXAxisData = data.xAxisData;
            state.libChartBarData = data.seriesData;
        }
    },
    getLibInfoData: function(state, { funcType, sortType, tableOpt, data }) {
        let tableData = [];

        for (let i = 0; i < data.length; i++) {
            let dataObj = data[i];
            let tableObj = {};
            if (funcType === "rank") {
                let valueStr = "";
                if (sortType === "download") {
                    valueStr = dataObj.libDownloadNum + "";
                }
                else if (sortType === "rating") {
                    valueStr = dataObj.libRatingStr;
                }
                tableObj = dataObj;
                tableObj.libValueStr = valueStr;
            }
            else if (funcType === "search") {
                tableObj = dataObj;
            }
            tableData.push(tableObj);
        }

        if (funcType === "rank") {
            if (tableData.length >= 10) {
                tableData = tableData.slice(0, 10);
            }
            else {
                for (let i = tableData.length; i < 10; i++) {
                    tableData.push({
                        libName: "",
                        libValueStr: ""
                    });
                }
            }
            state.libRankTableData = tableData;
        }
        else if (funcType === "search") {
            let tableCount = tableData.length;
            const { sortBy, sortDesc, page, itemsPerPage } = tableOpt;
            if (itemsPerPage > 0) {
                tableData = tableData.slice((page - 1) * itemsPerPage,
                                             page * itemsPerPage);
            }
            state.libSearchTableData = tableData;
            state.libSearchTableCount = tableCount;
        }
    },
    getLibVersionData: function(state, { data }) {
        let libVersionArr = [];
        for (let i = 0; i < data.length; i++) {
            libVersionArr.push(data[i].libVersion);
        }
        state.libVersionItems = libVersionArr;
    },
    // 客户端处理函数
    // Client handle function
    getLibManageData: function(state, { tableOpt, data }) {
        let tableData = data;
        let tableCount = data.length;
        const { sortBy, sortDesc, page, itemsPerPage } = tableOpt;
        if (itemsPerPage > 0) {
            tableData = tableData.slice((page - 1) * itemsPerPage,
                                         page * itemsPerPage);
        }
        state.libManageTableData = tableData;
        state.libManageTableCount = tableCount;
    },
    getPrjDirData: function(state, { data }) {
        let prjDirArr = [];
        for (let i = 0; i < data.length; i++) {
            prjDirArr.push(data[i].prjDir);
        }
        state.libPrjDirItems = prjDirArr;
    }
}
