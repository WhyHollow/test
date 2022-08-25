
import axios from 'axios';

export default {
  namespaced: true,

  state: {
    transcriptions: null,
    audios:[],
    audio_id:{}
  },

  getters: {

  },

  mutations: {
    SET_TRANS(state, transcriptions){
      state.transcriptions = transcriptions;
    },
    SET_AUDIO(state, audio){
      state.audios = audio.data;
    },
    SET_AUDIO_ID(state, audio){
      state.audio_id = audio.data;
    }
  },

  actions: {
    async get_audio({ commit }) {
      await axios.get('/audio').then((response)=>{
       return commit('SET_AUDIO', response.data);
      })
    },
    async get_audio_id({ commit },id) {
      await axios.get('/audio/'+id).then((response)=>{
       return commit('SET_AUDIO_ID', response.data);
      })
    },
    async upload_audio({ dispatch }, file) {

      let formData = new FormData();
      formData.append("title",  file.name);
      formData.append("audio", file);
      formData.append("lang", "en");
      formData.append("workspace_id", 2);

      await axios.post('/audio/upload',
      formData,{ headers: { 'Content-Type': 'multipart/form-data' } }).then(()=>{
       return dispatch('get_audio');
    })
    },

  },
};
