<template>
  <div class="container-xl">
    <div class="row h-100">
      <div class="col-3">
        <space-list />
      </div>
      <div class="col-9">
        <audio-list />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import SpaceList from "@/components/SpaceList.vue";
import AudioList from "@/components/AudioList.vue";
export default {
  name: "HomeView",
  components: {
    SpaceList,
    AudioList,
  },
};
</script>

<style lang="scss" scoped>
</style>
