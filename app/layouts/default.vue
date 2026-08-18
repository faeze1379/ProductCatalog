<template>
  <div class="flex min-h-screen flex-col bg-slate-50">
    <DefaultLayoutHeader />
    <main>
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import DefaultLayoutHeader from "~/components/layouts/default-layout/DefaultLayoutHeader.vue";
</script>
