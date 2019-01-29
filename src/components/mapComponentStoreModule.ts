import axios from "axios";
import weatherAPI from "../utils/weatherAPI";
import {Position} from "../store/types";
//open weather app id.  ideally place it in an environment variable
const APPID = "e7c35c7ebb985f498eceae6b60aac2de";
const rootUrl = "http://api.openweathermap.org/data/2.5/";
const mapComponentStoreModule = {
  namespaced: true,
  state: {
    position: {
      lat: 0,
      lng: 0
    },
    currentWeatherData: {}
  },

  actions: {
    updatePosition: async function(
      store: any,
      position: { lat: number; lng: number }
    ) {
      store.commit("setPosition", position, { root: true });
      const data = await weatherAPI.getCurrentWeather(position);
      console.log(data);
      store.commit("setCurrentWeatherData", data);
    }
  },

  mutations: {
    setPosition(state: any, position: Position) {
      state.position = position;
      //api.openweathermap.org/data/2.5/weather?lat=35&lon=139&APPID=e7c35c7ebb985f498eceae6b60aac2de
    },
    setCurrentWeatherData(state: any, currentWeatherData: any) {
      state.currentWeatherData = currentWeatherData;
    }
  }
};

export default mapComponentStoreModule;
