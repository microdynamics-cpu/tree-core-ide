<template>
    <v-row>
        <v-col
            height="100%"
            md="4"
            class="mt-4">
            <v-card
                height="100%"
                outlined>
                <v-select
                    v-model="libRankTypeModel"
                    dense
                    :items="libRankTypeItems"
                    label="请选择软件库类型"
                    outlined
                    class="mt-3 mx-4">
                </v-select>
                <BaseEcharts
                    chartType="pie"
                    :chartOpts="libChartPieOpts">
                </BaseEcharts>
            </v-card>
        </v-col>
        <v-col
            height="100%"
            md="4"
            class="mt-4">
            <v-card
                height="100%"
                outlined>
                <v-card-title @click="$jumpToPageByLink('history', '/lib/detail')">
                    <v-icon
                        color="lime darken-2"
                        small>mdi-square
                    </v-icon>
                    <span class="tc-card-title-span-20px">
                        下载次数
                    </span>
                </v-card-title>
                <BaseEcharts chartType="bar"></BaseEcharts>
            </v-card>
        </v-col>
        <v-col
            v-for="item in libRankTableItems"
            :key="item.title"
            height="100%"
            md="4"
            class="mt-4">
            <v-card outlined>
                <v-card-title>
                    <v-icon
                        color="lime darken-2"
                        small>mdi-square
                    </v-icon>
                    <span class="tc-card-title-span-20px">
                        {{ item.title }}
                    </span>
                </v-card-title>
                <v-card-text>
                    <v-data-table
                        dense
                        :headers="item.headers"
                        hide-default-footer
                        :items="item.items">
                        <template
                            v-if="item.title === '评分高低'"
                            #item.value="{ item }">
                            <v-chip v-if="(item.value !== '' &&
                                           item.value !== undefined)"
                                    :color="getLibRatingColor(item.value)">
                                {{ item.value }}
                            </v-chip>
                        </template>
                    </v-data-table>
                </v-card-text>
            </v-card>
        </v-col>
        <v-col md="12">
            <v-divider></v-divider>
        </v-col>
        <v-col md="12">
            <v-text-field
                v-model="libSearchInfoModel"
                clearable
                dense
                label="请输入相关信息"
                outlined
                class="mx-4">
                <template #prepend>
                    <v-select
                        v-model="libSearchTypeModel"
                        dense
                        :items="libSearchTypeItems"
                        item-text="text"
                        item-value="value"
                        label="请选择搜索类型"
                        outlined
                        return-object
                        class="tc-text-field-x"
                        style="top:-8px;">
                    </v-select>
                </template>
                <template #append-outer>
                    <v-btn
                        outlined
                        class="tc-text-field-x"
                        @click="searchLibData">
                        <v-icon left>mdi-book-search</v-icon>搜索
                    </v-btn>
                </template>
            </v-text-field>
            <v-data-table
                dense
                :headers="libSearchTableItem.headers"
                :items="libSearchTableItem.items"
                :loading="libSearchTableLoading"
                :options.sync="libSearchTableOptions"
                :server-items-length="libSearchTableCount">
                <template #item.rating="{ item }">
                    <v-chip :color="getLibRatingColor(item.rating)">
                        {{ item.rating }}
                    </v-chip>
                </template>
            </v-data-table>
        </v-col>
    </v-row>
