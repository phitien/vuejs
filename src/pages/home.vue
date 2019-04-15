<script>
import "../scss/pages/home.scss";
export default {
  computed: {
    letters() {
      return this.pageTitle
        .split("")
        .map(o => (o === " " ? "<!-- empty -->" : o));
    }
  },
  data() {
    return this.$store.state;
  },
  methods: {
    letterClass(o, i) {
      const { colors } = this;
      return colors[i];
    }
  }
};
</script>

<template>
  <div id="app" class="page page-home">
    <LayoutHeader
      ><h2>
        <span
          v-for="(o, i) in letters"
          v-html="o"
          :class="letterClass(o, i)"
        /></h2
    ></LayoutHeader>
    <LayoutContent>
      <slot></slot>
    </LayoutContent>
    <LayoutFooter>OfTien</LayoutFooter>
  </div>
</template>
