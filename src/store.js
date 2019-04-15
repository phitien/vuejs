import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export const data = {
  pageTitle: "OHLC chart with Vue.js",
  loading: false,
  colors: [
    "blueviolet",
    "brown",
    "burlywood",
    "cadetblue",
    "chartreuse",
    "chocolate",
    "forestgreen",
    "green",
    "orange",
    "deeppink",
    "saddlebrown",
    "sienna",
    "slategrey",
    "snow",
    "steelblue",
    "tan",
    "teal",
    "tomato",
    "turquoise",
    "violet",
    "wheat",
    "yellowgreen"
  ],
  start: 0,
  end: 100,
  minValueSpan: 1,
  showList: true,
  fnQuery: "TIME_SERIES_DAILY",
  functions: [
    { value: "", text: "Select function" },
    { value: "TIME_SERIES_DAILY", text: "Time Series (Daily)" },
    {
      value: "TIME_SERIES_DAILY_ADJUSTED",
      field: "Time Series (Daily)",
      text: "Time Series (Daily Adjusted)"
    },
    {
      value: "TIME_SERIES_WEEKLY",
      field: "Weekly Time Series",
      text: "Time Series (Weekly)"
    },
    {
      value: "TIME_SERIES_WEEKLY_ADJUSTED",
      field: "Weekly Adjusted Time Series",
      text: "Time Series (Weekly Adjusted)"
    },
    {
      value: "TIME_SERIES_MONTHLY",
      field: "Monthly Time Series",
      text: "Time Series (Monthly)"
    },
    {
      value: "TIME_SERIES_MONTHLY_ADJUSTED",
      field: "Monthly Adjusted Time Series",
      text: "Time Series (Monthly Adjusted)"
    }
  ],
  stocks: [
    "MSFT",
    "AAPL",
    "INTC",
    "NFLX",
    "ORCL",
    "CMCSA",
    "GOOG",
    "LUV",
    "HOG",
    "GOOGL",
    "AMZN"
  ],
  stock: "MSFT",
  stockData: { categoryData: [], values: [] },
  url() {
    const { fnQuery, stock } = this;
    return `https://www.alphavantage.co/query?function=${fnQuery}&apikey=YEL6VCPIIYP83YZC&symbol=${stock}`;
  },
  chartData(data) {
    const categoryData = [];
    const values = [];
    let i = 0;
    for (let date in data) {
      const row = data[date];
      categoryData.unshift(date);
      const value = [
        i,
        parseFloat(row["1. open"]),
        parseFloat(row["4. close"]),
        parseFloat(row["3. low"]),
        parseFloat(row["2. high"]),
        parseFloat(row["5. volume"])
      ];
      values.unshift(value);
      i++;
    }
    return { categoryData, values };
    // const parseDate = d3.timeParse("%Y-%M-%d");
    // const rows = [];
    // let i = 0;
    // for (let date in data) {
    //   const row = data[date];
    //   rows.unshift({
    //     open: Number(row["1. open"]),
    //     close: Number(row["4. close"]),
    //     high: Number(row["2. high"]),
    //     low: Number(row["3. low"]),
    //     volume: Number(row["5. volume"]),
    //     date: parseDate(date)
    //   });
    // }
    // return rows;
  }
};

export const pageProps = Object.keys(data);
export function origin(cmp) {
  return Object.keys(cmp.$props).reduce((rs, k) => {
    rs[k] = cmp[k];
    return rs;
  }, {});
}

export const store = new Vuex.Store({
  state: data,
  getters: {
    stockData: state => state.stockData
  },
  mutations: {
    loading(state, v) {
      Vue.set(state, "loading", v);
    },
    fnQuery(state, v) {
      Vue.set(state, "fnQuery", v);
    },
    changeStock(state, v) {
      Vue.set(state, "stock", v);
    },
    changeStockData(state, v) {
      Vue.set(state, "stockData", v);
    }
  },
  actions: {
    async fetch({ state, commit }) {
      commit("loading", true);
      const data = await d3.json(state.url()).then(async res => {
        const [info, data] = Object.values(res);
        const refinedData = state.chartData(data);
        return refinedData;
      });
      commit("loading", false);
      commit("changeStockData", data);
    }
  }
});
