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
            return {}
        },
        mounted: function() {
            let chartType = this.chartType
            if (chartType == "chartPie") {
                this.drawChartPieData();
            }
            else if (chartType == "chartBar") {
                this.drawChartBarData();
            }
        },
        destroyed: function() {
        },
        methods: {
            drawChartPieData: function() {
                let chart = echarts.init(
                    document.getElementById("chartPie"), "dark");
                let options = {
                    title: {
                        text: "软件库数量占比图",
                        textStyle: {
                            color: "#fff",
                            fontWeight: "bold",
                            fontSize: 16
                        },
                        subtext: "全部模块",
                        subtextStyle: {
                            color: "#fff",
                            fontSize: 14
                        },
                        left: "center"
                    },
                    legend: {
                        left: "left",
                        orient: "vertical",
                        textStyle: {
                            color: "#fff",
                            fontSize: 12
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
                            },
                            restore: {
                            }
                        }
                    },
                    series: [{
                        type: "pie",
                        name: "占比情况",
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
            },
            drawChartBarData: function() {
                let chart = echarts.init(
                    document.getElementById("chartBar"), "dark");
                let options = {
                    title: {
                        text: "软件库下载情况图",
                        textStyle: {
                            color: "#fff",
                            fontWeight: "bold",
                            fontSize: 16
                        },
                        subtext: "全部模块",
                        subtextStyle: {
                            color: "#fff",
                            fontSize: 14
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
                            fontSize: 12
                        },
                        pageButtonGap: 2,
                        pageIconColor: "#fff",
                        pageIconSize: 12,
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
                        },
                        data: ["2021-02", "2021-03", "2021-04", "2021-05", "2021-06", "2021-07"]
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
                        startValue: "2021-05",
                        endValue: "2021-07",
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
                                type: ["line"]
                            },
                            restore: {
                            },
                        }
                    },
                    series: [{
                        type: "bar",
                        name: "基础模块",
                        emphasis: {
                            focus: "series"
                        },
                        data: [80, 85, 89, 90, 91, 92]
                    }, {
                        type: "bar",
                        name: "外设模块",
                        emphasis: {
                            focus: "series"
                        },
                        data: [130, 140, 145, 150, 151, 152]
                    }, {
                        type: "bar",
                        name: "处理器核",
                        emphasis: {
                            focus: "series"
                        },
                        data: [180, 160, 180, 200, 220, 200]
                    }, {
                        type: "bar",
                        name: "片上系统",
                        emphasis: {
                            focus: "series"
                        },
                        data: [100, 80, 85, 70, 80, 90]
                    }],
                    backgroundColor: "rgb(30, 30, 30)"
                };
                chart.setOption(options);
            }
        }
    }
</script>
<style scope>
    @import "../../../../resources/frameworks/layui/css/layui.css";

    .tc-echart {
        width: 100%;
        height: 80%;
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
