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
  <div class="input-field">
    <label
      :for="id"
      class="input-field-label"
    >
      <slot />
    </label>
    <input
      :id="id"
      :name="id"
      :value="modelValue"
      :type="type"
      class="input-field-input"
      autocomplete="off"
      v-bind="$attrs"
      @input="$emit('update:modelValue', $event.target.value)"
    >
  </div>
</template>
