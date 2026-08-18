<template>
  <label class="relative block w-full">
    <span v-if="label" class="sr-only">{{ label }}</span>
    <input
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      class="h-14 w-full rounded-lg border border-slate-200 bg-white px-5 text-base text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
      :class="[
        $slots.prefix ? 'pl-13' : 'pl-5',
        $slots.suffix ? 'pr-13' : 'pr-5',
      ]"
      @input="onInput"
    />
    <span
      v-if="$slots.prefix"
      class="pointer-events-none absolute left-4 top-1/2 flex size-6 -translate-y-1/2 items-center justify-center text-slate-950"
    >
      <slot name="prefix" />
    </span>
    <span
      v-if="$slots.suffix"
      class="pointer-events-none absolute right-4 top-1/2 flex size-6 -translate-y-1/2 items-center justify-center text-slate-950"
    >
      <slot name="suffix" />
    </span>
  </label>
</template>

<script setup lang="ts">
interface IProps {
  type?: "email" | "number" | "password" | "search" | "tel" | "text" | "url";
  label?: string;
  modelValue?: string;
  placeholder?: string;
}

withDefaults(defineProps<IProps>(), {
  type: "text",
  label: "",
  modelValue: "",
  placeholder: "",
});

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

function onInput(event: Event) {
  emit("update:modelValue", (event.target as HTMLInputElement).value);
}
</script>
