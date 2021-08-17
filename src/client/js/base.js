import axios from "axios";

export default {
    getDataFromServer: function(url, params, callback) {
        axios.post(url, params).then((res) => {
            console.log(res);
            callback(res);
        }).catch((err) => {
            console.log(err);
        });
    }
};
