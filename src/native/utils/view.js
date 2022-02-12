const webviewMsgCallbacks = {};

export default {
    genViewCallbackUUID: function() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
            /[xy]/g, function(c) {
            let r = Math.random() * 16 | 0,
                v = c == "x" ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    },
    handleViewMsgFromExtn: function(event) {
        const msg = event.data;
        switch (msg.cmd) {
            case "extnCallback": {
                console.log(msg.data);
                (webviewMsgCallbacks[msg.cid] || function(){})(msg.data);
                delete webviewMsgCallbacks[msg.cid];
            };
            default: break;
        }
    },
    sendViewDataToExtn: function(data, callback, vscodeLite) {
        if (typeof(data) == "string") {
            data = {
                cmd: data
            };
        }
        if (callback) {
            const cid = this.genViewCallbackUUID();
            webviewMsgCallbacks[cid] = callback;
            data.cid = cid;
        }
        vscodeLite.postMessage(data);
    }
}
