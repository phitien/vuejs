<script>
export default {
  data() {
    return this.$store.state;
  }
};
</script>

<template>
  <div class="footer">
    <slot></slot>
  </div>
</template>
