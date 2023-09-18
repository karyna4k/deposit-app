<script setup lang="ts">
  import { ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useStore } from 'vuex';
  import AppInput from '@/components/AppInput.vue';
  import type { User } from '@/models';

  const router = useRouter();
  const route = useRoute();

  const store = useStore();

  const user = ref<User>({
    username: '',
    password: '',
  });

  const login = async () => {
    const success = await store.dispatch('authenticate', {
      username: user.value.username,
      password: user.value.password,
    });

    if (success) {
      console.log('Logged in!');
      const redirectPath = route.query.redirect || '/deposit';
      router.push(redirectPath);
    } else {
      console.log('Login failed!');
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
        </app-input>
        <app-input
          id="password"
          v-model:model-value="user.password"
        >
          Password
        </app-input>
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
  @use '@/assets/scss/utils/variables';
  @use '@/assets/scss/utils/mixins';
  .login {
    max-width: variables.$sm;
    width: 100%;
    margin: 0 auto;
    &-form {
      @include mixins.flex-center;
      flex-direction: column;
    }
  }
</style>
