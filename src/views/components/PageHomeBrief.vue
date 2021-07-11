<template>
    <v-col md="12">
        <v-row>
            <v-col md="4">
                <v-card
                    height="100%"
                    outlined>
                    <v-card-text class="text-md-center">
                        <v-avatar
                            size="250px"
                            tile>
                            <v-img :src="require('../../../resources/logos/treecore_logo_main.svg').default"></v-img>
                        </v-avatar>
                        <div class="mt-8 text-md-h5 font-weight-bold white--text">木心集成开发环境</div>
                        <div class="mt-2 text-md-body1 white--text">下一代处理器集成开发环境</div>
                        <div class="mt-4 mb-8">
                            <img alt="license" src="https://img.shields.io/github/license/microdynamics-cpu/tree-core-ide.svg" />
                            <img alt="stars" src="https://img.shields.io/github/stars/microdynamics-cpu/tree-core-ide.svg" />
                            <img alt="forks" src="https://img.shields.io/github/forks/microdynamics-cpu/tree-core-ide.svg" />
                            <img alt="version" src="https://img.shields.io/badge/version-1.0.0-FF69B4.svg" />
                        </div>
                        <v-divider></v-divider>
                        <v-checkbox
                            color="lime darken-2"
                            label="是否在启动时显示主页"
                            v-model="homeCheckBoxModel"
                            class="white--text">
                        </v-checkbox>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col md="4">
                <v-card outlined>
                    <v-card-title>
                        <v-icon
                            color="lime darken-2"
                            small>mdi-square
                        </v-icon>
                        <span class="tc-card-title-span-20px">概述</span>
                    </v-card-title>
                    <v-card-text class="white--text">
                        <strong>木心IDE是一款功能强大的处理器通用开发平台</strong>，它集成有智能化的开发、调试和管理模块（目前还在开发中），不仅支持我们团队自研的<strong>木心系列处理器</strong>，未来还将面向所有符合标准的第三方处理器和外设模块。最后，我们开发木心IDE的初衷是希望<strong>它能够构建与激发爱好者们对处理器设计领域的信心与兴趣</strong>，并改变当下处理器学习与开发效率相对低下的窘迫局面，<strong>我们始终坚信半导体会像互联网那样借助开源的力量而迎来发展的黄金时代</strong>，为此我们愿意贡献出自己的一份力量。
                    </v-card-text>
                </v-card>
                <v-card outlined>
                    <v-card-title>
                        <v-icon
                            color="lime darken-2"
                            small>mdi-square
                        </v-icon>
                        <span class="tc-card-title-span-20px">特性</span>
                    </v-card-title>
                    <v-card-text>
                        <v-row>
                            <v-col
                                md="6"
                                v-for="item in homeFeatItems"
                                :key="item.title" >
                                <div class="font-weight-bold white--text">
                                    <v-icon
                                        color="lime darken-2"
                                        small>
                                        {{ item.icon }}
                                    </v-icon>
                                    <span class="tc-card-title-span-14px">{{ item.title }}</span>
                                </div>
                                <div class="text-md-caption">
                                    {{ item.text }}
                                </div>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col md="4">
                <v-card
                    height="100%"
                    outlined>
                    <v-card-title>
                        <v-icon
                            color="lime darken-2"
                            small>mdi-square
                        </v-icon>
                        <span class="tc-card-title-span-20px">计划</span>
                    </v-card-title>
                    <v-card-text>
                        <div class="mb-2 ml-3 font-weight-bold white--text">今天</div>
                        <v-timeline
                            align-top
                            dense
                            style="right:20px;">
                            <v-timeline-item
                                color="lime darken-2"
                                small
                                v-for="item in homeTimelineItems"
                                :key="item.date">
                                <v-row>
                                    <v-col
                                        md="3"
                                        class="px-0"
                                        style="padding-top:14px;">
                                        <div class="font-weight-bold white--text">
                                            {{ item.date }}
                                        </div>
                                    </v-col>
                                    <v-col
                                        md="9"
                                        style="padding-top:14px;">
                                        <div class="font-weight-bold white--text">
                                            {{ item.title }}
                                        </div>
                                        <div class="text-md-caption">
                                            {{ item.text }}
                                        </div>
                                    </v-col>
                                </v-row>
                            </v-timeline-item>
                        </v-timeline>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-col>
</template>
<script>
export default {
    name: "PageHomeBrief",
    data: function() {
        return {
            homeCheckBoxModel: true,
            homeFeatItems: [{
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
            homeTimelineItems: [{
                date: "2021-05",
                title: "开发代码",
                text: "根据之前确定的软件需求，团队成员开始分模块编写木心IDE。"
            }, {
                date: "2021-04",
                title: "确定需求",
                text: "经过团队内部的详细讨论，决定开发木心IDE并确定了相关需求。"
            }]
        }
    }
}
</script>
