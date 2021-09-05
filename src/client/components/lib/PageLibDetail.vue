<template>
    <v-row>
        <v-col md="12">
            <v-card outlined>
                <v-card-title>{{ libTableObj.libName }}</v-card-title>
                <v-card-text class="white--text text-md-body-1">
                    <v-row class="tc-lib-detail-title">
                        <v-tooltip
                            color="black"
                            bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <span
                                    v-bind="attrs"
                                    v-on="on">
                                    {{ libTableObj.userName }}
                                </span>
                            </template>
                            <span>作者姓名</span>
                        </v-tooltip>
                        <v-divider
                            vertical
                            class="mx-3">
                        </v-divider>
                        <v-tooltip
                            bottom
                            color="black">
                            <template v-slot:activator="{ on, attrs }">
                                <div
                                    v-bind="attrs"
                                    v-on="on">
                                    <v-icon
                                        dense
                                        class="mr-1">
                                        mdi-cloud-download-outline
                                    </v-icon>
                                    <span>{{ libTableObj.libDownloadNum }}</span>
                                </div>
                            </template>
                            <span>下载次数</span>
                        </v-tooltip>
                        <v-divider
                            vertical
                            class="mx-3">
                        </v-divider>
                        <v-tooltip
                            bottom
                            color="black">
                            <template v-slot:activator="{ on, attrs }">
                                <div
                                    v-bind="attrs"
                                    v-on="on">
                                    <v-rating
                                        color="amber"
                                        dense
                                        half-increments
                                        length="5"
                                        readonly
                                        size="18"
                                        :value="libTableObj.libRating">
                                    </v-rating>
                                </div>
                            </template>
                            <span>评分高低</span>
                        </v-tooltip>
                        <v-divider
                            vertical
                            class="mx-3">
                        </v-divider>
                        <v-tooltip
                            bottom
                            color="black">
                            <template v-slot:activator="{ on, attrs }">
                                <span
                                    v-bind="attrs"
                                    v-on="on">
                                    {{ libTableObj.libType }}
                                </span>
                            </template>
                            <span>模块类型</span>
                        </v-tooltip>
                        <v-divider
                            vertical
                            class="mx-3">
                        </v-divider>
                        <v-tooltip
                            bottom
                            color="black">
                            <template v-slot:activator="{ on, attrs }">
                                <span
                                    v-bind="attrs"
                                    v-on="on">
                                    {{ libTableObj.libLicense }}
                                </span>
                            </template>
                            <span>协议类型</span>
                        </v-tooltip>
                        <v-divider
                            vertical
                            class="mx-3">
                        </v-divider>
                        <v-tooltip
                            bottom
                            color="black">
                            <template v-slot:activator="{ on, attrs }">
                                <span
                                    v-bind="attrs"
                                    v-on="on">
                                    <v-btn
                                        :href="libTableObj.libRemoteUrl"
                                        icon
                                        small
                                        target="_blank"
                                        class="mt-n1">
                                    <v-icon>{{ libTableObj.libRemoteIcon }}</v-icon>
                                </v-btn>
                                </span>
                            </template>
                            <span>仓库地址</span>
                        </v-tooltip>
                    </v-row>
                    <v-row class="tc-lib-detail-title">
                        <div>{{ libTableObj.libDescription }}</div>
                    </v-row>
                    <v-row class="tc-lib-detail-title">
                        <v-col md="2"
                            style="padding-left:0px;padding-right:20px">
                            <v-select
                                v-model="libVersionModel"
                                dense
                                :items="libVersionItems"
                                label="请选择软件库版本"
                                outlined>
                            </v-select>
                        </v-col>
                        <v-col md="2"
                               style="padding-left:0px;">
                            <v-btn
                                color="lime darken-2"
                                small>安装
                            </v-btn>
                        </v-col>
                    </v-row>
                    <v-row class="tc-lib-detail-contents">
                        <v-tabs
                            v-model="libDetailTabsModel"
                            color="lime darken-2"
                            height="35px">
                            <v-tab>详细介绍</v-tab>
                            <v-tab>变更记录</v-tab>
                        </v-tabs>
                        <v-tabs-items
                            v-model="libDetailTabsModel"
                            dark>
                            <v-tab-item height="200px">
                                <v-card>
                                    <v-card-text v-html="libDetailReadMe"></v-card-text>
                                </v-card>
                            </v-tab-item>
                            <v-tab-item height="200px">
                                <v-card>
                                    <v-card-text v-html="libDetailChangeLog"></v-card-text>
                                </v-card>
                            </v-tab-item>
                        </v-tabs-items>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>
