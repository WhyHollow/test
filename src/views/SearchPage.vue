<template>
  <div class="dashbord">
    <div class="logo"><img src="../assets/logo_lrge.png" /></div>
    <div class="seacrh">
      <input
        type="text"
        placeholder="Search and discover"
        v-model="inputSearch"
        @change="search(inputSearch)"
      />
    </div>
    <div class="account"></div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      inputSearch: "",
    };
  },
  methods: {
    ...mapActions({
      search: "search/search",
    }),
  },
};
</script>

<style lang='scss' scoped>
.dashbord {
  display: flex;
  background: #ffffff;
  padding: 21px 28px 19px 25px;
  align-items: center;
}
.logo {
  img {
    width: 43px;
    margin-right: 43px;
  }
}
.seacrh {
  line-height: 24px;
  font-size: 14px;
  color: #c4c4c4;
  width: 800px;
  input {
    width: 100%;
    padding: 12px 20px;
    background: #f5f5f5;
    border-radius: 10px;
    border: none;
    &:focus-visible {
      outline: 0;
    }
  }
}
</style>