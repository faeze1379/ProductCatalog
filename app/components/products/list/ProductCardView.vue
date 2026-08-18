<template>
  <div
    class="overflow-hidden rounded-lg bg-white p-3 shadow-[0_8px_22px_rgba(15,23,42,0.08)]"
  >
    <div class="relative aspect-[4/3] rounded-lg bg-slate-50">
      <img
        :src="product.thumbnail"
        :alt="product.title"
        class="size-full object-contain p-3"
        loading="lazy"
      />
      <button
        type="button"
        class="absolute right-2.5 top-2.5 grid size-8 place-items-center rounded-full bg-white shadow-[0_6px_16px_rgba(15,23,42,0.12)]"
        aria-label="Add to favorites"
      >
        <img
          src="/icons/heart.svg"
          alt=""
          class="size-4"
          width="20"
          height="20"
          aria-hidden="true"
        />
      </button>
    </div>

    <div class="mt-3 space-y-2.5">
      <div class="space-y-1">
        <h2 class="line-clamp-2 min-h-10 text-sm font-bold text-slate-950">
          {{ product.title }}
        </h2>
        <div class="text-xs font-medium capitalize text-slate-500">
          {{ product.category }}
        </div>
      </div>

      <div class="text-sm font-bold text-slate-950">
        {{ formatPrice(product.price) }}
      </div>

      <div
        class="flex items-center gap-1.5 text-xs font-semibold text-slate-700"
      >
        <img
          src="/icons/star.svg"
          alt=""
          class="size-4"
          width="16"
          height="16"
          aria-hidden="true"
        />
        <span>{{ formatRating(product.rating) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IProduct } from "~/services/product/product-service";
import { formatPrice } from "~/utils/price-formatter";

interface IProps {
  product: IProduct;
}

withDefaults(defineProps<IProps>(), {
  product: {} as IProduct,
});

function formatRating(rating: number) {
  return rating.toFixed(1);
}
</script>
