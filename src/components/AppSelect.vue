<template>
  <div class="select">
    <label
      v-if="labelName"
      :for="id"
      class="select-label"
    />
    <select
      :id="id"
      :name="id"
      class="select-input"
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
  </div>
</template>

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

defineProps<PropTypes>();
defineEmits(['update:modelValue']);
</script>

<style lang="scss" scoped>
@use '@/assets/scss/utils/variables';
@use '@/assets/scss/utils/palette';
@use '@/assets/scss/utils/mixins';
.select {
  margin-bottom: 1.25rem;
  &-label {
    display: block;
    margin-left: 1rem;
    margin-bottom: 0.375rem;
    font-size: variables.$t-sm;
    font-weight: 600;
    color: palette.$c-green-5;
    user-select: none;
  }
  &-input {
    width: 100%;
    padding: 1rem 1.5rem;
    border: variables.$b solid palette.$c-green-1;
    @include mixins.radius(3.5rem);
    transition: all 0.5s ease-in-out;
    background-image: linear-gradient(45deg, transparent 50%, gray 50%),
    linear-gradient(135deg, gray 50%, transparent 50%);
    background-position: calc(100% - 20px) calc(1em + 6px),
    calc(100% - 15px) calc(1em + 6px);
    background-size: 5px 5px, 5px 5px;
    background-repeat: no-repeat;
    appearance: none;
    &:hover {
      border-color: palette.$c-green-3;
    }
    &:focus-visible {
      outline: none;
    }
    &:focus {
      border-color: palette.$c-green-4;
      outline: palette.$c-green-4;
      box-shadow: 8px 4px 8px 0 rgba(114,135,64,0.2);
    }
  }
}
</style>