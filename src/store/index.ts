import Vue from "vue";
import Vuex from "vuex";
import {GetterTree} from "vuex";
import { MutationTree } from "vuex";
import { RootState, Position } from "./types";

Vue.use(Vuex);
Vue.config.devtools = true;

export const state: RootState = {
  position: {
    lat: 0,
    lng: 0
  },
  savedPositions: []
};

export const mutations: MutationTree<RootState> = {
  setPosition(state, position: Position) {
    state.position = position;
  },

  addToSavedPositions(state, position: Position) {
    state.savedPositions.push(position);
  }
};

export const getters: GetterTree<RootState, any> = {
  position: state => state.position,
  savedPositions: state => state.savedPositions, 
};

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions: {}
});
