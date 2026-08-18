<template>
  <ProductCatalog />
</template>

<script setup lang="ts">
import ProductCatalog from "~/components/products/ProductCatalog.vue";

useSeoMeta({
  title: "Products",
  description: "Product catalog",
});
</script>
