<template>
  <div>
    <!--<b-table :items="items">
  </b-table> -->
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";
import { State } from "vuex-class";
import { Position } from "../store/types";
import weatherAPI from "../utils/weatherAPI";
@Component
export default class FiveDataForecastComponent extends Vue {
  items: any;
  @State position!: Position;
  mounted() {}

  @Watch("position")
  onPositionChanged(currPosition: Position) {
    console.log(this.position);
    weatherAPI
      .getFiveDayForecast({ lat: currPosition.lat, lng: currPosition.lng })
      .then(data => {
        console.log(data);
      });
  }
}
</script>
<style scoped></style>
