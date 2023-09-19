<script setup lang="ts">
type Option = {
  label: string,
  value: string
}

type PropTypes = {
  id: string;
  options: Option[];
  defaultOption: string;
  modelValue: string;
  labelName?: string;
};

defineProps<PropTypes>()
defineEmits(['update:modelValue']);
</script>

<template>
  <div class="field">
    <label
      v-if="labelName"
      :for="id"
      class="field-label"
    />
    <select
      :id="id"
      :name="id"
      class="field-input select"
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
    >
      <option
        value=""
        disabled
        selected
      >
        {{ defaultOption }}
      </option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.value }}
      </option>
    </select>
    <p
      class="field-error"
    >
      <slot name="error" />
    </p>
  </div>
</template>



