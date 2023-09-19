<script setup lang="ts">
  import { RouterView } from 'vue-router';
  import AppNavigation from './components/AppNavigation.vue';
</script>

<template>
  <div class="app">
    <app-navigation />
  
    <router-view class="view" />
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/utils/index' as utils;
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.view {
  flex: 1;
  @include utils.flex-center;
  @include utils.py(2rem);
}
</style>
