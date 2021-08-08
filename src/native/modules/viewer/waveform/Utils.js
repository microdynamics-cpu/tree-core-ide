
export function getRGBColorValue(str) {
    if (('string' == typeof str) && ("#" === str[0])) {
        str = str.substr(1);
        return parseInt(str, 16);
    }
    return -1;
}

export function convertRGBColorStrToArray(str) {
    let color = [];
    let value = getRGBColorValue(str);
    if(value !== -1) {
        color[0] = ((value >> 16) & 255);
        color[1] = ((value >> 8) & 255);
        color[2] = (value & 255);
    }

    return color;
}