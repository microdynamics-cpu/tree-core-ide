<template>
    <div id="chart" :style="{width:'100%', height:'80%'}"></div>
</template>
<script>
import Vue from "vue";
import * as echarts from "echarts";
import $ from "jquery";

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
            let options = {
                title: {
                    text: "软件库数量占比图",
                    subtext: "全部模块",
                    left: "center"
                },
                legend: {
                    left: "left",
                    orient: "vertical"
                },
                tooltip: {
                    trigger: "item",
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                toolbox: {
                    feature: {
                        dataView: {
                            readOnly: false,
                            optionToContent: function(opt) {
                                // 关闭图表定时器
                                clearInterval(chartTimer);
                                // 渲染自定义表格
                                console.log(opt);
                                let series = opt.series;
                                let seriesName = series[0].name;
                                let seriesData = series[0].data;
                                let table = "<table border='1' cellspacing='0' " +
                                                   "style='width:100%;text-align:center;" +
                                                   "color:black;'><tbody><tr>" +
                                                "<td>指标类别</td>" +
                                                "<td>指标内容</td>" +
                                                "</tr>";
                                for (let i = 0; i < seriesData.length; i++) {
                                    table += "<tr>" +
                                                "<td>" + seriesData[i].name + "</td>" +
                                                "<td>" + seriesData[i].value + "</td>" +
                                             "</tr>";
                                }
                                table += "</tbody></table>";
                                return table;
                            },
                            contentToOption: function(dom, opt) {
                                console.log(dom, opt);
                                chartTimer = setInterval(chartTimerFunc, 3000);
                            },
                            lang: ["<div style='text-align:center;'>数据视图</div>",
                                   "<div style='display:none;'>测试</div>",
                                   '关闭']
                        },
                        saveAsImage: {
                        },
                        restore: {
                        }
                    }
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
            }
            chart.setOption(options);


            let currentIndex = -1;
            let chartTimer = 0;
            function chartTimerFunc() {
                let dataLen = options.series[0].data.length;
                // 取消高亮图形
                chart.dispatchAction({
                    type: "downplay",
                    seriesIndex: 0,
                    dataIndex: currentIndex
                });
                currentIndex = (currentIndex + 1) % dataLen;
                // 高亮当前图形
                chart.dispatchAction({
                    type: "highlight",
                    seriesIndex: 0,
                    dataIndex: currentIndex
                });
                // 显示tooltip
                chart.dispatchAction({
                    type: "showTip",
                    seriesIndex: 0,
                    dataIndex: currentIndex
                });
            }
            chartTimer = setInterval(chartTimerFunc, 3000);
            // chartTimer = setInterval(function() {
            //     let dataLen = options.series[0].data.length;
            //     // 取消高亮图形
            //     chart.dispatchAction({
            //         type: "downplay",
            //         seriesIndex: 0,
            //         dataIndex: currentIndex
            //     });
            //     currentIndex = (currentIndex + 1) % dataLen;
            //     // 高亮当前图形
            //     chart.dispatchAction({
            //         type: "highlight",
            //         seriesIndex: 0,
            //         dataIndex: currentIndex
            //     });
            //     // 显示tooltip
            //     chart.dispatchAction({
            //         type: "showTip",
            //         seriesIndex: 0,
            //         dataIndex: currentIndex
            //     });
            // }, 3000);
        }
    }
}
</script>
<style scoped>
</style>
