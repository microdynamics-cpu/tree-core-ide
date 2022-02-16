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
                let cid = msg.cid;
                let data = msg.data;
                console.log("extnCallback: " + data);
                (webviewMsgCallbacks[cid] || function(){})(data);
                delete webviewMsgCallbacks[cid];
            };
            default: break;
        }
    },
    sendViewMsgToExtn: function(cmd, param, callback, vscodeLite) {
        let cid = "";
        if (callback) {
            cid = this.genViewCallbackUUID();
            webviewMsgCallbacks[cid] = callback;
        }
        vscodeLite.postMessage({
            cmd: cmd,
            cid: cid,
            param: param
        });
    }
}
