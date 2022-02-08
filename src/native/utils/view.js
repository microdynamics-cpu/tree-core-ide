const webviewMessageCallbacks = {};

export default {
    genExtensionUUID: function() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
            /[xy]/g, function(c) {
            let r = Math.random() * 16 | 0,
                v = c == "x" ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    },
    handleMessageFromExtension: function(event) {
        const message = event.data;
        switch (message.cmd) {
            case "extensionCallback": {
                console.log(message.data);
                (webviewMessageCallbacks[message.cid] || function(){})(
                    message.data);
                delete webviewMessageCallbacks[message.cid];
            };
            default: break;
        }
    },
    sendDataToExtension: function(data, callback, vscodeLite) {
        if (typeof(data) == "string") {
            data = {
                cmd: data
            };
        }
        if (callback) {
            const cid = this.genExtensionUUID();
            webviewMessageCallbacks[cid] = callback;
            data.cid = cid;
        }
        vscodeLite.postMessage(data);
    }
}
