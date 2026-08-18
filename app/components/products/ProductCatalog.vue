<template>
  <section class="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8 lg:px-10">
    <div class="space-y-3">
      <h1 class="text-4xl font-bold tracking-normal text-slate-950">
        Products
      </h1>
      <div class="text-base text-slate-600">Discover our latest products</div>
    </div>
    <ProductFilter v-model="searchQuery" />
    <div class="mt-8">
      <Loading v-if="isLoading" />
      <NotFound
        v-else-if="products.length === 0"
        title="No products found"
        description="There are no products to display."
      />
      <ProductList v-else :products="products" />
    </div>
  </section>
</template>

<script setup lang="ts">
import ProductFilter from "~/components/products/filter/ProductFilter.vue";
import ProductList from "~/components/products/list/ProductList.vue";
import Loading from "~/components/common/Loading.vue";
import NotFound from "~/components/common/NotFound.vue";
import ProductService, {
  type IProductsQueryParams,
  type IProductsResponse,
} from "~/services/product/product-service";

const searchQuery = ref<string>("");
const debouncedSearchQuery = ref<string>("");
const productService = new ProductService();

let searchTimeout: ReturnType<typeof setTimeout> | undefined;

const { data, pending, status } = await useAsyncData<IProductsResponse>(
  "products",
  () => {
    const query = debouncedSearchQuery.value.trim();
    const params: IProductsQueryParams = {
      limit: 10,
      skip: 0,
      select: "id,title,category,price,rating,thumbnail",
    };
    if (query) {
      return productService.search({
        ...params,
        q: query,
      });
    }

    return productService.get(params);
  },
  {
    server: false,
    watch: [debouncedSearchQuery],
  },
);

const products = computed(() => data.value?.products ?? []);
const isLoading = computed(() => pending.value || status.value === "idle");

watch(searchQuery, (value) => {
  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }

  searchTimeout = setTimeout(() => {
    debouncedSearchQuery.value = value.trim();
  }, 500);
});

onBeforeUnmount(() => {
  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }
});
</script>
