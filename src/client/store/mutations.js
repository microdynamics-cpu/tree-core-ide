export default {
    getLibInfoData: function(state, { funcType, sortType, tableOpt, data }) {
        let tableData = [];

        for (let i = 0; i < data.length; i++) {
            let dataObj = data[i];
            let tableObj = {};
            if (funcType === "rank") {
                let value = "";
                if (sortType === "download") {
                    value = dataObj.libDownloadNum;
                }
                else if (sortType === "rating") {
                    value = dataObj.libRating;
                }
                tableObj = dataObj;
                tableObj.libValue = value;
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
                        name: "",
                        value: ""
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
    getLibChartData: function(state, { chartType, data }) {
        if (chartType === "pie") {
            state.libChartPieData = data;
        }
        else if (chartType === "bar") {
            state.libChartBarXAxisData = data.xAxisData;
            state.libChartBarData = data.seriesData;
        }
    }
}
