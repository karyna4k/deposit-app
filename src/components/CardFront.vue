<template>
  <div class="card-front">
    <img
      class="card-front-image"
      :src="backgroundImage"
      loading="lazy"
    >
    <img
      class="card-front-symbol"
      :src="symbolImage"
      loading="lazy"
    >
    <img
      class="card-front-chip"
      :src="'/img/chip.png'"
      loading="lazy"
    >
    <p class="card-front-number">
      {{ cardNumber ? cardNumber : '#### #### #### ####' }}
    </p>
    <div class="card-front-info">
      <p>Expires</p>
      <p class="card-front-expires value">
        {{ expireMonth || 'MM' }} /
        {{ (expireYear && sliceYear) || 'YY' }}
      </p>
    </div>
    <div class="card-front-info left">
      <p>Card Owner</p>
      <p class="value">
        {{ name || 'JOHN SMITH' }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

type PropTypes = {
  backgroundImage: string;
  symbolImage: string;
  cardNumber: string;
  expireMonth: string;
  expireYear: string;
  name: string;
};

const props = defineProps<PropTypes>()

const sliceYear = computed(() => {
  return props.expireYear.toString().slice(2);
});
</script>

<style scoped lang="scss">
  $x-space: 24px;
  $y-space: 16px;
  .card-front {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    z-index: 100;
    &-image {
      width: 100%;
      height: 100%;
      border-radius: 16px;
    }
    &-number {
      position: absolute;
      font-size: 26px;
      top: 35%;
      left: $x-space;
    }
    &-chip {
      position: absolute;
      top: $y-space;
      left: $x-space;
      height: 44px;
    }
    &-symbol {
      position: absolute;
      top: $y-space;
      right: $x-space;
      height: 48px;
    }
    &-info {
      position: absolute;
      bottom: $y-space;
      right: $x-space;
      color: white;
      text-align: left;
      margin: 0;
      &.left {
        left: $x-space;
      }
      .value {
        font-weight: bold;
      }
      p {
        margin: 0;
      }
    }
    &-expires {
      right: auto;
      left: $x-space;
    }
    @media screen and (max-width: 480px) {
      &-number {
        font-size: 22px;
      }
      &-info {
        font-size: 12px;
      }
      &-chip {
        height: 34px;
      }
      &-symbol {
        height: 38px;
      }
    }
    @media screen and (max-width: 360px) {
      &-number {
        font-size: 18px;
      }
    }
  }
</style>
