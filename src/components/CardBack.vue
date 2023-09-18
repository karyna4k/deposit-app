<script setup lang="ts">
type PropTypes = {
  cvv: string;
  backgroundImage: string;
};

defineProps<PropTypes>()
</script>


<template>
  <div class="card-back">
    <img
      class="card-back-image"
      :src="backgroundImage"
      loading="lazy"
    >
    <div class="card-back-stripe" />
    <div class="card-back-cvv">
      {{ cvv || 'CVV/CVC' }}
    </div>
  </div>
</template>


<style scoped lang="scss">
  .card-back {
    position: absolute;
    z-index: 100;
    width: 100%;
    height: 100%;
    transform: rotateY(180deg);
    backface-visibility: hidden;
    &-image {
      width: 100%;
      height: 100%;
      border-radius: 1rem;
    }

    &-stripe {
      position: relative;
      bottom: 90%;
      width: 100%;
      padding: 1.5rem;
      opacity: 0.8;
      background-color: black;
    }

    &-cvv {
      position: absolute;
      left: 50%;
      bottom: 35%;
      width: 92%;
      padding: 0.75rem;
      border-radius: 0.25rem;
      transform: translateX(-50%);
      background-color: white;
      color: black;
      text-align: right;
    }

    @media screen and (max-width: 360px) {
      &-stripe {
        padding: 1.125rem;
      }
      &-cvv {
        padding: 0.5rem;
      }
    }
  }
</style>
