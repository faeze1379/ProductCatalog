<template>
  <main class="grid min-h-screen place-items-center bg-slate-50 px-5">
    <div class="text-center">
      <div class="text-4xl font-bold text-slate-950">
        Error {{ error.status }}
      </div>
      <button
        type="button"
        class="mt-5 text-base font-semibold text-gray-500"
        @click="handleBackToProducts"
      >
        Back to products
      </button>
    </div>
  </main>
</template>

<script setup lang="ts">
import type { NuxtError } from "#app";

defineProps<{
  error: NuxtError;
}>();

function handleBackToProducts() {
  void clearError({ redirect: "/products" });
}
</script>
