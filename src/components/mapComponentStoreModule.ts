import axios from "axios";
//open weather app id.  ideally place it in an environment variable
const APPID = 'e7c35c7ebb985f498eceae6b60aac2de';
const rootUrl = 'http://api.openweathermap.org/data/2.5/';
const mapComponentStoreModule = {
  namespaced: true,
  state: {
    position: {
      lat: 0,
      lng: 0
    }
  },

  actions: {
    updatePosition: async function(
      store: any,
      position: { lat: number; lng: number }
    ) {
      store.commit("setPosition", position, {root:true});
      const data = await axios
        .get(
          `${rootUrl}weather?lat=${position.lat}&lon=${position.lng}
          &units=metric&APPID=${APPID}`
        );
      console.log(data);
    }
  },

  mutations: {
    setPosition(state: any, position: { lat: number; lng: number }) {
      state.position = position;
      //api.openweathermap.org/data/2.5/weather?lat=35&lon=139&APPID=e7c35c7ebb985f498eceae6b60aac2de
    }
  }
};

export default mapComponentStoreModule;
