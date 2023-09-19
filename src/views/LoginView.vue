<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import AppInput from '@/components/AppInput.vue';
import type { User } from '@/models';

const router = useRouter();
const route = useRoute();
const store = useStore();

const user = ref<User>({ username: '', password: '' });
const errors = ref({ username: null, password: null, login: null })

const login = async () => {
  errors.value.login = null

  errors.value.username = user.value.username.trim() === "" ? "Username is required." : null;
  errors.value.password = user.value.password.trim() === "" ? "Password is required." : null;

  if (errors.value.login || errors.value.password) {
    return;
  }

  const isAuthenticated = await store.dispatch('authenticate', user.value);

  if (isAuthenticated) {
    const redirectPath = route.query.redirect || '/deposit';
    router.push(redirectPath);
  } else {
    errors.value.login = 'Invalid username or password.';
  }
};
</script>

<template>
  <div class="container">
    <div class="login">
      <form
        class="login-form"
        @submit.prevent="login"
      >
        <app-input
          id="username"
          v-model:model-value="user.username"
          autofocus
        >
          Username
          <template #error>
            {{ errors.username }}
          </template>
        </app-input>
        <app-input
          id="password"
          v-model:model-value="user.password"
          type="password"
        >
          Password
          <template #error>
            {{ errors.password }}
          </template>
        </app-input>
        <p
          v-if="errors.login"
          class="field-error login-form-error"
        >
          {{ errors.login }}
        </p>
        <button
          class="button"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @use '@/assets/scss/utils/index' as utils;
  .login {
    max-width: utils.$sm;
    width: 100%;
    margin: 0 auto;
    &-form {
      @include utils.flex-center;
      flex-direction: column;
      &-error {
        margin-bottom: 1rem;
      }
    }
  }
</style>
