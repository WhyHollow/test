import axios from 'axios';

export default {
  namespaced: true,

  state: {
    token: null,
    user: null,
    role: null,
    menu: [],
  },

  getters: {
    authenticated(state) {
      return state.token && state.user;
    },

    user(state) {
      return state.user;
    },
    role(state) {
      return state.role;
    },
    menu(state) {
      return state.menu;
    },
  },

  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
    },

    SET_USER(state, data) {
      state.user = data;
    },
    SET_ROLE(state, role) {
      state.role = role;
    },
    SET_MENU(state, menu) {
      state.menu = menu;
    },
  },

  actions: {
    async register({ dispatch }, credentials) {
      await axios.post('/register', { ...credentials }).then(()=>{
        let authData = {
          email: credentials.email,
          password: credentials.password,
        };
        return dispatch('singIn', authData);
      }).catch((e)=>{
        return e.response.data && dispatch('getError', e);
      })


  },
    async singIn({ dispatch }, credentials) {
      try {
        let response = await axios.post('/login', credentials);

        return dispatch('attempt', response.data.response_token.access_token);
      } catch (error) {
        return error;
      }
    },

    async attempt({ commit, state }, token) {
      if (token) {
        commit('SET_TOKEN', token);
      }

      if (!state.token) {
        return;
      }

      try {
        let response = await axios.get('/profile');
        commit('SET_USER', response.data);
        commit('SET_ROLE', response.data.role_name);

      } catch (e) {
        commit('SET_TOKEN', null);
        commit('SET_USER', null);
        commit('SET_ROLE', null);
        return e;
      }
    },

    async singOut({ commit }) {
      return axios.post('/logout').then(() => {
        commit('SET_TOKEN', null);
        commit('SET_USER', null);
        commit('SET_ROLE', null);
      });
    },
  },
};
