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
            navListItems: [{
                title: "Home",
                icon: "mdi-home"
            }, { title:
                "Projects",
                icon: "mdi-code-greater-than-or-equal"
            }, { title:
                "Libraries",
                icon: "mdi-book"
            }, {
                title: "Settings",
                icon: "mdi-cog"
            }],
            appBarItems: [{
                title: "Project Website",
                icon: "mdi-web",
                href: ""
            }, {
                title: "Project GitHub",
                icon: "mdi-github",
                href: "https://github.com/microdynamics-cpu"
            }, {
                title: "Team E-mail",
                icon: "mdi-email",
                href: "mailto:microdynamics@126.com"
            }]
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
