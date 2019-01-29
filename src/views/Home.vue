<template>
  <div>
    <div class="pos-debug">{{ position.lat }},{{ position.lng }}</div>
    <b-jumbotron>
      <MapComponent namespace="mainMapComponent"></MapComponent>
      <WeatherComponent :date="weatherData.date" :weather="weatherData.weather" 
        :icon="weatherData.icon" width="20">
      <FiveDayForecastComponent></FiveDayForecastComponent>
    </b-jumbotron>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import MapComponent from "@/components/MapComponent.vue";
import WeatherComponent from "@/components/WeatherComponent.vue";
import FiveDayForecastComponent from "@/components/FiveDayForecastComponent.vue";
import { State } from "vuex-class";
import { Position, WeatherBlob } from "../store/types";
import weatherAPI from '../utils/weatherAPI';

@Component({
  components: {
    MapComponent,
    WeatherComponent,
    FiveDayForecastComponent,
  }
})
export default class Home extends Vue {
  @State position!: Position;

  weatherData: WeatherBlob = {
    date: '2019-1-25',
    weather: "rain",
    icon: "10n",
  };

  @Watch('position')
  onPositionChanged(currVal:Position){
    weatherAPI.getCurrentWeather(currVal).then(data =>{
      console.log(data);
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
</style>