<script>
    import marked from "marked";
    import axios from "axios";

    let rendererMD = new marked.Renderer();
    marked.setOptions({
        renderer: rendererMD,
        // 默认为true，允许使用GitHub Flavor Markdown语法
        // Default is true, allow GitHub Flavor Markdown syntax
        gfm: true,
        // 默认为true，允许使用表格语法（gfm必须为true）
        // Default is true, allow table syntax(gfm must be true)
        tables: true,
        // 默认为false，允许使用回车换行（gfm必须为true）
        // Default is false, allow CRLF(gfm must be true)
        breaks: false,
        // 默认为false，尽可能地兼容markdown.pl的晦涩部分，且不纠正原始模型任何的不良行为和错误
        // Default is false, it is compatible with the obscure part of markdown.pl
        // as much as possible without correcting any bad behavior and errors of
        // the original model
        pedantic: false,
        // 默认为false，对输出内容进行过滤清理
        // Default is false, filter and clean the output content
        sanitize: false,
        smartLists: true,
        // 默认为false，使用更为时髦的标点，比如在语法中加入破折号
        // Default is false, use more fashionable punctuation, such as adding
        // dashes to syntax
        smartypants: false
    });

    export default {
        name: "PageLibDetail",
        components: {
        },
        data: function() {
            return {
                libTableObj: {},
                libVersionItems: ["最新版本"],
                libVersionModel: "最新版本",
                libDetailTabsModel: null,
                libDetailReadMe: "",
                libDetailChangeLog: ""
            };
        },
        watch: {
        },
        mounted: function() {
            this.setLibDetailData();
        },
        methods: {
            setLibDetailData: function() {
                let libId = this.$route.query.libId;
                let tableData = this.$store.state.libRankTableData;
                let tableObj = {};

                for (let i = 0; i < tableData.length; i++) {
                    if (libId === tableData[i].libId) {
                        tableObj = tableData[i];
                        break;
                    }
                }
                if (JSON.stringify(tableObj) === "{}") {
                    tableData = this.$store.state.libSearchTableData;
                    for (let i = 0; i < tableData.length; i++) {
                        if (libId === tableData[i].libId) {
                            tableObj = tableData[i];
                            break;
                        }
                    }
                }
                this.libTableObj = tableObj;

                this.libTableObj.libVersionArr.unshift("最新版本");
                this.libVersionItems = this.libTableObj.libVersionArr;

                // let libRemoteUrl = tableObj.libRemoteUrl;
                // if (libRemoteUrl.indexOf("github") !== -1) {
                //     this.libTableObj.libRemoteIcon = "mdi-github";
                //     axios.defaults.baseURL = "/github";
                //     libRemoteUrl = libRemoteUrl.replace("https://github.com", "");
                // }
                // else if (libRemoteUrl.indexOf("gitee") !== -1) {
                //     this.libTableObj.libRemoteIcon = "mdi-source-repository";
                //     axios.defaults.baseURL = "/gitee";
                //     libRemoteUrl = libRemoteUrl.replace("https://gitee.com", "");
                // }

                // let libBranch = tableObj.libBranch;
                // let libReadMeUrl = libRemoteUrl + "/raw/" + libBranch +
                //     "/README.md";
                // let libChangeLogUrl = libRemoteUrl + "/raw/" + libBranch +
                //     "/CHANGELOG.md";

                // console.log("libReadMeUrl: " + libReadMeUrl);
                // console.log("libChangeLogUrl: " + libChangeLogUrl);

                // axios.get(libReadMeUrl).then((res) => {
                //     console.log(res);
                //     let html = marked(res.data);
                //     this.libDetailReadMe = html;
                // }).catch((err) => {
                //     console.log(err);
                // });

                // axios.get(libChangeLogUrl).then((res) => {
                //     console.log(res);
                //     let html = marked(res.data);
                //     this.libDetailChangeLog = html;
                // }).catch((err) => {
                //     console.log(err);
                // });
            }
        }
    }
</script>
<style scoped>
    .tc-lib-detail-title {
        margin-left: 1.5px
    }
    .tc-lib-detail-title + .tc-lib-detail-title {
        margin-top: 18px;
    }
    .tc-lib-detail-contents {
        margin-top: -25px;
        margin-left: 0px;
    }
</style>
