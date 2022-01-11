import axios from "axios";

export default {
    // 服务端请求函数
    // Server request function
    getLibChartData: function({ commit }, params) {
        return axios.post("/server/getLibChartData", params).then((res) => {
            console.log(res);
            if (res && res.status === 200 && !res.data.code) {
                commit("getLibChartData", {
                    chartType: params.chartType,
                    data: res.data.data
                });
                return true;
            }
            else {
                return false;
            }
        });
    },
    getLibInfoData: function({ commit }, params) {
        return axios.post("/server/getLibInfoData", params).then((res) => {
            console.log(res);
            if (res && res.status === 200 && !res.data.code) {
                commit("getLibInfoData", {
                    funcType: params.funcType,
                    sortType: params.sortType,
                    tableOpt: params.tableOpt,
                    data: res.data.data
                });
                return true;
            }
            else {
                return false;
            }
        });
    },
    getLibVersionData: function({ commit }, params) {
        return axios.post("/server/getLibVersionData", params).then((res) => {
            console.log(res);
            if (res && res.status === 200 && !res.data.code) {
                commit("getLibVersionData", {
                    data: res.data.data
                });
                return true;
            }
            else {
                return false;
            }
        });
    },
    // 客户端请求函数
    // Client request function
    deleteLibManageData: function({ commit }, params) {
        return axios.post("/client/deleteLibManageData", params).then((res) => {
            console.log(res);
            if (res && res.status === 200 && !res.data.code) {
                return true;
            }
            else {
                return false;
            }
        });
    },
    getLibManageData: function({ commit }, params) {
        return axios.post("/client/getLibManageData", params).then((res) => {
            console.log(res);
            if (res && res.status === 200 && !res.data.code) {
                commit("getLibManageData", {
                    tableOpt: params.tableOpt,
                    data: res.data.data
                });
                return true;
            }
            else {
                return false;
            }
        });
    },
    getPrjDirData: function({ commit }, params) {
        return axios.post("/client/getPrjDirData", params).then((res) => {
            console.log(res);
            if (res && res.status === 200 && !res.data.code) {
                commit("getPrjDirData", {
                    data: res.data.data
                });
                return true;
            }
            else {
                return false;
            }
        });
    }
}
