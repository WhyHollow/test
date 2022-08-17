import { createStore } from "vuex";
import { state, getters, mutations } from "./mutations";
import { actions } from "./actions";
import accountUserModule from "@/store/modules/account/account-user/index";

export default createStore({
  state,
  getters,
  mutations,
  actions,
  modules: {
    accountUserModule,
  },
});
