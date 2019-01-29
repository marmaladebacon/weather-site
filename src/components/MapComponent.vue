<template>
  <div>
    <div ref="map" class="map"></div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import {} from "googlemaps";
import mapComponentStoreModule from "./mapComponentStoreModule";
import { Prop } from "vue-property-decorator";
import { namespace } from "vuex-class";

@Component
export default class MapComponent extends Vue {
  @Prop(String)
  namespace!: string;
  map: any;
  marker: any;
  created() {
    this.$store.registerModule(this.namespace, mapComponentStoreModule);
  }

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

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position: any) => {
        console.log(position);
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        //this.map.setCenter(pos);
        this.map.setZoom(6);

        this.map.addListener("click", (evt: any) => {
          console.log(evt);

          this.placeMarkerAndPanTo(
            { lat: evt.latLng.lat(), lng: evt.latLng.lng() },
            this.map
          );
        });

        this.placeMarkerAndPanTo(pos, this.map);
      });
    }
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
      this.map.setZoom(12);
      //this.map.setCenter(this.marker.getPosition());
    });
    this.$store.dispatch(`${this.namespace}/updatePosition`, latLng);
  }
}
</script>
<style scoped>
.map {
  width: 400px;
  height: 400px;
}
</style>
