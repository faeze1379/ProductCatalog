<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <NuxtLoadingIndicator color="#EAAA00" />
</template>

<script setup lang="ts">
import { useFavoriteProductsStore } from "~/stores/favorite-products";

const favoriteProductsStore = useFavoriteProductsStore();

onMounted(() => {
  favoriteProductsStore.loadFromStorage();
});
</script>
