import { defineStore } from "pinia";
import type { IProduct } from "~/services/product/product-service";

export const useFavoriteProductsStore = defineStore("favoriteProducts", () => {
  const products = ref<IProduct[]>([]);

  function isFavorite(productId: number) {
    return products.value.some((product) => product.id === productId);
  }

  function add(product: IProduct) {
    if (isFavorite(product.id)) {
      return;
    }

    products.value.push(product);
  }

  function remove(productId: number) {
    products.value = products.value.filter(
      (product) => product.id !== productId,
    );
  }

  function toggle(product: IProduct) {
    if (isFavorite(product.id)) {
      remove(product.id);
      return;
    }

    add(product);
  }

  return {
    products,
    isFavorite,
    add,
    remove,
    toggle,
  };
});
