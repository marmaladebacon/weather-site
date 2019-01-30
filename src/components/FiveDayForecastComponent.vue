<template>
  <div>
    <div v-if="fetchError">
      Apologies, we have encountered an error fetching data
    </div>
    <b-row style="five-day-row" v-else>
      <b-col
        cols="2"
        v-for="(weatherData, index) in weatherDataItems"
        :key="index"
      >
        <WeatherComponent
          v-bind="weatherData"
          :width="10"
          :height="10"
          :font-size="0.5"
        ></WeatherComponent>
      </b-col>
    </b-row>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Component, Watch, Prop } from "vue-property-decorator";
import { Position, WeatherBlob } from "../store/types";
import { get } from "lodash-es";
import weatherAPI from "../utils/weatherAPI";
import WeatherComponent from "./WeatherComponent.vue";

@Component({
  components: {
    WeatherComponent
  }
})
export default class FiveDataForecastComponent extends Vue {
  weatherDataItems: WeatherBlob[] = [];
  errorFetching: boolean = false;
  @Prop(Object)
  position!: Position;
  mounted() {
    this.updateCard(this.position);
  }

  @Watch("position")
  onPositionChanged(currPosition: Position) {
    this.updateCard(currPosition);
  }

  updateCard(currPosition: Position) {
    //Future enhancement, debounce to limit requests
    return weatherAPI
      .getFiveDayForecast({ lat: currPosition.lat, lng: currPosition.lng })
      .then((response: any) => {
        if (response.error) {
          this.errorFetching = true;
          return;
        }
        this.errorFetching = false;

        const list = response.data.list;

        let city = get(response.data, ["city", "name"], "");
        let country = get(response.data, ["city", "country"], "");

        let dateToIgnore = list[0].dt_txt.split(" ")[0];

        // filter the array such that we only take the 9am forecast
        // to display a consistent time for all days going forward
        let result = list.filter((e: any) => {
          let dateTextArray = e.dt_txt.split(" ");
          let dateText = dateTextArray[0];
          if (dateText !== dateToIgnore) {
            if (dateTextArray[1] === "09:00:00") {
              dateToIgnore = dateTextArray[0];
              return true;
            }
          }
          return false;
        });

        // Readd 'nowish' forecast
        result.unshift(list[0]);

        // observed getting more than 5 results, truncate it
        if (result.length > 5) {
          result = result.slice(0, 5);
        }

        this.weatherDataItems = result.map((e: any) => {
          return {
            date: `${e.dt_txt.split(" ")[0]}`,
            temperature: `${e.main.temp_min}°C to ${e.main.temp_max}°C`,
            weather: e.weather[0].main,
            icon: e.weather[0].icon,
            city,
            country,
            error: false
          };
        });
      });
  }

  get fetchError() {
    return this.errorFetching;
  }
}
</script>
<style scoped>
.five-day-row {
  width: 100%;
  height: 100%;
  font-size: 14em;
}
</style>
