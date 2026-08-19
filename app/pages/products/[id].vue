<template>
  <ProductDetails />
</template>

<script setup lang="ts">
import ProductDetails from "~/components/products/details/ProductDetails.vue";

useSeoMeta({
  title: "Product details",
  description: "Product details page",
});
</script>
