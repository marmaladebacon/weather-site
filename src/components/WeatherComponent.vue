<template>
  <div>
    <b-card :title="date" :img-src="iconUrl" :style="style" img-top>
      <p class="card-text smaller-text" :style="textStyle">
        {{ temperature }}
      </p>
      <p class="card-text smaller-text" :style="textStyle">
        {{ weather }} {{ cityName }}
        {{ countryName }}
      </p>
    </b-card>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import weatherAPI from "../utils/weatherAPI";
import countries from "i18n-iso-countries";

countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

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

  @Prop(Number)
  height!: number;

  @Prop(Number)
  fontSize!: number;

  @Prop(String)
  temperature!: string;

  @Prop(String)
  city!: string;

  @Prop(String)
  country!: string;

  get iconUrl() {
    return weatherAPI.getIconUrl(this.icon);
  }
  get style() {
    return `width: ${this.width}vw; height: ${this.height}vh;`;
  }

  get textStyle() {
    return `font-size: ${this.fontSize}rem;`;
  }

  get cityName(): string {
    if (this.city !== "Earth" && this.city !== "") {
      return `in ${this.city}, `;
    }
    return "on Earth";
  }

  get countryName(): string {
    if (this.country && this.country !== "") {
      return countries.getName(this.country, "en");
    }
    return this.country;
  }
}
</script>
<style scoped>
.card-img-top {
  width: 70%;
  height: 8vh;
  object-fit: cover;
  align-self: center;
}

.smaller-text {
  font-size: 0.7rem;
}

.card-body {
  padding: 0.15rem;
}

h4.card-title {
  font-size: 0.9rem;
  margin-bottom: 0.15rem;
}
</style>
