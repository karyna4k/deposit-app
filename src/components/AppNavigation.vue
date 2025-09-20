<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

const router = useRouter();
const route = useRoute();
const store = useStore();

const showLogout = computed(() => route.name !== 'login');

const logout = async () => {
  const success = await store.dispatch('logout');

  if (success) {
    console.log('Logged out!');
    router.push({ name: 'login' });
  } else {
    console.log('Logout failed!');
  }
};
</script>

<template>
  <div class="nav">
    <div class="container">
      <div class="nav-content">
        <router-link
          class="nav-logo"
          :to="{ name: 'login' }"
        >
          <img
            src="/img/logo.png"
            alt="deposit"
          >
        </router-link>
        <button
          v-if="showLogout"
          class="button"
          @click="logout"
        >
          Logout
        </button>
      </div>
    </div>
  </div>
</template>
