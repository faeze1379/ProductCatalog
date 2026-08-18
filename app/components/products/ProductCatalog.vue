<template>
  <section class="mx-auto w-full max-w-7xl px-5 py-8 sm:px-8 lg:px-10">
    <div class="space-y-2">
      <h1 class="text-3xl font-bold tracking-normal text-slate-950">
        Products
      </h1>
    </div>
    <ProductFilter v-model="searchQuery" v-model:sort-order="sortOrder" />
    <div v-if="categories.length > 0" class="mt-4">
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
      <template v-else>
        <ProductList :products="products" />
        <Pagination v-model="currentPage" :total-pages="totalPages" />
      </template>
    </div>
  </section>
</template>

<script setup lang="ts">
import ProductCategoryList from "~/components/products/category/ProductCategoryList.vue";
import ProductFilter from "~/components/products/filter/ProductFilter.vue";
import ProductList from "~/components/products/list/ProductList.vue";
import Loading from "~/components/common/Loading.vue";
import NotFound from "~/components/common/NotFound.vue";
import Pagination from "~/components/common/Pagination.vue";
import CategoryService, {
  type ICategory,
} from "~/services/category/category-service";
import ProductService, {
  type IProductSortOrder,
  type IProductsQueryParams,
  type IProductsResponse,
} from "~/services/product/product-service";

const searchQuery = ref<string>("");
const debouncedSearchQuery = ref<string>("");
const sortOrder = ref<IProductSortOrder | "">("");
const currentPage = ref<number>(1);
const route = useRoute();
const categoryService = new CategoryService();
const productService = new ProductService();
const productsLimit = 10;

let searchTimeout: ReturnType<typeof setTimeout> | undefined;

const selectedCategory = computed(() => {
  const category = route.params.category;

  return typeof category === "string" ? category : "";
});

const productQueryParams = computed<IProductsQueryParams>(() => {
  const params: IProductsQueryParams = {
    limit: productsLimit,
    skip: (currentPage.value - 1) * productsLimit,
    select: "id,title,category,price,rating,thumbnail",
  };

  if (sortOrder.value) {
    params.sortBy = "price";
    params.order = sortOrder.value;
  }

  return params;
});

const filtersCacheKey = computed(() => {
  const category = selectedCategory.value || "all";
  const query = debouncedSearchQuery.value.trim() || "default";
  const sort = sortOrder.value || "unsorted";

  return `${category}-${query}-${sort}`;
});

watch(
  filtersCacheKey,
  () => {
    currentPage.value = 1;
  },
  {
    flush: "sync",
  },
);

const productsCacheKey = computed(
  () => `products-${filtersCacheKey.value}-${currentPage.value}`,
);

const { data, pending, status } = await useAsyncData<IProductsResponse>(
  productsCacheKey,
  () => {
    const query = debouncedSearchQuery.value.trim();
    if (selectedCategory.value) {
      return productService.getByCategory(
        selectedCategory.value,
        productQueryParams.value,
      );
    }

    if (query) {
      return productService.search({
        ...productQueryParams.value,
        q: query,
      });
    }

    return productService.get(productQueryParams.value);
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
const totalProducts = computed(() => data.value?.total ?? 0);
const totalPages = computed(() =>
  Math.ceil(totalProducts.value / productsLimit),
);
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
