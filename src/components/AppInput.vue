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

defineEmits(['update:modelValue']);

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
      @input="$emit('update:modelValue', $event.target.value)"
    >
    <p class="field-error">
      <slot name="error" />
    </p>
  </div>
</template>
