<template>
  <div class="container-xl">
    <div class="row h-100">
      <div class="col-3">
        <space-list />
      </div>
      <div class="col-9">
        <div class="d-flex justify-content-between align-items-center">
          <h1 class="voice__name">VOICE MESSAGE: {{ this.test.job_id }}</h1>
          <div class="d-flex justify-content-end mt-4">
            <div>{{ this.test.plays }} plays</div>
            <div class="d-flex mx-4">
              <img class="workspace__dot mr-2" src="../assets/rename.png" />
              Share
            </div>
            <div><img class="workspace__dot" src="../assets/vertical_dott.png" /></div>
          </div>
        </div>
        <div class="transcription">
          <div class="transcription__header">
            Transcript in
            <span class="transcription__header_lang">English</span>
          </div>
          <div class="transcription__text">
            {{ this.test.transcription }}
          </div>
        </div>
      </div>
    </div>
    <vue-plyr v-if="audioPath">
      <audio controls crossorigin playsinline>
        <source :src="audioPath" type="audio/mp3" />
      </audio>
    </vue-plyr>
    <mini-audio audio-source="audioPath"></mini-audio>
    <div class="test_audio"></div>
  </div>

  <!-- {{ test[0].name }} -->
  <!-- <div v-if="test">
      <audio-player ref="audioPlayer" :audio-list="test.map((elm) => elm.url)" theme-color="#ff2929" />
    </div> -->
</template>

<script>
import SpaceList from '@/components/SpaceList.vue'

import { mapState, mapActions } from 'vuex'
import axios from 'axios'
export default {
  components: {
    SpaceList,
  },
  data() {
    return {
      test: {},
      audioPath: null,
    }
  },
  computed: {
    ...mapState('audio', ['audio_id']),
    ...mapState('audio', ['audios']),
    // audioUrl() {
    //   console.log(this.test)
    //   return axios.defaults.baseURL + this.test.media_path
    // },
  },
  watch: {
    // audio_id() {
    //   this.test = [
    //     {
    //       name: this.audio.title,
    //       url: axios.defaults.baseURL + this.audio.media_path,
    //     },
    //   ]
    // },
  },
  methods: {
    ...mapActions({
      getAudio: 'audio/get_audio_id',
      getAudios: 'audio/get_audio',
    }),
    async get_audio_id(id) {
      await axios
        .get('/audio/' + id, {
          headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
        })
        .then((response) => {
          this.test = response.data
          this.audioPath = 'http://api-waffle.mariposa.in.ua' + response.data.media_path
        })
    },
  },
  beforeMount() {
    this.getAudio(this.$route.params.transcriptionId).then((response) => {
      console.log(response)
    })
    this.get_audio_id(this.$route.params.transcriptionId)
  },
}
</script>

<style lang="scss">
.test_audio {
  position: fixed;
  bottom: 0;
  left: 192px;
  right: 0;
  width: 100%;
  height: 106px;
  background: url('../assets/player.png');
}
.voice {
  &__name {
    margin-top: 38px;
    font-weight: 600;
    font-size: 14px;
    line-height: 24px;
    /* identical to box height, or 171% */

    color: #52647c;
  }
}
.transcription {
  background: #ffffff;
  margin-top: 28px;
  padding: 24px;
  &__header {
    font-weight: 700;
    font-size: 20px;
    line-height: 30px;
    margin-bottom: 32px;
    color: #212121;
    &_lang {
      color: #ee6a25;
      background: #f8f9fa;
      border-radius: 6px;
      padding: 4px;
    }
  }
  &__text {
    font-weight: 400;
    font-size: 16px;
    line-height: 35px;
    /* or 219% */

    color: #212121;
  }
}
</style>
