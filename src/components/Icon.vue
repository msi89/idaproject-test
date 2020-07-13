<template>
  <svg :fill="fill" :width="size" :height="size">
    <use :xlink:href="`${icons}#${name}`" />
  </svg>
</template>

<script>
export default {
  props: {
    fill: { type: String, default: "#333" },
    size: { type: Number, default: 14 },
    name: { type: String, required: true },
  },
  computed: {
    icons() {
      return require(`../assets/icons.svg`);
    },
  },
};
</script>

<style scoped></style>
