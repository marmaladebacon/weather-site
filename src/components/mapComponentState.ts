import axios from "axios";
//open weather app id.  ideally place it in an environment variable
const APPID = "e7c35c7ebb985f498eceae6b60aac2de";
const mapComponentState = {
  namespaced: true,
  state: {
    position: {
      lat: 0,
      lng: 0
    }
  },

  actions: {
    updatePosition: function(
      store: any,
      position: { lat: number; lng: number }
    ) {
      store.commit("setPosition", position);
      return axios
        .get(
          `http://api.openweathermap.org/data/2.5/weather?lat=${
            position.lat
          }&lon=${position.lng}&units=metric&APPID=${APPID}`
        )
        .then(data => {
          console.log(data);
        });
    }
  },

  mutations: {
    setPosition: function(state: any, position: { lat: number; lng: number }) {
      state.position = position;
      //api.openweathermap.org/data/2.5/weather?lat=35&lon=139&APPID=e7c35c7ebb985f498eceae6b60aac2de
    }
  }
};

export default mapComponentState;