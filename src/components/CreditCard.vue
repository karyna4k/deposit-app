<script setup lang="ts">
import { computed } from 'vue';
import CardFront from './CardFront.vue';
import CardBack from './CardBack.vue';

type PropsType = {
  cardNumber: string,
  expireMonth: string,
  expireYear: string,
  cvv: string,
  name: string,
  showBack: string,
  symbolImage: string
}

defineProps<PropsType>()

const backgroundImage = computed(() => {
  return `/img/card-${Math.floor(Math.random() * 5) + 1}.png`;
})
</script>

<template>
  <div class="credit-card">
    <div
      class="credit-card__inner"
      :class="{
        'show-back': showBack
      }"
    >
      <card-front
        :background-image="backgroundImage"
        :symbol-image="symbolImage"
        :card-number="cardNumber"
        :expire-month="expireMonth"
        :expire-year="expireYear"
        :name="name"      
      />
      <card-back
        :cvv="cvv"
        :background-image="backgroundImage"
      />
    </div>
  </div>
</template>


<style scoped lang="scss">
.credit-card {
  font-family: "Source Code Pro", monospace;
  max-width: 420px;
  width: 100%;
  height: 245px;
  background-color: transparent;
  color: white;
  perspective: 1000px;
  display: inline-block;

  &__inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.6s;
    transform-style: preserve-3d;
  }

  @media screen and (max-width: 480px) {
    height: 210px;
  }

  @media screen and (max-width: 360px) {
    height: 180px;
  }
}
.show-back {
  transform: rotateY(180deg);
}
</style>