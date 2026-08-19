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

const categoryService = new CategoryService();

const {
  searchQuery,
  sortOrder,
  currentPage,
  selectedCategory,
  products,
  totalPages,
  isLoading,
} = await useProducts();

const { data: productCategories } = await useAsyncData<ICategory[]>(
  "product-categories",
  () => categoryService.get(),
  {
    server: false,
  },
);

const categories = computed(() => productCategories.value ?? []);
</script>
