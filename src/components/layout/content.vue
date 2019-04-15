<script>
export default {
  data() {
    return this.$store.state;
  }
};
</script>

<template>
  <div class="content">
    <slot></slot>
  </div>
</template>
