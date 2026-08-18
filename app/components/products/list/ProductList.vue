<template>
  <div
    class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
  >
    <ProductCardView
      v-for="product in products"
      :key="product.id"
      :product="product"
    />
  </div>
</template>

<script setup lang="ts">
import ProductCardView from "~/components/products/list/ProductCardView.vue";
import type { IProduct } from "~/services/product/product-service";

interface IProps {
  products?: IProduct[];
}

withDefaults(defineProps<IProps>(), {
  products: () => [] as IProduct[],
});
</script>
