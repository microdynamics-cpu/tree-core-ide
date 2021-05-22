class Enum {
    constructor(arg) {
        const obj = {}
        if (Object.prototype.toString.call(arg).slice(8, -1) === "Object") {
            Object.entries(arg).forEach(([k, v]) => obj[obj[k] = v] = k)
        } else if (Array.isArray(arg)) {
            arg.forEach((v, index) => obj[obj[v] = index] = v)
        } else {
            throw new TypeError('class Enum should receive a plain object or a array')
        }
        return obj;
    }
}

export const DATA_STATE = new Enum({
    HIGH: 0,
    LOW: 1,
});

export const DATA_FORMAT = new Enum({
    Bin: "bin", 
    Oct: "oct", 
    Hex: "hex", 
});

export const DATA_TYPE = new Enum({
    Wire: "wire",
    Bus: "bus",
});


