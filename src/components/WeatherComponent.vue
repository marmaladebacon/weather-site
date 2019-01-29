<template>
  <div>
    <b-card :img-src="iconUrl"> </b-card>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import weatherAPI from "../utils/weatherAPI";

@Component
export default class WeatherComponent extends Vue {
  @Prop(String)
  date!: string;
  @Prop(String)
  weather!: string;
  @Prop(String)
  icon!: string;

  get iconUrl() {
    return weatherAPI.getIconUrl(this.icon);
  }
}
</script>
<style scoped></style>
