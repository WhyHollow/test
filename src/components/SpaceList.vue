<template>
  <div class="p-3">
    <div
      v-for="workspace in list"
      :key="workspace.id"
      class="d-flex align-items-center mb-3 justify-content-between workspace__item"
      :class="workspace.id === 0 ? 'workspace__item-active' : null"
    >
      <img class="workspace__volume" src="../assets/volume.png" />
      <div>{{ workspace.name }}</div>
      <img class="workspace__dot" src="../assets/vertical_dott.png" />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      list: [
        {
          id: 0,
          name: '@admin@dd.cc',
        },
      ],
    }
  },
  computed: {
    // ...mapState("workspace", ["list"]),
  },
  methods: {
    ...mapActions({
      get_workspace: 'workspace/get_workspace',
    }),
  },
  beforeMount() {
    this.get_workspace()
  },
}
</script>

<style lang="scss" scoped>
.workspace {
  &__item {
    padding: 8px 16px;
    cursor: pointer;
    &-active {
      background: #ecebf4;
      border-radius: 8px;
    }
  }
  &__volume {
    width: 16px;
    height: 14px;
    cursor: pointer;
  }
  &__dot {
    width: 3px;
    height: 15px;
    cursor: pointer;
  }
}
</style>
