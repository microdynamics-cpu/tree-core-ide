let baseFunc = {
    keepDecimalForce: function(num, n) {
        var result = Math.round(num * Math.pow(10, n)) / Math.pow(10, n);
        var resultStr = result.toString();
        var dotIndex = resultStr.indexOf(".");

        if (dotIndex < 0) {
            dotIndex = resultStr.length;
            resultStr += ".";
        }

        while (resultStr.length <= dotIndex + n) {
            resultStr += "0";
        }

        return resultStr;
    }
};

module.exports = baseFunc;
