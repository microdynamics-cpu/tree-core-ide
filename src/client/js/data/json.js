const fs = require("fs");

module.exports = {
    addJSONDataToBack: function(fileName, obj) {
        const jsonArr = this.getJSONDataAll(fileName);
        jsonArr.push(obj);
        fs.writeFileSync(fileName, JSON.stringify(jsonArr));
        return true;
    },
    deleteJSONDataById: function(fileName, id) {
        const jsonArr = this.getJSONDataAll(fileName);
        const jsonObjIndex = jsonArr.findIndex((v) => {
            return v.id === id
        });
        if (jsonObjIndex !== -1) {
            jsonArr.splice(jsonObjIndex, 1);
            fs.writeFileSync(fileName, JSON.stringify(jsonArr), "utf-8");
            return true;
        }
        else {
            return false;
        }
    },
    getJSONDataAll: function(fileName) {
        const jsonArr = JSON.parse(fs.readFileSync(fileName, "utf-8"));
        return jsonArr;
    },
    getJSONDataByOrder: function(fileName, sortField, sortType, sortOrder) {
        let jsonArr = this.getJSONDataAll(fileName);
        jsonArr.sort((objA, objB) => {
            let valA = objA[sortField];
            let valB = objB[sortField];

            if (sortType === "val") {
                if (typeof(valA === String)) {
                    valA = parseInt(valA);
                    valB = parseInt(valB);
                }
                if (sortOrder === "asc") {
                    return (valA - valB);
                }
                else if (sortOrder === "desc") {
                    return (valB - valA);
                }
                else {
                    return 0;
                }
            }
            else if (sortType === "date") {
                let dateA = new Date(valA);
                let dateB = new Date(valB);
                let timeA = dateA.getTime();
                let timeB = dateB.getTime();
                if (sortOrder === "asc") {
                    return (timeA - timeB);
                }
                else if (sortOrder === "desc") {
                    return (timeB - timeA);
                }
                else {
                    return 0;
                }
            }
        });

        return jsonArr;
    },
    getJSONDataById: function(fileName, id) {
        const jsonArr = this.getJSONDataAll(fileName);
        const jsonObj = jsonArr.find((v) => {
            return v.id === id
        });
        if (jsonObj) {
            return jsonObj;
        }
        else {
            return false;
        }
    },
    setJSONDataById: function(fileName, id, obj) {
        const jsonArr = this.getJSONDataAll(fileName);
        const jsonObj = jsonArr.find((v) => {
            return v.id === id
        });
        if (jsonObj) {
            Object.assign(jsonObj, obj);
            fs.writeFileSync(fileName, JSON.stringify(jsonArr), "utf-8");
            return true;
        }
        else {
            return false;
        }
    },
};
