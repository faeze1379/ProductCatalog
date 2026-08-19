import { defineStore } from "pinia";
import type { IProduct } from "~/services/product/product-service";

const STORAGE_KEY = "favorite-products";

export const useFavoriteProductsStore = defineStore("favoriteProducts", () => {
  const products = ref<IProduct[]>([]);

  function loadFromStorage() {
    const storedProducts = localStorage.getItem(STORAGE_KEY);

    if (storedProducts) {
      products.value = JSON.parse(storedProducts) as IProduct[];
    }
  }

  function saveToStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products.value));
  }

  function isFavorite(productId: number) {
    return products.value.some((product) => product.id === productId);
  }

  function add(product: IProduct) {
    if (isFavorite(product.id)) {
      return;
    }

    products.value.push(product);
    saveToStorage();
  }

  function remove(productId: number) {
    products.value = products.value.filter(
      (product) => product.id !== productId,
    );

    saveToStorage();
  }

  function toggle(product: IProduct) {
    isFavorite(product.id) ? remove(product.id) : add(product);
  }

  return {
    products,
    loadFromStorage,
    isFavorite,
    add,
    remove,
    toggle,
  };
});
