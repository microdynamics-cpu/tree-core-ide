import axios from "axios";

export default {
    getLibInfoData: function({ commit }, params) {
        return axios.post("/api/getLibInfoData", params).then((res) => {
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
    }
}
