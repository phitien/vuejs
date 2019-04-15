<script>
export default {
  data() {
    return this.$store.state;
  }
};
</script>

<template>
  <div class="header">
    <slot></slot>
  </div>
</template>
