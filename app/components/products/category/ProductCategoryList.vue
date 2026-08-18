<template>
  <div class="flex gap-2 overflow-x-auto py-1 sm:flex-wrap sm:overflow-visible">
    <NuxtLink
      to="/products"
      :class="getButtonClasses(!activeCategory)"
    >
      All
    </NuxtLink>

    <NuxtLink
      v-for="(category, index) in categories"
      :key="category"
      :to="getCategoryRoute(category)"
      :class="[
        getButtonClasses(activeCategory === category),
        !isExpanded && index >= visibleCategoriesCount ? 'sm:hidden' : '',
      ]"
    >
      {{ category }}
    </NuxtLink>

    <button
      v-if="canToggleCategories"
      type="button"
      class="hidden h-10 whitespace-nowrap rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-violet-600 sm:block"
      @click="isExpanded = !isExpanded"
    >
      {{ isExpanded ? "- Less" : "+ More" }}
    </button>
  </div>
</template>

<script setup lang="ts">
import type { ICategory } from "~/services/category/category-service";

const props = withDefaults(
  defineProps<{
    activeCategory?: string;
    categories?: ICategory[];
  }>(),
  {
    activeCategory: "",
    categories: () => [],
  },
);

const isExpanded = ref<boolean>(false);
const visibleCategoriesCount = 7;
const categoryButtonClasses =
  "grid h-10 shrink-0 place-items-center whitespace-nowrap rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold capitalize text-slate-700";
const canToggleCategories = computed(() => props.categories.length > 7);

function getCategoryRoute(category: ICategory) {
  return `/products/category/${encodeURIComponent(category)}`;
}

function getButtonClasses(isActive: boolean) {
  if (isActive) {
    return "grid h-10 shrink-0 place-items-center whitespace-nowrap rounded-xl bg-violet-600 px-4 text-sm font-semibold text-white";
  }

  return categoryButtonClasses;
}
</script>
