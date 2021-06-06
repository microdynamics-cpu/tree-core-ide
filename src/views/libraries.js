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
            tcSelectItems: ["基础模块", "处理器核", "外设模块", "片上系统"],
            tcRankTableItems: [{
                title: "下载次数",
                headers: [{
                    text: "名称",
                    value: "name",
                    align: "center",
                    sortable: false,
                }, {
                    text: "数值",
                    value: "text",
                    align: "center",
                    sortable: false,
                }],
                items: [{
                    name: "测试1",
                    text: "100"
                }, {
                    name: "测试2",
                    text: "80"
                }, {
                    name: "测试3",
                    text: "70"
                }, {
                    name: "测试4",
                    text: "60"
                }, {
                    name: "测试5",
                    text: "50"
                }, {
                    name: "测试6",
                    text: "40"
                }, {
                    name: "测试7",
                    text: "30"
                }, {
                    name: "测试8",
                    text: "20"
                }, {
                    name: "测试9",
                    text: "10"
                }, {
                    name: "测试10",
                    text: "9"
                }]
            }, {
                title: "评分高低",
                headers: [{
                    text: "名称",
                    value: "name",
                    align: "center",
                    sortable: false,
                }, {
                    text: "数值",
                    value: "text",
                    align: "center",
                    sortable: false,
                }],
                items: [{
                    name: "测试1",
                    text: "4.9"
                }, {
                    name: "测试2",
                    text: "4.9"
                }, {
                    name: "测试3",
                    text: "4.6"
                }, {
                    name: "测试4",
                    text: "4.5"
                }, {
                    name: "测试5",
                    text: "4.4"
                }, {
                    name: "测试6",
                    text: "4.4"
                }, {
                    name: "测试7",
                    text: "4.3"
                }, {
                    name: "测试8",
                    text: "4.2"
                }, {
                    name: "测试9",
                    text: "4.2"
                }, {
                    name: "测试10",
                    text: "4.1"
                }]
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
            tcModelLibTabs: null,
            tcModelSelectItems: "基础模块"
        }
    },
    watch: {
    },
    created: function() {
        var chart = document.getElementById("chart");
        console.log(chart);
        var myChart = echarts.init(chart);
        var option = {
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            legend: {
                data:['销量']
            },
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        };
        myChart.setOption(option);
    },
    mounted: function() {
    },
    methods: {
    }
});

