<template>
  <div>
    <b-card 
      :title="date"
      :img-src="iconUrl"
      :style="style"
      > 
    </b-card>
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
  @Prop(Number)
  width!: number;

  get iconUrl() {
    return weatherAPI.getIconUrl(this.icon);
  }
  get style(){
    return `style="max-width: ${this.width}rem;"`;
  }
}
</script>
<style scoped></style>
