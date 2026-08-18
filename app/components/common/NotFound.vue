<template>
  <div class="p-8 text-center text-slate-600">
    <h2 class="text-lg font-bold text-slate-950">
      {{ title }}
    </h2>
    <div v-if="description" class="mt-2 text-sm text-slate-500">
      {{ description }}
    </div>
  </div>
</template>

<script setup lang="ts">
interface IProps {
  title: string;
  description?: string;
}

withDefaults(defineProps<IProps>(), {
  title: "",
  description: "",
});
</script>
