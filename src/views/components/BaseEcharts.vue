<template>
    <div id="chart" :style="{width:'100%', height:'80%'}"></div>
</template>
<script>
import Vue from "vue";
// import shine_dark from "../themes/shine_dark";
// import dark from "../themes/dark";
import * as echarts from "echarts";

Vue.prototype.$echarts = echarts;

export default {
    name: "BaseEcharts",
    data: function() {
        return {};
    },
    mounted: function() {
        this.drawPie();
    },
    methods: {
        drawPie: function() {
            let chart = this.$echarts.init(
                document.getElementById("chart"), "dark");
            chart.setOption({
                title: {
                    text: "软件库数量占比图",
                    subtext: "全部模块",
                    left: "center"
                },
                tooltip: {
                    trigger: "item",
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                legend: {
                    orient: "vertical",
                    left: "left",
                },
                series: [{
                    name: "占比情况",
                    type: "pie",
                    radius: "50%",
                    data: [{
                        name: "基础模块",
                        value: 50
                    }, {
                        name: "外设模块",
                        value: 30
                    }, {
                        name: "处理器核",
                        value: 10
                    }, {
                        name: "片上系统",
                        value: 5
                    }],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: "rgba(0, 0, 0, 0.5)"
                        }
                    }
                }],
                backgroundColor: "rgb(30, 30, 30)"
            });
        }
    }
}
</script>
