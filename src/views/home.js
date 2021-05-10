// @ts-ignore
// const vscodeLite = acquireVsCodeApi();

// @ts-ignore
window.addEventListener("message", event => {
    handleMessageFromExtension(event);
});

// @ts-ignore
new Vue({
    el: "#app",
    // @ts-ignore
    vuetify: new Vuetify(),
    data: () => {
        return {
            items: [
              { title: "Home", icon: "mdi-home" },
              { title: "Projects", icon: "mdi-code-greater-than-or-equal" },
              { title: "Libraries", icon: "mdi-book" },
              { title: "Settings", icon: "mdi-cog" }
            ]
        }
    },
    mounted: () => {
        // sendDataToExtension({
        //     cmd: "getExtensionConfig",
        //     key: "treecore.config.showHomePageAtStartup"
        // }, show => this.show = show, vscodeLite);
    },
    methods: {
        toggleShowTip() {
            this.show = !this.show;
        }
    },
    watch: {
        // show(valNew, valOld) {
        //     sendDataToExtension({
        //         cmd: "setExtensionConfig",
        //         key: "treecore.config.showHomePageAtStartup",
        //         val: valNew
        //     }, null, vscodeLite);
        // }
    }
});
