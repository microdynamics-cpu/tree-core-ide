const fs = require("fs");

module.exports = {
    addJSONDataToBack: function(fileName, obj) {
        const jsonArr = this.getJSONDataAll(fileName);
        jsonArr.push(obj);
        fs.writeFileSync(fileName, JSON.stringify(jsonArr));
        return jsonArr;
    },
    addJSONDataToTop: function(fileName, obj) {
        const jsonArr = this.getJSONDataAll(fileName);
        jsonArr.unshift(obj);
        fs.writeFileSync(fileName, JSON.stringify(jsonArr));
        return jsonArr;
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
        try {
            fs.accessSync(fileName);
        }
        catch (err) {
            fs.writeFileSync(fileName, "[]", "utf-8");
        }
        const jsonArr = JSON.parse(fs.readFileSync(fileName, "utf-8"));
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
    getJSONDataByField: function(fileName, type, field, value) {
        const jsonArr = this.getJSONDataAll(fileName);
        let jsonArrNew = [];
        jsonArr.forEach((v) => {
            if (type === "equal") {
                if (v[field] === value) {
                    jsonArrNew.push(v);
                }
            }
            else if (type === "like") {
                if (v[field].indexOf(value) !== -1) {
                    jsonArrNew.push(v);
                }
            }
            else {
            }
        });
        if (jsonArrNew.length > 0) {
            return jsonArrNew;
        }
        else {
            return false;
        }
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
    getJSONDataByPage: function(fileName, pageIndex, pagePerNum) {
        const jsonArr = this.getJSONDataAll(fileName);
        let jsonNum = jsonArr.length;
        let pageNum = (pageIndex + 1) * pagePerNum;
        if (pageNum > jsonNum) {
            pageNum = jsonNum;
        }
        const jsonPageArr = jsonArr.slice((pageIndex * pagePerNum), pageNum);
        return jsonPageArr;
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
    }
};