</template>
<script>
    import BaseEcharts from "@client/components/base/BaseEcharts";

    export default {
        name: "PageLibBrief",
        components: {
            BaseEcharts
        },
        data: function() {
            return {
                libRankTypeItems: ["全部模块", "基础模块", "外设模块", "处理器核", "片上系统"],
                libRankTypeModel: "全部模块",
                libRankTableItems: [{
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
                        name: "",
                        value: ""
                    }, {
                        name: "",
                        value: ""
                    }, {
                        name: "",
                        value: ""
                    }, {
                        name: "",
                        value: ""
                    }, {
                        name: "",
                        value: ""
                    }, {
                        name: "",
                        value: ""
                    }, {
                        name: "",
                        value: ""
                    }, {
                        name: "",
                        value: ""
                    }, {
                        name: "",
                        value: ""
                    }, {
                        name: "",
                        value: ""
                    }]
                }],
                libSearchInfoModel: "",
                libSearchTypeItems: [{
                    text: "名称",
                    value: "name"
                }, {
                    text: "作者",
                    value: "author"
                }],
                libSearchTypeModel: {
                    text: "名称",
                    value: "name"
                },
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
                libSearchTableCount: 0,
                libChartPieOpts: {
                    title: "软件库数量占比图",
                    titleSub: "全部模块",
                    data: []
                },
                libChartBarOpts: {
                    title: "软件库下载情况图",
                    titleSub: "全部模块",
                    data: []
                }
            };
        },
        computed: {
            // libRankTableItems: function() {
            //     var tableItems = [{
            //         title: "评分高低",
            //         headers: [{
            //             text: "名称",
            //             value: "name",
            //             align: "center",
            //             sortable: false,
            //         }, {
            //             text: "数值",
            //             value: "value",
            //             align: "center",
            //             sortable: false,
            //         }],
            //         items: this.$store.state.libRankTableItems
            //     }];
            //     return tableItems;
            // }
        },
        watch: {
            libSearchTableOptions: function() {
                this.getLibDataFromServer({
                    funcType: "search",
                    searchKey: "",
                    searchVal: "",
                    sortType: "rating",
                    tableOpt: this.libSearchTableOptions
                });
            }
        },
        beforeCreated: function() {
        },
        created: function() {
            let that = this;
            this.$store.dispatch("getLibChartData", {
                chartType: "pie"
            }).then((status) => {
                if (status) {
                    that.libChartPieOpts.data =
                        that.$store.state.libChartPieOptsData;
                    console.log(that.libChartPieOpts);
                }
            });

        //   this.$store.dispatch("getLibChartData", {
        //         chartType: "bar"
        //     }).then((status) => {
        //         if (status) {
        //             that.libCharBarOpts = that.$store.state.libCharBarOptsData;
        //         }
        //     });
            // this.libChartPieOpts = {
            //     title: "软件库数量占比图",
            //     titleSub: "全部模块",
            //     data: [{
            //         name: "基础模块",
            //         value: 50
            //     }, {
            //         name: "外设模块",
            //         value: 30
            //     }, {
            //         name: "处理器核",
            //         value: 10
            //     }, {
            //         name: "片上系统",
            //         value: 5
            //     }]
            // }
        },
        mounted: function() {
            let that = this;
            this.$store.dispatch("getLibInfoData", {
                funcType: "rank",
                searchKey: "",
                searchVal: "",
                sortType: "rating"
            }).then((status) => {
                if (status) {
                    that.libRankTableItems[0].items =
                        that.$store.state.libRankTableItemsData;
                }
            });
        },
        methods: {
            getLibRatingColor: function(rating) {
                var num = parseFloat(rating);
                if ((num - 4.50) >= Number.EPSILON) {
                    return "green";
                }
                else if ((num - 4.00) >= Number.EPSILON) {
                    return "orange";
                }
                else {
                    return "red";
                }
            },
            getLibDataFromServer: function(params) {
                let that = this;
                this.libSearchTableLoading = true;
                this.$store.dispatch("getLibInfoData", params).then((status) => {
                    that.libSearchTableLoading = false;
                    if (status) {
                        that.libSearchTableItem.items =
                            that.$store.state.libSearchTableItemData;
                        that.libSearchTableCount =
                            that.$store.state.libSearchTableCount;
                    }
                });
            },
            getLibDataFromAPI: function() {
                this.libSearchTableLoading = true;
                this.getLibInfoDataFake().then((data) => {
                    this.libSearchTableItem.items = data.items;
                    this.libSearchTableCount = data.count;
                    this.libSearchTableLoading = false;
                });
            },
            getLibInfoDataFake: function() {
                return new Promise((resolve, reject) => {
                    console.log(this.libSearchTableOptions);
                    const { sortBy, sortDesc, page, itemsPerPage } =
                        this.libSearchTableOptions;

                    let items = [{
                        name: "IEEE 802.15.4 CRC",
                        author: "张三",
                        type: "基础模块",
                        download: "100",
                        rating: "4.9"
                    }, {
                        name: "BiRiscV",
                        author: "李四",
                        type: "处理器核",
                        download: "80",
                        rating: "4.9"
                    }, {
                        name: "I2C Multiple Bus Controller",
                        author: "王五",
                        type: "外设模块",
                        download: "70",
                        rating: "4.6"
                    }, {
                        name: "OpenFIRE",
                        author: "赵六",
                        type: "片上系统",
                        download: "60",
                        rating: "4.5"
                    }, {
                        name: "Simple RS232 UART",
                        author: "孙七",
                        type: "外设模块",
                        download: "50",
                        rating: "4.4"
                    }, {
                        name: "8b10b Encoder/Decoder",
                        author: "周八",
                        type: "基础模块",
                        download: "40",
                        rating: "4.4"
                    }, {
                        name: "Featherweight RISC-V",
                        author: "吴九",
                        type: "处理器核",
                        download: "30",
                        rating: "4.3"
                    }, {
                        name: "APB to I2C",
                        author: "郑十",
                        type: "外设模块",
                        download: "20",
                        rating: "4.2"
                    }, {
                        name: "ORPSoC",
                        author: "小张",
                        type: "片上系统",
                        download: "19",
                        rating: "4.2"
                    }, {
                        name: "Bitwise addressable GPIO",
                        author: "小李",
                        type: "外设模块",
                        download: "9",
                        rating: "4.1"
                    }];
                    let count = items.length;

                    if (sortBy.length === 1 && sortDesc.length === 1) {
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
                                             page * itemsPerPage);
                    }

                    setTimeout(() => {
                        resolve({ items, count });
                    }, 1000);
                });
            },
            searchLibData: function() {
                let searchKey = this.libSearchTypeModel.value;
                let searchVal = this.libSearchInfoModel;
                console.log("searchKey: " + searchKey);
                console.log("searchVal: " + searchVal);
                this.getLibDataFromServer({
                    funcType: "search",
                    searchKey: searchKey,
                    searchVal: searchVal,
                    sortType: "rating",
                    tableOpt: this.libSearchTableOptions
                });
            },
        }
    }
</script>