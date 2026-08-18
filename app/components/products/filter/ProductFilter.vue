<template>
  <div class="mt-7 w-full">
    <BaseInput
      :model-value="modelValue"
      type="search"
      label="Search products"
      placeholder="Search products..."
      @update:model-value="emit('update:modelValue', $event)"
    >
      <template #suffix>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="size-6"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.8-3.8" />
        </svg>
      </template>
    </BaseInput>
  </div>
</template>

<script setup lang="ts">
interface IProps {
  modelValue?: string;
}

import BaseInput from "~/components/ui/BaseInput.vue";
withDefaults(defineProps<IProps>(), {
  modelValue: "",
});

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();
</script>
