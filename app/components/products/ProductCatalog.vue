<template>
  <section class="mx-auto w-full max-w-7xl px-5 py-8 sm:px-8 lg:px-10">
    <div class="space-y-2">
      <h1 class="text-3xl font-bold tracking-normal text-slate-950">
        Products
      </h1>
    </div>
    <ProductFilter v-model="searchQuery" />
    <div v-if="!isLoading" class="mt-4">
      <ProductCategoryList
        :active-category="selectedCategory"
        :categories="categories"
        class="mt-6"
      />
    </div>
    <div class="mt-4">
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
import ProductCategoryList from "~/components/products/category/ProductCategoryList.vue";
import ProductFilter from "~/components/products/filter/ProductFilter.vue";
import ProductList from "~/components/products/list/ProductList.vue";
import Loading from "~/components/common/Loading.vue";
import NotFound from "~/components/common/NotFound.vue";
import CategoryService, {
  type ICategory,
} from "~/services/category/category-service";
import ProductService, {
  type IProductsQueryParams,
  type IProductsResponse,
} from "~/services/product/product-service";

const searchQuery = ref<string>("");
const debouncedSearchQuery = ref<string>("");
const route = useRoute();
const categoryService = new CategoryService();
const productService = new ProductService();

let searchTimeout: ReturnType<typeof setTimeout> | undefined;

const selectedCategory = computed(() => {
  const category = route.params.category;

  return typeof category === "string" ? category : "";
});

const productQueryParams: IProductsQueryParams = {
  limit: 10,
  skip: 0,
  select: "id,title,category,price,rating,thumbnail",
};

const productsCacheKey = computed(() => {
  const category = selectedCategory.value || "all";
  const query = debouncedSearchQuery.value.trim() || "default";

  return `products-${category}-${query}`;
});

const { data, pending, status } = await useAsyncData<IProductsResponse>(
  productsCacheKey,
  () => {
    const query = debouncedSearchQuery.value.trim();
    if (selectedCategory.value) {
      return productService.getByCategory(
        selectedCategory.value,
        productQueryParams,
      );
    }

    if (query) {
      return productService.search({
        ...productQueryParams,
        q: query,
      });
    }

    return productService.get(productQueryParams);
  },
  {
    server: false,
  },
);

const { data: productCategories } = await useAsyncData<ICategory[]>(
  "product-categories",
  () => categoryService.get(),
  {
    server: false,
  },
);

const products = computed(() => data.value?.products ?? []);
const categories = computed(() => productCategories.value ?? []);
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
