<template>
  <div class="mt-7 flex w-full flex-col gap-3 sm:flex-row sm:items-center">
    <div class="w-full sm:max-w-md">
      <BaseInput
        :model-value="modelValue"
        type="search"
        label="Search products"
        placeholder="Search products..."
        @update:model-value="emit('update:modelValue', $event)"
      >
        <template #suffix>
          <img
            src="/icons/search.svg"
            alt=""
            class="size-6"
            width="24"
            height="24"
            aria-hidden="true"
          />
        </template>
      </BaseInput>
    </div>

    <button
      type="button"
      aria-label="Sort by price"
      :class="[
        'flex h-12 w-full items-center justify-center gap-2 rounded-lg px-4 text-sm font-semibold shadow-[0_8px_22px_rgba(15,23,42,0.08)] sm:w-auto',
        props.sortOrder
          ? 'bg-violet-600 text-white'
          : 'border border-slate-200 bg-white text-slate-700',
      ]"
      @click="toggleSortOrder"
    >
      <span>Price</span>
      <img
        :src="sortIconSrc"
        alt=""
        class="size-4"
        :class="{ invert: props.sortOrder }"
        width="20"
        height="20"
        aria-hidden="true"
      />
    </button>
  </div>
</template>

<script setup lang="ts">
import BaseInput from "~/components/common/BaseInput.vue";
import type { IProductSortOrder } from "~/services/product/product-service";

type ProductSortValue = IProductSortOrder | "";

interface IProps {
  modelValue?: string;
  sortOrder?: ProductSortValue;
}

const props = withDefaults(defineProps<IProps>(), {
  modelValue: "",
  sortOrder: "",
});

const emit = defineEmits<{
  "update:modelValue": [value: string];
  "update:sortOrder": [value: ProductSortValue];
}>();

const sortIconSrc = computed(() =>
  props.sortOrder === "asc" ? "/icons/sort-asc.svg" : "/icons/sort-desc.svg",
);

function toggleSortOrder() {
  if (!props.sortOrder) {
    emit("update:sortOrder", "desc");
    return;
  }

  if (props.sortOrder === "desc") {
    emit("update:sortOrder", "asc");
    return;
  }

  emit("update:sortOrder", "");
}
</script>
