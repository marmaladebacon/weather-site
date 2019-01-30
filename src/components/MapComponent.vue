<template>
  <div>
    <div ref="map" class="map"></div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import {} from "googlemaps";
import { Prop } from "vue-property-decorator";
import { namespace } from "vuex-class";

@Component
export default class MapComponent extends Vue {
  @Prop(String)
  namespace!: string;
  map: any;
  marker: any;

  mounted() {
    const mapOptions = {
      center: {
        lat: 61.180059,
        lng: -149.822075
      },
      scrollwheel: false,
      zoom: 4
    };
    this.map = new google.maps.Map(this.$refs.map as Element, mapOptions);
    // Execute only if we can find the geolocation module
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position: any) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        this.map.setZoom(6);

        this.placeMarkerAndPanTo(pos, this.map);
      });
    }else{
      // default to a fixed location if we cannot
      const pos = {
        lat: 61.180059,
        lng: -149.822075
      }
      this.map.setZoom(6);
      this.placeMarkerAndPanTo(pos, this.map);
    }

    this.map.addListener("click", (evt: any) => {
      this.placeMarkerAndPanTo(
        { lat: evt.latLng.lat(), lng: evt.latLng.lng() },
        this.map
      );
    });
  }

  placeMarkerAndPanTo(latLng: any, map: any) {
    if (this.marker) {
      this.marker.setMap(null);
      this.marker = null;
    }
    this.marker = new google.maps.Marker({
      position: latLng,
      map: map
    });
    this.map.panTo(latLng);
    this.marker.addListener("click", () => {
      this.map.setZoom(5);
    });
    this.$store.commit(`setPosition`, latLng);
  }
}
</script>
<style scoped>

.map{
  width:32vw;
  height: 60vh;
}

@media (max-width: 800px) {
  .map {
    width: 45vw;
    height: 60vh;
  }
}

</style>
