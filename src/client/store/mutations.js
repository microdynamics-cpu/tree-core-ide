export default {
    getLibInfoData(state, {order, data}) {
        let libRankTableItems = [];
        for (let i = 0; i < 10; i++) {
            let obj = data[i];
            let name = "";
            let value = "";
            if(obj !== undefined) {
                name = obj.libName;
                value = obj.libDownloadNum;
                if (order === "rating") {
                    value = obj.libRating;
                }
            }
            let item = {
                name: name,
                value: value
            };
            libRankTableItems.push(item);
        }
        state.libRankTableItems = libRankTableItems;
    }
}
