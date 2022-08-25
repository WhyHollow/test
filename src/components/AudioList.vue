<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1>All audios</h1>
      <div>
        <input type="file" accept=".x-wav,.mp3,.mp4,audio/*" ref="file" style="display: none" @change="uploadFile()" />
        <div @click="$refs.file.click()" class="d-flex upload">
          <img src="../assets/audio.svg" class="mr-2" />
          <div>Add New Audio</div>
        </div>
      </div>
    </div>
    <div class="audio__wrap">
      <div v-for="(item, i) in audios" :key="item.id" class="audio__content d-flex" @click="GoToAudio(item.id)">
        <div class="col-1">{{ i + 1 }}</div>
        <div class="col-2 audio__item">{{ item.title }}</div>
        <div class="col-6">{{ item.transcription ? item.transcription : 'Error' }}</div>
        <div class="col-2">{{ item.duration ? item.duration : 'Null' }}</div>
        <div class="col-1">
          <img class="workspace__dot" src="../assets/vertical_dott.png" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  computed: {
    ...mapState('audio', ['audios']),
  },
  methods: {
    ...mapActions({
      upload: 'audio/upload_audio',
      getAudio: 'audio/get_audio',
    }),
    uploadFile() {
      this.upload(this.$refs.file.files[0])
    },
    GoToAudio(id) {
      this.$router.push({
        name: 'transcriptions',
        params: { transcriptionId: id },
      })
    },
  },
  beforeMount() {
    this.getAudio()
  },
}
</script>

<style lang="scss">
.upload {
  cursor: pointer;
}
.audio__wrap {
  background: #ffffff;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.0698208);
  border-radius: 8px;
}
.audio__content {
  cursor: pointer;
  padding: 23px 22px;
  border-bottom: 1px solid #eaeaea;
  &:hover {
    background-color: rgba(0, 0, 0, 0.0698208);
  }
  &-in_progress {
    -webkit-box-shadow: inset 0px 0px 30px 0px rgba(25, 134, 255, 0.6);
    box-shadow: inset 0px 0px 30px 0px rgba(25, 134, 255, 0.6);
  }
  &-transcribed {
    -webkit-box-shadow: inset 0px 0px 30px 0px rgba(11, 255, 0, 0.6);
    box-shadow: inset 0px 0px 30px 0px rgba(11, 255, 0, 0.6);
  }
  &-error {
    -webkit-box-shadow: inset 0px 0px 30px 0px rgba(255, 0, 0, 0.6);
    box-shadow: inset 0px 0px 30px 0px rgba(255, 0, 0, 0.6);
  }
}
.audio {
  &__item {
    white-space: nowrap;
    overflow: hidden;
    border: dashed 2px inherit;
    padding: 5px;
    text-overflow: ellipsis;
  }
}
</style>
