<template>
  <div>
    <div class="pos-debug">{{ position.lat }},{{ position.lng }}</div>
    <b-container>
      <b-row>
        <b-col cols="7">
          <MapComponent namespace="mainMapComponent"></MapComponent>
        </b-col>
        <b-col cols="2" align-v="center" align-h="start">
          <WeatherComponent
            :date="weatherData.date"
            :weather="weatherData.weather"
            :icon="weatherData.icon"
            :city="weatherData.city"
            :country="weatherData.country"
            width="25"
            height="50"
            font-size="0.8"
          ></WeatherComponent>
        </b-col>
      </b-row>
      <b-row class="five-day">
        <FiveDayForecastComponent></FiveDayForecastComponent>
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

  weatherData: WeatherBlob = {
    date: "2019-1-25",
    weather: "rain",
    icon: "10n",
    city: "london",
    country: "GB"
  };

  @Watch("position")
  onPositionChanged(currVal: Position) {
    weatherAPI.getCurrentWeather(currVal).then((response: any) => {
      this.weatherData.date = "Now";
      this.weatherData.weather = response.data.weather[0].description;
      this.weatherData.icon = response.data.weather[0].icon;
      this.weatherData.country = response.data.sys.country
        ? response.data.sys.country
        : "";
      this.weatherData.city = response.data.name;
    });
  }
}
</script>
<style scoped>
.pos-debug {
  position: absolute;
  right: 5vw;
  top: 5vh;
  border: 1px black solid;
}
.five-day {
  padding-top: 5px;
  height: 10vh;
}
</style>
