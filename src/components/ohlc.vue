<script>
export default {
  data() {
    return this.$store.state;
  },
  methods: {
    onChangeFn(e) {
      this.$store.commit("fnQuery", e.target.value);
      this.$store.dispatch("fetch");
    },
    listitemClass(item) {
      return { stock: true, active: item === this.$data.stock };
    },
    async loadStock(item) {
      await this.$store.commit("changeStock", item);
      await this.$store.dispatch("fetch");
    },
    showhide(e) {
      console.log(e);
      jQuery(e.target.closest(".left"))
        .find(".stocks")
        .slideToggle();
    },
    nothing(e) {
      e.preventDefault();
      e.stopPropagation();
    }
  }
};
</script>

<template>
  <div class="wrapper">
    <div class="left">
      <h3 @click="showhide">
        Stocks list
        <select v-model="fnQuery" @change="onChangeFn" @click="nothing">
          <option v-for="o in functions" v-bind:value="o.value">{{
            o.text
          }}</option>
        </select>
      </h3>
      <ul class="stocks">
        <li
          v-bind:class="listitemClass(item)"
          v-for="item in stocks"
          @click="loadStock(item)"
        >
          {{ item }}
        </li>
      </ul>
    </div>
    <div class="main">
      <ChartOhlc />
    </div>
  </div>
</template>
