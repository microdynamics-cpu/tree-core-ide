<template>
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
</template>
<script>
export default {
    name: "PageHomeNews",
    data: function() {
        return {
            homeNewsCarouselItems: [[{
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
