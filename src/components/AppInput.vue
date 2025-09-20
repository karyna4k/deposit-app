<script setup lang="ts">
type PropTypes = {
  id: string;
  type?: string;
  modelValue: string | number;
};

withDefaults(defineProps<PropTypes>(), {
  type: 'text',
  placeholder: ''
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void;
}>();

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement | null;
  if (!target) return;
  emit('update:modelValue', target.value);
};

</script>

<template>
  <div class="field">
    <label
      :for="id"
      class="field-label"
    >
      <slot />
    </label>
    <input
      :id="id"
      :name="id"
      :value="modelValue"
      :type="type"
      class="field-input"
      autocomplete="off"
      v-bind="$attrs"
      @input="onInput"
    >
    <p class="field-error">
      <slot name="error" />
    </p>
  </div>
</template>
