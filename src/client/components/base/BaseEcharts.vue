<template>
    <div :id="chartType"
         class="tc-echart">
    </div>
</template>
<script>
    import * as echarts from "echarts";

    export default {
        name: "BaseEcharts",
        props: {
            chartType: {
                type: String,
                default: ""
            }
        },
        data: function() {
            return {
                baseOpts: {
                    "pie": {
                        title: {
                            textStyle: {
                                color: "#fff",
                                fontWeight: "bold",
                                fontSize: 18
                            },
                            subtextStyle: {
                                color: "#fff",
                                fontSize: 16
                            },
                            left: "center"
                        },
                        legend: {
                            left: "left",
                            orient: "vertical",
                            textStyle: {
                                color: "#fff",
                                fontSize: 14
                            },
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
                                        let seriesData = opt.series[0].data;
                                        let table = "<table class='layui-table tc-echart-table' lay-even lay-size='sm'>" +
                                                        "<thead>" +
                                                            "<tr>" +
                                                                "<th>指标类别</th>" +
                                                                "<th>指标内容</th>" +
                                                            "</tr>" +
                                                        "</thead>" +
                                                        "<tbody>";
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
                                    lang: ["<div class='tc-echart-dataview'>数据视图</div>",
                                        "<div class='tc-echart-closeBtn'></div>",
                                        "<div class='tc-echart-refreshBtn'>关闭</div>"]
                                },
                                saveAsImage: {
                                }
                            },
                            right: "5%"
                        },
                        series: [{
                            type: "pie",
                            name: "占比情况",
                            radius: "50%",
                            emphasis: {
                                itemStyle: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: "rgba(0, 0, 0, 0.5)"
                                }
                            }
                        }],
                        backgroundColor: "rgb(30, 30, 30)"
                    },
                    "bar": {
                        title: {
                            textStyle: {
                                color: "#fff",
                                fontWeight: "bold",
                                fontSize: 18
                            },
                            subtextStyle: {
                                color: "#fff",
                                fontSize: 16
                            },
                            left: "center"
                        },
                        legend: {
                            type: "scroll",
                            left: "left",
                            top: "top",
                            height: 30,
                            orient: "vertical",
                            textStyle: {
                                color: "#fff",
                                fontSize: 14
                            },
                            pageButtonGap: 2,
                            pageIconColor: "#fff",
                            pageIconSize: 14,
                            pageTextStyle: {
                                color: "#fff"
                            }
                        },
                        xAxis: [{
                            type: "category",
                            axisLine: {
                                lineStyle: {
                                    color:"#fff"
                                }
                            }
                        }],
                        yAxis: [{
                            type: "value",
                            axisLine: {
                                lineStyle: {
                                    color: "#fff",
                                }
                            }
                        }],
                        dataZoom: {
                            type: "slider",
                            textStyle: {
                                color: "#fff"
                            },
                            zoomLock: true,
                        },
                        tooltip: {
                            trigger: "axis",
                            axisPointer: {
                                type: "shadow"
                            }
                        },
                        toolbox: {
                            feature: {
                                dataView: {
                                    readOnly: false,
                                    optionToContent: function(opt) {
                                        console.log(opt);
                                        let series = opt.series;
                                        let table = "<table class='layui-table tc-echart-table' lay-even lay-size='sm'>" +
                                                        "<thead>" +
                                                            "<tr>" +
                                                                "<th>月份</th>";
                                        for (let i = 0; i < series.length; i++) {
                                            let seriesName = series[i].name;
                                            table += "<th>" + seriesName + "</th>"
                                        }
                                        table += "</tr></thead><tbody>";
                                        let xAxis = opt.xAxis;
                                        let xAxisData = xAxis[0].data;
                                        let seriesDataA = series[0].data;
                                        let seriesDataB = series[1].data;
                                        let seriesDataC = series[2].data;
                                        let seriesDataD = series[3].data;
                                        for (let i = 0; i < xAxisData.length; i++) {
                                            table += "<tr>" +
                                                        "<td>" + xAxisData[i] + "</td>" +
                                                        "<td>" + seriesDataA[i] + "</td>" +
                                                        "<td>" + seriesDataB[i] + "</td>" +
                                                        "<td>" + seriesDataC[i] + "</td>" +
                                                        "<td>" + seriesDataD[i] + "</td>" +
                                                    "</tr>";
                                        }
                                        table += "</tbody></table>";
                                        return table;
                                    },
                                    contentToOption: function(dom, opt) {
                                    },
                                    lang: ["<div class='tc-echart-dataview'>数据视图</div>",
                                        "<div class='tc-echart-closeBtn'></div>",
                                        "<div class='tc-echart-refreshBtn'>关闭</div>"]
                                },
                                saveAsImage: {
                                },
                                magicType: {
                                    type: ["line", "bar"]
                                }
                            },
                            right: "5%"
                        },
                        backgroundColor: "rgb(30, 30, 30)"
                    }
                }
            }
        },
        mounted: function() {
        },
        methods: {
            drawChartData: function(chartType, funcOpts) {
                let chartDOM = document.getElementById(this.chartType);
                let chart = echarts.getInstanceByDom(chartDOM);
                if (chart === undefined || chart === null) {
                    chart = echarts.init(chartDOM, "dark");
                }

                let baseOpts = this.baseOpts[chartType];

                chart.setOption(baseOpts);
                chart.setOption(funcOpts);

                if (chartType === "pie") {
                    let currentIndex = -1;
                    let chartTimer = 0;
                    function chartTimerFunc() {
                        let dataLen = funcOpts.series[0].data.length;
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
                }
            }
        }
    }
</script>
<style scope>
    @import "../../../../resources/frameworks/layui/css/layui.css";

    .tc-echart {
        width: 100%;
        height: 90%;
    }
    .tc-echart-table {
        position: relative;
        width: 90%;
        margin: auto;
        color: black;
        text-align: center;
    }
    .tc-echart-table th {
        font-weight: bold;
        text-align: center;
    }
    .tc-echart-dataview {
        font-size: 18px;
        text-align: center;
    }
    .tc-echart-closeBtn {
        position: absolute;
        width: 15px;
        height: 10px;
        margin: -5px 0px 0px -10px;
        background-color: white;
        cursor: default;
        pointer-events: none;
    }
    .tc-echart-refreshBtn {
        font-size: 14px;
    }
</style>
