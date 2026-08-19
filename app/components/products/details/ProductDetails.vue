<template>
  <section class="mx-auto w-full max-w-7xl px-5 py-8 sm:px-8 lg:px-10">
    <NuxtLink
      to="/products"
      class="inline-flex h-10 items-center rounded-lg bg-white px-4 text-sm font-semibold text-slate-700 shadow-[0_8px_22px_rgba(15,23,42,0.08)]"
    >
      Back to products
    </NuxtLink>

    <div class="mt-8">
      <Loading v-if="isLoading" />
      <NotFound
        v-else-if="!product"
        title="Product not found"
        description="The selected product is not available."
      />

      <div v-else class="grid gap-8 md:grid-cols-2">
        <ProductGallery :images="product.images" />
        <div class="space-y-5">
          <div class="space-y-2">
            <div class="flex items-start justify-between gap-4">
              <h1 class="text-3xl font-bold text-slate-950">
                {{ product.title }}
              </h1>
              <button
                type="button"
                :class="[
                  'grid size-10 shrink-0 place-items-center rounded-full shadow-[0_6px_16px_rgba(15,23,42,0.12)]',
                  isFavorite ? 'bg-violet-600' : 'bg-white',
                ]"
                @click="favoriteProductsStore.toggle(product)"
              >
                <img
                  src="/icons/heart.svg"
                  alt=""
                  class="size-5"
                  :class="{ invert: isFavorite }"
                  width="20"
                  height="20"
                  aria-hidden="true"
                />
              </button>
            </div>
            <div class="text-sm font-semibold capitalize text-slate-500">
              {{ product.category }}
            </div>
          </div>

          <div
            v-if="product.description"
            class="text-base leading-7 text-slate-600"
          >
            {{ product.description }}
          </div>

          <div class="flex items-center gap-5">
            <div class="text-2xl font-bold text-slate-950">
              {{ formatPrice(product.price) }}
            </div>
            <div class="flex items-center gap-1.5 text-sm font-semibold">
              <img
                src="/icons/star.svg"
                alt=""
                class="size-4"
                width="16"
                height="16"
                aria-hidden="true"
              />
              <span>{{ product.rating }}</span>
            </div>
          </div>

          <div class="grid gap-3 text-sm text-slate-600">
            <div class="rounded-lg bg-slate-50 p-3">
              <div class="font-semibold text-slate-950">Brand</div>
              <div class="mt-1">{{ product.brand || "Unknown" }}</div>
            </div>
            <div class="rounded-lg bg-slate-50 p-3">
              <div class="font-semibold text-slate-950">Stock</div>
              <div class="mt-1">{{ product.stock ?? 0 }}</div>
            </div>
            <div class="rounded-lg bg-slate-50 p-3">
              <div class="font-semibold text-slate-950">Category</div>
              <div class="mt-1 capitalize">{{ product.category }}</div>
            </div>
            <div class="rounded-lg bg-slate-50 p-3">
              <div class="font-semibold text-slate-950">Rating</div>
              <div class="mt-1">{{ product.rating }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import Loading from "~/components/common/Loading.vue";
import NotFound from "~/components/common/NotFound.vue";
import ProductGallery from "~/components/products/details/ProductGallery.vue";
import ProductService, {
  type IProduct,
} from "~/services/product/product-service";
import { useFavoriteProductsStore } from "~/stores/favorite-products";
import { formatPrice } from "~/utils/price-formatter";

const route = useRoute();
const productService = new ProductService();
const favoriteProductsStore = useFavoriteProductsStore();

const productId = computed(() => Number(route.params.id));

const {
  data: product,
  pending,
  status,
} = await useAsyncData<IProduct | null>(
  computed(() => `product-${route.params.id}`),
  () => {
    if (!Number.isFinite(productId.value)) {
      return Promise.resolve(null);
    }

    return productService.getById(productId.value);
  },
  {
    server: false,
  },
);

const isLoading = computed(() => pending.value || status.value === "idle");
const isFavorite = computed(() =>
  product.value ? favoriteProductsStore.isFavorite(product.value.id) : false,
);
</script>
