import './assets/css/base.css';
import './assets/scss/main.scss';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index'

if (!localStorage.getItem('user')) {
  const user = {
      username: "admin",
      password: "password123"
  };

  localStorage.setItem('user', JSON.stringify(user));
}

createApp(App)
  .use(router)
  .use(store)
  .mount('#app');
