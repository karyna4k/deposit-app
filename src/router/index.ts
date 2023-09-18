import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('@/views/LoginView.vue'),
  },

  {
    path: '/deposit',
    name: 'deposit',
    component: () => import('@/views/DepositView.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFoundView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// router.beforeEach((to, from) => {
//   if (to.meta.requiresAuth && !localStorage.getItem('user')) {
//     return { name: 'login', query: { redirect: to.fullPath } };
//   }
// });

export default router;
