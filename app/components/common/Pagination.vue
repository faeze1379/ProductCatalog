<template>
  <nav
    v-if="totalPages > 1"
    class="mt-8 flex items-center justify-center gap-3"
    aria-label="Pagination"
  >
    <button
      type="button"
      class="h-10 rounded-lg bg-white px-4 text-sm font-semibold text-slate-700 shadow-[0_8px_22px_rgba(15,23,42,0.08)] disabled:cursor-not-allowed disabled:opacity-50"
      :disabled="modelValue <= 1"
      @click="emit('update:modelValue', modelValue - 1)"
    >
      Prev
    </button>

    <div class="text-sm font-semibold text-slate-700">
      {{ modelValue }} / {{ totalPages }}
    </div>

    <button
      type="button"
      class="h-10 rounded-lg bg-white px-4 text-sm font-semibold text-slate-700 shadow-[0_8px_22px_rgba(15,23,42,0.08)] disabled:cursor-not-allowed disabled:opacity-50"
      :disabled="modelValue >= totalPages"
      @click="emit('update:modelValue', modelValue + 1)"
    >
      Next
    </button>
  </nav>
</template>

<script setup lang="ts">
interface IProps {
  modelValue: number;
  totalPages: number;
}

defineProps<IProps>();

const emit = defineEmits<{
  "update:modelValue": [value: number];
}>();
</script>
