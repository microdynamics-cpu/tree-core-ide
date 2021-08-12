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
                    dense
                    :items="libRankTypeItems"
                    label="请选择软件库类型"
                    outlined
                    v-model="libRankTypeModel"
                    class="mt-3 mx-4">
                </v-select>
                <BaseEcharts chartType="chartPie"></BaseEcharts>
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
                <BaseEcharts chartType="chartBar"></BaseEcharts>
            </v-card>
        </v-col>
        <v-col
            height="100%"
            md="4"
            v-for="item in libRankTableItems"
            :key="item.title"
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
                            <v-chip :color="getLibRatingColor(item.value)">
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
                clearable
                dense
                label="请输入相关信息"
                outlined
                class="mx-4">
                <template #prepend>
                    <v-select
                        dense
                        :items="libSearchTypeItems"
                        label="请选择搜索类型"
                        outlined
                        v-model="libSearchTypeModel"
                        class="tc-text-field-x"
                        style="top:-8px;">
                    </v-select>
                </template>
                <template #append-outer>
                    <v-btn
                        outlined
                        class="tc-text-field-x"
                        @click="searchLibByName">
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
                :server-items-length="libSearchTableCount" >
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
    import BaseEcharts from "@client/components/base/BaseEcharts.vue";

    export default {
        name: "PageLibBrief",
        components: {
            BaseEcharts
        },
        data: function() {
            return {
                libRankTypeItems: ["全部模块", "基础模块", "外设模块", "处理器核", "片上系统"],
                libRankTypeModel: "全部模块",
                libRankTableItems: [
                // {
                //     title: "下载次数",
                //     headers: [{
                //         text: "名称",
                //         value: "name",
                //         align: "center",
                //         sortable: false
                //     }, {
                //         text: "数值",
                //         value: "value",
                //         align: "center",
                //         sortable: false
                //     }],
                //     items: [{
                //         name: "IEEE 802.15.4 CRC",
                //         value: "100"
                //     }, {
                //         name: "BiRiscV",
                //         value: "80"
                //     }, {
                //         name: "I2C Multiple Bus Controller",
                //         value: "70"
                //     }, {
                //         name: "OpenFIRE",
                //         value: "60"
                //     }, {
                //         name: "Simple RS232 UART",
                //         value: "50"
                //     }, {
                //         name: "8b10b Encoder/Decoder",
                //         value: "40"
                //     }, {
                //         name: "Featherweight RISC-V",
                //         value: "30"
                //     }, {
                //         name: "APB to I2C",
                //         value: "20"
                //     }, {
                //         name: "ORPSoC",
                //         value: "10"
                //     }, {
                //         name: "Bitwise addressable GPIO",
                //         value: "9"
                //     }]
                // },
                {
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
                        name: "IEEE 802.15.4 CRC",
                        value: "4.9"
                    }, {
                        name: "BiRiscV",
                        value: "4.9"
                    }, {
                        name: "I2C Multiple Bus Controller",
                        value: "4.6"
                    }, {
                        name: "OpenFIRE",
                        value: "4.5"
                    }, {
                        name: "Simple RS232 UART",
                        value: "4.4"
                    }, {
                        name: "8b10b Encoder/Decoder",
                        value: "4.4"
                    }, {
                        name: "Featherweight RISC-V",
                        value: "4.3"
                    }, {
                        name: "APB to I2C",
                        value: "4.2"
                    }, {
                        name: "ORPSoC",
                        value: "4.2"
                    }, {
                        name: "Bitwise addressable GPIO",
                        value: "4.1"
                    }]
                }],
                libSearchTypeItems: ["全部", "名称", "作者"],
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
            };
        },
        watch: {
            libSearchTableOptions: function() {
                this.getDataFromAPI();
            }
        },
        methods: {
            searchLibByName: function() {
                console.log("test");
            },
            getLibRatingColor: function(rating) {
                var num = parseFloat(rating);
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
            getDataFromAPI: function() {
                this.libSearchTableLoading = true;
                this.callFakeData().then(data => {
                    this.libSearchTableItem.items = data.items;
                    this.libSearchTableCount = data.count;
                    this.libSearchTableLoading = false;
                });
            },
            callFakeData: function() {
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
            getLibSearchTable: function() {
                return [{
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
            },

        }
    }
</script>