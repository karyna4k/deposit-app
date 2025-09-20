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
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const onChange = (event: Event) => {
  const target = event.target as HTMLSelectElement | null;
  if (!target) return;
  emit('update:modelValue', target.value);
}
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
      @change="onChange"
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



