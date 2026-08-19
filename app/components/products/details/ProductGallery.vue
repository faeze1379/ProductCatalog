<template>
  <div class="space-y-3">
    <div class="rounded-lg bg-white">
      <img
        v-if="selectedImage"
        :src="selectedImage"
        alt=""
        class="size-full object-contain p-6"
      />
    </div>

    <div v-if="images.length > 0" class="grid grid-cols-4 gap-3">
      <button
        v-for="image in images"
        :key="image"
        type="button"
        class="aspect-square overflow-hidden rounded-lg bg-white"
        @click="selectedImage = image"
      >
        <img
          :src="image"
          alt=""
          class="size-full object-contain p-2"
          loading="lazy"
        />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface IProps {
  images?: string[];
}

const props = withDefaults(defineProps<IProps>(), {
  images: () => [],
});

const selectedImage = ref<string>("");

watch(
  () => props.images,
  (images) => {
    selectedImage.value = images[0] ?? "";
  },
  { immediate: true },
);
</script>
