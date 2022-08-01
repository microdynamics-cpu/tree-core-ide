<template>
    <v-card
        height="100%"
        outlined>
            <v-card-title>
            <v-icon
                color="lime darken-2"
                small>mdi-square
            </v-icon>
            <span class="tc-card-title-span-20px">{{ i18n.ideModuleLib }}</span>
        </v-card-title>
        <v-card-text>
            <v-carousel
                :cycle="true"
                :show-arrows="false"
                height="350px"
                :hide-delimiter-background="true"
                interval="10000"
                @change="handleHomeLibCarousel">
                <v-carousel-item>
                    <BaseEcharts
                        ref="chartPie"
                        chartType="pie" />
                </v-carousel-item>
                <v-carousel-item>
                    <BaseEcharts
                        ref="chartBar"
                        chartType="bar" />
                </v-carousel-item>
            </v-carousel>
        </v-card-text>
    </v-card>
</template>
<script>
    import config from "@client/config/index";
    import BaseEcharts from "@client/components/base/BaseEcharts";

    export default {
        name: "PageHomeLib",
        components: {
            BaseEcharts
        },
        data: function() {
            return {
                i18n: config.i18n,
                libChartPieOpts: {
                    title: {
                        text: "软件库占比情况图",
                        subtext: "全部模块"
                    },
                    series: [{
                        data: []
                    }]
                },
                libChartBarOpts: {
                    title: {
                        text: "软件库下载情况图",
                        subtext: "全部模块"
                    },
                    xAxis: [{
                        data: []
                    }],
                    dataZoom: {
                        startValue: 0,
                        endValue: 0,
                    },
                    series: []
                }
            }
        },
        mounted: function() {
            let that = this;
            this.$store.dispatch("getLibChartData", {
                chartType: "pie"
            }).then((status) => {
                if (status) {
                    that.libChartPieOpts.series[0].data =
                        that.$store.state.libChartPieData;
                    that.$refs.chartPie.drawChartData("pie", that.libChartPieOpts);
                }
            });
        },
        methods: {
            handleHomeLibCarousel: function(num) {
                if (num === 1) {
                    let that = this;
                    this.$store.dispatch("getLibChartData", {
                        chartType: "bar"
                    }).then((status) => {
                        if (status) {
                            let xAxisData = that.$store.state.libChartBarXAxisData;
                            that.libChartBarOpts.xAxis[0].data = xAxisData;
                            that.libChartBarOpts.dataZoom = {
                                startValue: xAxisData.length - 3,
                                endValue: xAxisData.length - 1
                            };
                            that.libChartBarOpts.series =
                                that.$store.state.libChartBarData;
                            that.$refs.chartBar.drawChartData("bar", that.libChartBarOpts);
                        }
                    });
                }
            }
        }
    }
</script>
