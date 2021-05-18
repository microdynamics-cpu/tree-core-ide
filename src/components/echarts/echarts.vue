<template>
<div id="myChart" :style="{width: '300px', height: '300px'}"></div>
</template>

<script>
import echarts from "echarts";
Vue.prototype.$echarts = echarts;

export default {
    name: 'hello',
    data: function() {
        return {
            msg: 'Welcome to Your Vue.js App'
        }
    },
    mounted: function() {
        this.drawLine();
    },
    methods: {
        drawLine: function() {
            let myChart = this.$echarts.init(document.getElementById('myChart'))
            myChart.setOption({
                title: { text: '在Vue中使用echarts' },
                tooltip: {},
                xAxis: {
                    data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
                },
                yAxis: {},
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                }]
            });
        }
    }
}
</script>
