import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import Vuex from 'vuex'
import {state, mutations, getters} from '../../src/store';
import Home from "../../src/views/Home.vue";
import { shallowMount, createLocalVue } from "@vue/test-utils";
import weatherAPI from "../../src/utils/weatherAPI";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(BootstrapVue);

describe("Home View", ()=>{
  let wrapper: any;
  let store: any;
  let spy:any;  
  beforeEach(()=>{    
    store = new Vuex.Store({
      state,
      mutations,
      getters,
      actions: {}
    });
  });

  afterEach(() => {
    if(spy){
      spy.mockClear();
    }    
  });

  test("is a Vue instance", () => {
    wrapper = shallowMount(Home, {store, localVue });
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  test("default position set", () => {
    wrapper = shallowMount(Home, {store, localVue });    
    expect(wrapper.vm.position).toEqual({lat:0, lng:0});
  });

  test("not called when other mutations are called", (done) => {
    wrapper = shallowMount(Home, {store, localVue });
    spy = jest.spyOn(weatherAPI, 'getCurrentWeather');

    mutations.addToSavedPositions(state, {lat:0,lng:0});
    wrapper.vm.$nextTick(()=>{
      expect(spy).not.toBeCalled();
      done();
    });
  });

  test("called when position value changes", (done) => {
    wrapper = shallowMount(Home, {store, localVue });
    spy = jest.spyOn(weatherAPI, 'getCurrentWeather');

    mutations.setPosition(state, {lat:0,lng:1});
    wrapper.vm.$nextTick(()=>{
      expect(spy).toBeCalled();
      done();
    });    
  });
  
  
});