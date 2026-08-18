<template>
  <div class="flex gap-2 overflow-x-auto py-1 sm:flex-wrap sm:overflow-visible">
    <button
      type="button"
      class="h-10 shrink-0 whitespace-nowrap rounded-xl bg-violet-600 px-4 text-sm font-semibold text-white"
    >
      All
    </button>

    <button
      v-for="(category, index) in categories"
      :key="category"
      type="button"
      :class="[
        categoryButtonClasses,
        !isExpanded && index >= visibleCategoriesCount ? 'sm:hidden' : '',
      ]"
    >
      {{ category }}
    </button>

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
    categories?: ICategory[];
  }>(),
  {
    categories: () => [],
  },
);

const isExpanded = ref<boolean>(false);
const visibleCategoriesCount = 7;
const categoryButtonClasses =
  "h-10 shrink-0 whitespace-nowrap rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold capitalize text-slate-700";
const canToggleCategories = computed(() => props.categories.length > 7);
</script>
