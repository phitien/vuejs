<script>
import { mapState } from "vuex";
import VueEcharts from "vue-echarts";

import "echarts/lib/chart/line";
import "echarts/lib/component/polar";
import "echarts-gl";

import { store } from "../../store";

export default {
  components: {
    chart: VueEcharts
  },
  data() {
    return this.$store.state;
  },
  computed: {
    options() {
      const { stock, stockData, start, end, minValueSpan } = this;
      const { categoryData, values } = stockData;
      const title = stock;
      return {
        backgroundColor: "#fff",
        color: "#c23632",
        animation: false,
        legend: { top: 10, left: "center", data: [title] },
        tooltip: {
          trigger: "axis",
          axisPointer: { type: "cross" },
          backgroundColor: "rgba(245, 245, 245, 0.8)",
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 10,
          textStyle: { color: "#000" },
          position: function(pos, params, el, elRect, size) {
            var obj = { top: 10 };
            obj[["left", "right"][+(pos[0] < size.viewSize[0] / 2)]] = 30;
            return obj;
          },
          extraCssText: "width: 170px"
        },
        axisPointer: {
          link: { xAxisIndex: "all" },
          label: { backgroundColor: "#777" }
        },
        grid: [{ left: "5%", right: "5%", bottom: 40 }],
        xAxis: [
          {
            type: "category",
            data: categoryData,
            scale: true,
            boundaryGap: false,
            axisLine: { onZero: false },
            splitLine: { show: false },
            splitNumber: 10,
            min: "dataMin",
            max: "dataMax",
            axisPointer: { z: 100 }
          }
        ],
        yAxis: [{ scale: true, splitArea: { show: true } }],
        dataZoom: [
          { type: "inside", start, end, minValueSpan },
          { show: true, type: "slider", bottom: 35, start, end, minValueSpan }
        ],
        series: [
          {
            name: title,
            type: "custom",
            renderItem: function(params, api) {
              const xValue = api.value(0);
              const o = api.coord([xValue, api.value(1)]);
              const c = api.coord([xValue, api.value(2)]);
              const l = api.coord([xValue, api.value(3)]);
              const h = api.coord([xValue, api.value(4)]);
              const sW = api.size([1, 0])[0] * 0.15;
              const style = api.style({
                stroke: o[1] > c[1] ? api.visual("color") : "#118c1b"
              });
              return {
                type: "group",
                children: [
                  {
                    type: "line",
                    shape: { x1: l[0], y1: l[1], x2: h[0], y2: h[1] },
                    style: style
                  },
                  {
                    type: "line",
                    shape: { x1: o[0], y1: o[1], x2: o[0] - sW, y2: o[1] },
                    style: style
                  },
                  {
                    type: "line",
                    shape: { x1: c[0], y1: c[1], x2: c[0] + sW, y2: c[1] },
                    style: style
                  }
                ]
              };
            },
            dimensions: [null, "open", "close", "lowest", "highest"],
            encode: {
              x: 0,
              y: [1, 2, 3, 4],
              tooltip: [1, 2, 3, 4]
            },
            data: values
          }
        ]
      };
    }
  },
  mounted() {
    this.$store.dispatch("fetch");
  }
};
</script>

<template>
  <div class="charts-container">
    <div v-if="loading" class="overlay inside">
      <i class="fas fa-spinner"></i>
    </div>
    <chart :options="options" />
  </div>
</template>
