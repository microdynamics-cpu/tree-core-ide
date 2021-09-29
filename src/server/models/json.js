let fs = require("fs");
let $ = require("jquery");

module.exports = {
    getJSONDataAll: function(fileName) {
        const jsonArr = JSON.parse(fs.readFileSync(fileName, "utf-8"));
        return jsonArr.filter(v => !v.isDelete);
    },
    getJSONDataById: function(fileName, id) {
        const jsonArr = this.getJSONDataAll(fileName);
        const jsonFilterArr = jsonArr.filter(v => {
            return v.id = id
        });
        if (jsonFilterArr[0]) {
            return jsonFilterArr[0];
        }
        else {
            return false;
        }
    },
    deleteJSONDataById: function(fileName, id) {
        const jsonArr = this.getJSONDataAll(fileName);
        const jsonFilterArr = jsonArr.filter(v => {
            return v.id = id
        });
        if (jsonFilterArr[0]) {
            jsonFilterArr[0].isDelete = true;
            fs.writeFileSync(fileName, JSON.stringify(jsonArr));
            return true;
        }
        else {
            return false;
        }
    },
    setJSONDataById: function(fileName, id, obj) {
        const jsonArr = this.getJSONDataAll(fileName);
        const jsonFilterArr = jsonArr.filter(v => {
            return v.id = id
        });
        if (jsonFilterArr[0]) {
            jsonFilterArr[0] = $.extend({}, jsonFilterArr[0], obj);
            console.log(jsonFilterArr[0]);
            fs.writeFileSync(fileName, JSON.stringify(jsonArr));
            return true;
        }
        else {
            return false;
        }
    },
    addJSONDataToBack: function(fileName, obj) {
        const jsonArr = this.getJSONDataAll(fileName);
        jsonArr.push(obj);
        fs.writeFileSync(fileName, JSON.stringify(jsonArr));
        return true;
    }
};
