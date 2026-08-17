<template>
  <section class="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8 lg:px-10">
    <div class="space-y-3">
      <h1 class="text-4xl font-bold tracking-normal text-slate-950">
        Products
      </h1>
      <p class="text-base text-slate-600">Discover our latest products</p>
    </div>

    <ProductFilter v-model="searchQuery" />

    <div class="mt-8 space-y-6">
      <p class="text-base font-medium text-slate-700">
        {{ productsCountLabel }}
      </p>

      <slot name="products" :search-query="searchQuery" />
    </div>
  </section>
</template>

<script setup lang="ts">
import ProductFilter from "~/components/ProductFilter.vue";

const searchQuery = ref<string>("");
const productsCount = ref<number>(124);

const productsCountLabel = computed(() => `${productsCount.value} products found`);
</script>
