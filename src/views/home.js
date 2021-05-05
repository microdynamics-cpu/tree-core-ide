// @ts-ignore
const vscodeLite = acquireVsCodeApi();

// @ts-ignore
window.addEventListener("message", event => {
    handleMessageFromExtension(event);
});

// @ts-ignore
new Vue({
    el: "#app",
    data: {
        userName: "用户",
        time: "",
        show: true,
    },
    mounted() {
        this.time = this.getTime();
        sendDataToExtension({
            cmd: "getExtensionConfig",
            key: "treecore.config.showHomePageAtStartup"
        }, show => this.show = show, vscodeLite);
    },
    watch: {
        show(nv, ov) {
            sendDataToExtension({
                cmd: "setExtensionConfig",
                key: "treecore.config.showHomePageAtStartup",
                val: nv
            }, null, vscodeLite);
        }
    },
    methods: {
        toggleShowTip() {
            this.show = !this.show;
        },
        getTime() {
            const hour = new Date().getHours();
            if (hour <= 8) return '早上';
            else if (hour < 12) return '上午';
            else if (hour < 14) return '中午';
            else if (hour < 18) return '下午';
            return '晚上';
        }
    }
});
