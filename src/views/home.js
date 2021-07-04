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
            tcNewsCarouselItems: [[{
                date: "2021-06-01",
                title: "《芯来科技将举行专场研讨会》",
                src: "https://myyerrol-1257317595.cos.ap-beijing.myqcloud.com/images/test/nuclei_banner.jpeg",
                text: "越来越多的应用方案在芯来科技的产品赋能下“开花结果”。6月RISC-V中国峰会举行之际，正值芯来科技“三”周岁生日，我们特别邀请典型行业客户及生态伙伴一起，共同研讨“本土RISC-V产业生态”，共庆芯来三周年。"
            }, {
                date: "2021-05-28",
                title: "《RISC-V 2021 中国峰会活动预告》",
                src: "https://www.riscv-conf-china.com/assets/img/kv.png",
                text: "由于接收和录用稿件数量都远超过去的会议规模，本次的议程整理工作比计划花费的时间要更长一些。目前峰会主会场活动共3天半，从6月22日持续到6月25日。而6月26日则会举办 PLCT RISC-V Shanghai Day 以及 Chisel 2021 社区大会。"
            }, {
                date: "2021-05-26",
                title: "《RISC-V 2021 中国峰会议程公开》",
                src: "https://www.riscv-conf-china.com/assets/img/kv.png",
                text: "由于接收和录用稿件数量都远超过去的会议规模，本次的议程整理工作比计划花费的时间要更长一些。目前峰会主会场活动共3天半，从6月22日持续到6月25日。而6月26日则会举办 PLCT RISC-V Shanghai Day 以及 Chisel 2021 社区大会。"
            }], [{
                date: "2021-05-20",
                title: "《全球首款RISC-V 64位开发板发布》",
                src: "https://rvboards.org/img/index/1/1619704518.jpeg",
                text: "澎峰科技（PerfXLab）与华秋电子（电子发烧友网）通过网络直播发布了第一款进入量产的RISC-V 64位开源硬件“RVBoards-哪吒”。该开源硬件是联合全志科技研发，主控为全志D1（采用了平头哥的C906 RV64GCV）。"
            }, {
                date: "2021-05-20",
                title: "《木心开发环境功能模块图》",
                src: "https://myyerrol-1257317595.cos.ap-beijing.myqcloud.com/images/test/test_20210520.png",
                text: "完成木心开发环境功能模块图设计。"
            }, {
                date: "2021-05-11",
                title: "《木心处理器头脑风暴模块图》",
                src: "https://myyerrol-1257317595.cos.ap-beijing.myqcloud.com/images/test/test_20210511.svg",
                text: "完成木心处理器头脑风暴模块图设计。"
            }]],
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
            screenWidth: null
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

        // @ts-ignore
        this.screenWidth = document.body.clientWidth;
        // @ts-ignore
        window.onresize = function() {
            return (function() {
                // @ts-ignore
                this.screenWidth = document.body.clientWidth;
                console.log(this.screenWidth);

            })();
        }
    },
    methods: {
    }
});
