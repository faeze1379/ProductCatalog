import ProductService, {
  type IProductSortOrder,
  type IProductsQueryParams,
  type IProductsResponse,
} from "~/services/product/product-service";

const productsLimit = 10;

export async function useProducts() {
  const searchQuery = ref<string>("");
  const debouncedSearchQuery = ref<string>("");
  const sortOrder = ref<IProductSortOrder | "">("");
  const currentPage = ref<number>(1);
  const route = useRoute();
  const productService = new ProductService();

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

  const products = computed(() => data.value?.products ?? []);
  const totalProducts = computed(() => data.value?.total ?? 0);
  const totalPages = computed(() =>
    Math.ceil(totalProducts.value / productsLimit),
  );
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

  return {
    searchQuery,
    sortOrder,
    currentPage,
    selectedCategory,
    products,
    totalPages,
    isLoading,
  };
}
