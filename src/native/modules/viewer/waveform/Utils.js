// change the #xxxxxx format to the oct foramt number
export function getRGBColorValue(str, format) {
    if (('string' == typeof str)) {
        if (format === '#') {
            str = str.substr(1);
            return parseInt(str, 16);
        }
    }
    return -1;
}

// 
export function convertRGBColorStrToArray(str, format = '#') {
    let color = [];
    if (format === '#') {
        let value = getRGBColorValue(str, format);
        if (value !== -1) {
            color[0] = ((value >> 16) & 255);
            color[1] = ((value >> 8) & 255);
            color[2] = (value & 255);
        }
    } else {
        color = str.slice(4, -1).split(",").map(v => parseInt(v, 10));
    }

    return color;
}

export function convertRGBColorArrayStrToString(str) {
    let color = '#', tmp = [];
    tmp = str.slice(4, -1).split(",").map(v => parseInt(v, 10));
    let num = (tmp[0] << 16) + (tmp[1] << 8) + tmp[2];

    return color + num.toString(16);
}