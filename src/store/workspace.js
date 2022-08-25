
import axios from 'axios';

export default {
  namespaced: true,

  state: {
    list: null,
  },

  getters: {

  },

  mutations: {
    SET_LIST(state, lists){
      state.list = lists;
    }
  },

  actions: {
    async get_workspace({ commit }) {
      await axios.get('/workspace').then((response)=>{
       return commit('SET_LIST', response.data);
    })
    },
  },
};
