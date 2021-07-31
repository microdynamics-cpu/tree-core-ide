<template>
    <v-col md="12">
        <v-tabs
            color="lime darken-2"
            v-model="libTabsModel">
            <v-tab>未安装</v-tab>
            <v-tab>已安装</v-tab>
        </v-tabs>
        <v-tabs-items
            dark
            v-model="libTabsModel">
            <v-tab-item height="200px">
                <v-card outlined>
                    <v-row>
                        <v-col md="12">
                            <v-card outlined>
                                <v-card-title>CPU Test Lib</v-card-title>
                                <v-card-text class="white--text text-md-body-1">
                                    <v-row class="tc-lib-detail-title">
                                        <v-tooltip
                                            color="black"
                                            bottom>
                                            <template v-slot:activator="{ on, attrs }">
                                                <span
                                                    v-bind="attrs"
                                                    v-on="on">
                                                    myyerrol
                                                </span>
                                            </template>
                                            <span>作者姓名</span>
                                        </v-tooltip>
                                        <v-divider
                                            vertical
                                            class="mx-3">
                                        </v-divider>
                                        <v-tooltip
                                            color="black"
                                            bottom>
                                            <template v-slot:activator="{ on, attrs }">
                                                <div
                                                    v-bind="attrs"
                                                    v-on="on">
                                                    <v-icon
                                                        dense
                                                        class="mr-1">
                                                        mdi-cloud-download-outline
                                                    </v-icon>
                                                    <span>1000</span>
                                                </div>
                                            </template>
                                            <span>下载次数</span>
                                        </v-tooltip>
                                        <v-divider
                                            vertical
                                            class="mx-3">
                                        </v-divider>
                                        <v-tooltip
                                            color="black"
                                            bottom>
                                            <template v-slot:activator="{ on, attrs }">
                                                <div
                                                    v-bind="attrs"
                                                    v-on="on">
                                                    <v-rating
                                                        color="amber"
                                                        dense
                                                        length="5"
                                                        half-increments
                                                        readonly
                                                        size="18"
                                                        v-bind:value="4.5">
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
                                            color="black"
                                            bottom>
                                            <template v-slot:activator="{ on, attrs }">
                                                <span
                                                    v-bind="attrs"
                                                    v-on="on">
                                                    基础模块
                                                </span>
                                            </template>
                                            <span>模块类型</span>
                                        </v-tooltip>
                                        <v-divider
                                            vertical
                                            class="mx-3">
                                        </v-divider>
                                        <v-tooltip
                                            color="black"
                                            bottom>
                                            <template v-slot:activator="{ on, attrs }">
                                                <span
                                                    v-bind="attrs"
                                                    v-on="on">
                                                    BSD
                                                </span>
                                            </template>
                                            <span>协议类型</span>
                                        </v-tooltip>
                                    </v-row>
                                    <v-row class="tc-lib-detail-title">
                                        <div>This is a test lib for cpu.</div>
                                    </v-row>
                                    <v-row class="tc-lib-detail-title">
                                        <v-col md="2"
                                               style="padding-left:0px;padding-right:20px">
                                            <v-select
                                                dense
                                                :items="libVersionItems"
                                                label="请选择软件库版本"
                                                outlined
                                                v-model="libVersionModel">
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
                                            height="35px"
                                            color="lime darken-2"
                                            v-model="libDetailTabsModel">
                                            <v-tab>详细介绍</v-tab>
                                            <v-tab>变更记录</v-tab>
                                        </v-tabs>
                                        <v-tabs-items
                                            dark
                                            v-model="libDetailTabsModel">
                                            <v-tab-item
                                                height="200px">
                                                <v-card>
                                                    <v-card-text v-html="libDetailContents"></v-card-text>
                                                </v-card>
                                            </v-tab-item>
                                        </v-tabs-items>
                                    </v-row>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-card>
            </v-tab-item>
            <v-tab-item>
                <v-card>
                    <v-card-text>
                        测试
                    </v-card-text>
                </v-card>
            </v-tab-item>
        </v-tabs-items>
    </v-col>
</template>
<script>
import marked from "marked";
import $ from "jquery";

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
            libTabsModel: null,
            libVersionItems: ["最新版本", "v1.3.1", "v1.3.0", "v1.2.5", "v1.1.0"],
            libVersionModel: "最新版本",
            libDetailTabsModel: null,
            libDetailContents: ""
        };
    },
    watch: {
    },
    mounted: function() {
        const html = marked("# Marked in Node.js\n\nRendered by **marked**.");
        console.log(html);
        this.libDetailContents = html;
    },
    methods: {
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
