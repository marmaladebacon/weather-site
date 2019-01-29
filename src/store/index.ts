import Vue from "vue";
import Vuex from "vuex";
import {MutationTree} from "vuex";
import {RootState, Position} from "./types";

Vue.use(Vuex);
Vue.config.devtools = true;

const state: RootState = {
  position: {
    lat: 0,
    lng: 0,
  }
}

const mutations:MutationTree<RootState> = {
  setPosition(state, position:Position){
    state.position = position;
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions: {}
});
