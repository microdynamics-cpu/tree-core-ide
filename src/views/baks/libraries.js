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
            libRankTableItems: [{
                title: "下载次数",
                headers: [{
                    text: "名称",
                    value: "name",
                    align: "center",
                    sortable: false
                }, {
                    text: "数值",
                    value: "value",
                    align: "center",
                    sortable: false
                }],
                items: [{
                    name: "软件库1",
                    value: "100"
                }, {
                    name: "软件库2",
                    value: "80"
                }, {
                    name: "软件库3",
                    value: "70"
                }, {
                    name: "软件库4",
                    value: "60"
                }, {
                    name: "软件库5",
                    value: "50"
                }, {
                    name: "软件库6",
                    value: "40"
                }, {
                    name: "软件库7",
                    value: "30"
                }, {
                    name: "软件库8",
                    value: "20"
                }, {
                    name: "软件库9",
                    value: "10"
                }, {
                    name: "软件库10",
                    value: "9"
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
                    value: "value",
                    align: "center",
                    sortable: false,
                }],
                items: [{
                    name: "软件库1",
                    value: "4.9"
                }, {
                    name: "软件库2",
                    value: "4.9"
                }, {
                    name: "软件库3",
                    value: "4.6"
                }, {
                    name: "软件库4",
                    value: "4.5"
                }, {
                    name: "软件库5",
                    value: "4.4"
                }, {
                    name: "软件库6",
                    value: "4.4"
                }, {
                    name: "软件库7",
                    value: "4.3"
                }, {
                    name: "软件库8",
                    value: "4.2"
                }, {
                    name: "软件库9",
                    value: "4.2"
                }, {
                    name: "软件库10",
                    value: "4.1"
                }]
            }],
            libRankTypeItems: ["全部模块", "基础模块", "处理器核", "外设模块", "片上系统"],
            libSearchTypeItems: ["全部", "名称", "作者"],
            libTabsModel: null,
            libRankTypeModel: "全部模块",
            libSearchTypeModel: "全部",
            libSearchTableItem: {
                headers: [{
                    text: "名称",
                    value: "name",
                    align: "center",
                    sortable: false
                }, {
                    text: "作者",
                    value: "author",
                    align: "center",
                    sortable: false
                }, {
                    text: "类型",
                    value: "type",
                    align: "center",
                    sortable: false
                }, {
                    text: "下载",
                    value: "download",
                    align: "center",
                    sortable: false
                }, {
                    text: "评价",
                    value: "rating",
                    align: "center",
                    sortable: false
                }],
                items: []
            },
            libSearchTableLoading: true,
            libSearchTableOptions: {},
            libSearchTableCount: 0
        }
    },
    watch: {
        libSearchTableOptions: function() {
            this.getDataFromAPI();
        }
    },
    created: function() {
        // // @ts-ignore
        // var chart = document.getElementById("chart");
        // console.log(chart);
        // // @ts-ignore
        // var myChart = echarts.init(chart);
        // console.log(myChart);
        // var option = {
        //     title: {
        //         text: "ECharts 入门示例"
        //     },
        //     tooltip: {},
        //     legend: {
        //         data:["销量"]
        //     },
        //     xAxis: {
        //         data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
        //     },
        //     yAxis: {},
        //     series: [{
        //         name: "销量",
        //         type: "bar",
        //         data: [5, 20, 36, 10, 10, 20]
        //     }]
        // };
        // myChart.setOption(option);
    },
    mounted: function() {
    },
    methods: {
        searchLibsByName: function() {
            console.log("test");
        },
        getLibRatingColor: function(rating) {
            var num = parseFloat(rating);
            // console.log("libRatingNum: " + num);
            if (num >= 4.5) {
                return "green";
            }
            else if (num >= 4.0) {
                return "orange";
            }
            else {
                return "red";
            }
        },
        getDataFromAPI() {
            this.libSearchTableLoading = true;
            this.callFakeData().then(data => {
                this.libSearchTableItem.items = data.items;
                this.libSearchTableCount = data.count;
                this.libSearchTableLoading = false;
            });
        },
        callFakeData() {
            return new Promise((resolve, reject) => {
                const { sortBy, sortDesc, page, itemsPerPage } =
                    this.libSearchTableOptions;

                let items = this.getLibSearchTable();
                let count = items.length;

                if (sortBy === 1 && sortDesc === 1) {
                    items = items.sort((a, b) => {
                        const sortA = a[sortBy[0]]
                        const sortB = b[sortBy[0]]

                        if (sortDesc[0]) {
                            if (sortA < sortB) {
                                return 1;
                            }
                            if (sortA > sortB) {
                                return -1;
                            }
                            return 0;
                        }
                        else {
                            if (sortA < sortB) {
                                return -1;
                            }
                            if (sortA > sortB) {
                                return 1;
                            }
                            return 0;
                        }
                    });
                }

                if (itemsPerPage > 0) {
                    items = items.slice((page - 1) * itemsPerPage,
                                         page * itemsPerPage)
                }

                setTimeout(() => {
                    resolve({ items, count });
                }, 1000);
            });
        },
        getLibSearchTable() {
            return [{
                name: "软件库1",
                author: "张三",
                type: "基础模块",
                download: "100",
                rating: "4.9"
            }, {
                name: "软件库2",
                author: "李四",
                type: "处理器核",
                download: "80",
                rating: "4.9"
            }, {
                name: "软件库3",
                author: "王五",
                type: "外设模块",
                download: "70",
                rating: "4.6"
            }, {
                name: "软件库4",
                author: "赵六",
                type: "片上系统",
                download: "60",
                rating: "4.5"
            }, {
                name: "软件库5",
                author: "孙七",
                type: "外设模块",
                download: "50",
                rating: "4.4"
            }, {
                name: "软件库6",
                author: "周八",
                type: "基础模块",
                download: "40",
                rating: "4.4"
            }, {
                name: "软件库7",
                author: "吴九",
                type: "处理器核",
                download: "30",
                rating: "4.3"
            }, {
                name: "软件库8",
                author: "郑十",
                type: "外设模块",
                download: "20",
                rating: "4.2"
            }, {
                name: "软件库9",
                author: "小张",
                type: "片上系统",
                download: "19",
                rating: "4.2"
            }, {
                name: "软件库10",
                author: "小李",
                type: "外设模块",
                download: "9",
                rating: "4.1"
            }];
        }
    }
});

