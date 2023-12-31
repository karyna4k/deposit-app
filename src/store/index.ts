import { authenticate, logout } from '@/api/authAPI';
import { createStore } from 'vuex';

interface State {
  isAuthenticated: boolean;
}

const store = createStore({
  state: {
    isAuthenticated: false,
  },
  mutations: {
    setAuthenticated(state: State, value: boolean) {
      state.isAuthenticated = value;
    },
    logout(state: State) {
      state.isAuthenticated = false;
    },
  },
  actions: {
    async authenticate(
      { commit },
      { username, password }: { username: string; password: string }
    ) {
      try {
        const result = await authenticate(username, password);
        commit('setAuthenticated', result);
        return true;
      } catch (error) {
        return false;
      }
    },
    logout({ commit }) {
      logout();
      commit('logout');
    },
  },
});

export default store;
