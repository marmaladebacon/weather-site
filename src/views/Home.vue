<template>
  <div>
    <b-alert
      class="fixed-alert"
      :show="notifyCountdown"
      dismissible
      variant="success"
      @dismissed="notifyCountdown = 0"
      @dismiss-count-down="countDownChanged"
    >
      <p>
        Saved location {{ position.lat }}, {{ position.lng }}
      </p>
      <b-progress
        variant="info"
        :max="maxNotifyLifetime"
        :value="notifyProgress"
        height="4px"
      >
      </b-progress>
    </b-alert>
    <div class="btn-save">
      <b-button v-on:click="saveLocation" :size="sm" :variant="primary">
        Save Location
      </b-button>
    </div>
    <b-container>
      <b-row>
        <b-col cols="7">
          <MapComponent namespace="mainMapComponent"></MapComponent>
        </b-col>
        <b-col cols="2" align-v="center" align-h="start">
          <WeatherComponent
            v-bind="weatherData"
            width="25"
            height="50"
            font-size="0.8"
          ></WeatherComponent>
        </b-col>
      </b-row>
      <b-row class="five-day">
        <FiveDayForecastComponent
          :position="position"
        ></FiveDayForecastComponent>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import MapComponent from "@/components/MapComponent.vue";
import WeatherComponent from "@/components/WeatherComponent.vue";
import FiveDayForecastComponent from "@/components/FiveDayForecastComponent.vue";
import { State } from "vuex-class";
import { Position, WeatherBlob } from "../store/types";
import weatherAPI from "../utils/weatherAPI";

@Component({
  components: {
    MapComponent,
    WeatherComponent,
    FiveDayForecastComponent
  }
})
export default class Home extends Vue {
  @State position!: Position;

  maxNotifyLifetime: number = 2;
  notifyCountdown: number = 0;
  showDismissibleAlert: boolean = false;
  savedPosition: Position = {
    lat: 0,
    lng: 0
  };

  weatherData: WeatherBlob = {
    date: "2019-1-25",
    weather: "rain",
    icon: "10n",
    city: "london",
    temperature: "0-5",
    country: "GB",
    error: false,
  };

  @Watch("position")
  onPositionChanged(currVal: Position) {
    weatherAPI.getCurrentWeather(currVal).then((response: any) => {
      if(response.error){
        this.weatherData.error = true;
        return;
      }
      
      this.weatherData.error = false;
      this.weatherData.date = "Now";
      this.weatherData.weather = response.data.weather[0].description;
      this.weatherData.icon = response.data.weather[0].icon;
      this.weatherData.country = response.data.sys.country
        ? response.data.sys.country
        : "";
      this.weatherData.city = response.data.name;
      this.weatherData.temperature = `${response.data.main.temp_min}°C to ${
        response.data.main.temp_max
      }°C`;
    });
  }

  saveLocation() {
    this.$store.commit("addToSavedPositions", {
      lat: this.position.lat,
      lng: this.position.lng
    });
    this.notifyUserLocationSaved(this.position);
  }

  countDownChanged(notifyCountdown: number) {
    this.notifyCountdown = notifyCountdown;
  }

  notifyUserLocationSaved(position: Position) {
    this.notifyCountdown = this.maxNotifyLifetime;
    this.savedPosition = {
      lat: this.position.lat,
      lng: this.position.lng
    };
  }

  get notifyProgress():number{
    return this.maxNotifyLifetime - this.notifyCountdown + 1;
  }
}
</script>
<style scoped>
.fixed-alert {
  position: fixed;
  top: 0vh;
  left: 0vw;
  width: 100%;
}
.btn-save {
  z-index: 1000;
  position: absolute;
  right: 32.5vw;
  top: 58vh;
}
@media (min-width: 1080px) {
  .btn-save {
    right: 40vw;
  }
}

@media (max-width: 800px) {
  .btn-save {
    right: 16.5vw;
  }
}

.five-day {
  padding-top: 5px;
  height: 10vh;
}
</style>
