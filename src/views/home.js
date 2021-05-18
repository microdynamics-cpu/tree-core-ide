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
    data: function() {
        return {
            tcNavListItems: [{
                title: "Home",
                icon: "mdi-home"
            }, {
                title: "Projects",
                icon: "mdi-code-greater-than-or-equal"
            }, {
                title: "Tools",
                icon: "mdi-toolbox"
            }, {
                title: "Libraries",
                icon: "mdi-book"
            }, {
                title: "Settings",
                icon: "mdi-cog"
            }],
            tcAppBarItems: [{
                title: "Project Website",
                icon: "mdi-web",
                href: ""
            }, {
                title: "Project Forum",
                icon: "mdi-forum",
                href: ""
            }, {
                title: "Project GitHub",
                icon: "mdi-github",
                href: "https://github.com/microdynamics-cpu"
            }, {
                title: "Team E-mail",
                icon: "mdi-email",
                href: "mailto:microdynamics@126.com"
            }],
            tcFuncItems: [{
                title: "简单易学",
                icon: "mdi-circle",
                text: "依托模板生成、图表拖拽、节点系统等新颖的人机交互模式，让用户能够快速入门处理器设计。"
            }, {
                title: "图表显示",
                icon: "mdi-circle",
                text: "可通过图表控件显示处理器项目的仿真波形、数据通路与调试参数等信息。"
            }, {
                title: "扩展性强",
                icon: "mdi-circle",
                text: "可通过库管理器安装、使用所有符合木心IDE标准的第三方处理器与外设模块。"
            }, {
                title: "兼容性强",
                icon: "mdi-circle",
                text: "基于VS Code编辑器进行搭建，可跨平台运行在Windows、Linux和Mac系统上。"
            }],
            tcTimelineItems: [{
                date: "2021-05",
                title: "开发代码",
                text: "根据之前确定的软件需求，团队成员开始分模块编写木心IDE。"
            }, {
                date: "2021-04",
                title: "确定需求",
                text: "经过团队内部的详细讨论，决定开发木心IDE并确定了相关需求。"
            }],
            tcFooterItems: [{
                title: "Team",
                list: [{
                    title: "About Us",
                    icon: ""
                }, {
                    title: "Contact Us",
                    icon: ""
                }, {
                    title: "Team Blog",
                    icon: ""
                }]
            }, {
                title: "Development",
                list: [{
                    title: "TreeCore IDE",
                    icon: ""
                }, {
                    title: "Projects",
                    icon: ""
                }, {
                    title: "Libraries",
                    icon: ""
                }, {
                    title: "Settings",
                    icon: ""
                }]
            }, {
                title: "Support",
                list: [{
                    title: "Documents",
                    icon: ""
                }, {
                    title: "WiKi",
                    icon: ""
                }, {
                    title: "Ask Questions",
                    icon: ""
                }, {
                    title: "Report Bugs",
                    icon: ""
                }, {
                    title: "Donate",
                    icon: ""
                }]
            }, {
                title: "Community",
                list: [{
                    title: "Website",
                    icon: "mdi-web"
                }, {
                    title: "Forum",
                    icon: "mdi-forum"
                }, {
                    title: "GitHub",
                    icon: "mdi-github",
                }, {
                    title: "E-mail",
                    icon: "mdi-email"
                }]
            }],
            tcModelCheckbox: true,
        }
    },
    watch: {
        // tcCheckbox: function(valNew, valOld) {
        //     sendDataToExtension({
        //         cmd: "setExtensionConfig",
        //         key: "treecore.config.showHomePageAtStartup",
        //         val: valNew
        //     }, null, vscodeLite);
        // }
    },
    mounted: function() {
        // sendDataToExtension({
        //     cmd: "getExtensionConfig",
        //     key: "treecore.config.showHomePageAtStartup"
        // }, tcCheckbox => this.tcCheckbox = tcCheckbox, vscodeLite);
    },
    methods: {
    }
});
