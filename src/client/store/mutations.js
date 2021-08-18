export default {
    getLibInfoData: function(state, { funcType, sortType, tableOpt, data }) {
        let tableItems = [];

        for (let i = 0; i < data.length; i++) {
            let dataObj = data[i];
            let tableItem = {};
            if (funcType === "rank") {
                let value = "";
                if (sortType === "download") {
                    value = dataObj.libDownloadNum;
                }
                else if (sortType === "rating") {
                    value = dataObj.libRating;
                }
                tableItem = {
                    name: dataObj.libName,
                    value: value
                }
            }
            else if (funcType === "search") {
                tableItem = {
                    name: dataObj.libName,
                    author: dataObj.userName,
                    type: dataObj.libType,
                    download: dataObj.libDownloadNum,
                    rating: dataObj.libRating
                }
            }
            tableItems.push(tableItem);
        }

        if (funcType === "rank") {
            if (tableItems.length >= 10) {
                tableItems = tableItems.slice(0, 10);
            }
            else {
                for (let i = tableItems.length; i < 10; i++) {
                    tableItems.push({
                        name: "",
                        value: ""
                    });
                }
            }
            state.libRankTableItems = tableItems;
        }
        else if (funcType === "search") {
            let tableCount = tableItems.length;
            const { sortBy, sortDesc, page, itemsPerPage } = tableOpt;
            if (itemsPerPage > 0) {
                tableItems = tableItems.slice((page - 1) * itemsPerPage,
                                               page * itemsPerPage);
            }
            state.libSearchTableItem = tableItems;
            state.libSearchTableCount = tableCount;
        }
    },
    getLibChartData: function(state, { chartType, data }) {
        if (chartType === "pie") {
            state.libChartPieOptsData = data;
        }
        else if (chartType === "bar") {
            state.libChartBarOptsData = data;
        }
    }
}
