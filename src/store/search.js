import axios from 'axios';

export default {
  namespaced: true,

  state: {

  },

  getters: {

  },

  mutations: {

  },

  actions: {
    async search({ commit }, data) {
        await axios.get('/audio/search',{
          params:{
            input:data
          }
        }
        ).then((response)=>{
         return commit('audio/SET_TRANS', response.data, { root: true });
      })


  },

  },
};
