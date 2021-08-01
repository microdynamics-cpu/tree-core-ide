<template>
    <v-main>
        <v-container fluid>
            <v-row no-gutters>
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
                                        <v-img :src="require('../../../../resources/logos/treecore_logo_main.svg').default"></v-img>
                                    </v-avatar>
                                    <div class="mt-8 text-md-h5 font-weight-bold white--text">木心集成开发环境</div>
                                    <div class="mt-2 text-md-body-1 white--text">下一代处理器集成开发环境</div>
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
                <v-col md="12">
                    <v-divider class="my-4"></v-divider>
                </v-col>
                <v-col md="12">
                    <v-row>
                        <v-col md="12">
                            <v-card outlined>
                                <v-card-title>
                                    <v-icon
                                        color="lime darken-2"
                                        small>mdi-square
                                    </v-icon>
                                    <span class="tc-card-title-span-20px">新闻动态</span>
                                </v-card-title>
                                <v-card-text>
                                    <v-carousel
                                        height="410px;"
                                        show-arrows-on-hover>
                                        <v-carousel-item
                                            v-for="(item, index) in homeNewsCarouselItems"
                                            :key="index">
                                            <v-row>
                                                <v-col
                                                    md="4"
                                                    v-for="i in item"
                                                    :key="i.title" >
                                                    <v-card outlined>
                                                        <v-card-text>
                                                            <v-img
                                                                position="top center"
                                                                :src="i.src"
                                                                style="height:120px;">
                                                            </v-img>
                                                        </v-card-text>
                                                    </v-card>
                                                    <v-card outlined>
                                                        <v-card-subtitle
                                                            class="pt-2 pb-1 white--text"
                                                            style="overflow:hidden;
                                                                text-overflow:ellipsis;
                                                                white-space:nowrap;">
                                                            <span>{{ i.date }}</span>
                                                            <span>{{ i.title }}</span>
                                                        </v-card-subtitle>
                                                        <v-card-text style="height:160px;">{{ i.text }}</v-card-text>
                                                    </v-card>
                                                </v-col>
                                            </v-row>
                                        </v-carousel-item>
                                    </v-carousel>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
    </v-main>
</template>
<script>
export default {
    name: "PageHome",
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
            }],homeNewsCarouselItems: [[{
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
            }]]
        }
    }
}
</script>