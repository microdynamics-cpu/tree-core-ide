import base from "../js/base";

export default {
    getLibInfoData: function({commit}, params) {
        base.getDataFromServer("/api/getLibInfoData", params, function(res) {
            if (!res.code) {
                commit("getLibInfoData", {
                    order: params.order,
                    data: res.data.data
                });
            }
            else {

            }
        })
    }
}
