<template>
  <div>
    <div ref="map" class="map"></div>
  </div>
</template>

<script lang="ts">
/// <reference types="@types/googlemaps" />
import Vue from "vue";
import Component from "vue-class-component";
import {} from "googlemaps";
import mapComponentState from './mapComponentState';

@Component
export default class MapComponent extends Vue {
  map: any;
  marker: any;

  created(){
    this.$store.registerModule("mapState", mapComponentState);
  }

  mounted() { //document.getElementById("myMap")
    this.map = new google.maps.Map(<Element>(this.$refs.map), {
      center: { lat: 61.180059, lng: -149.822075 },
      scrollwheel: false,
      zoom: 4
    });    

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {        
        console.log(position);
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        //this.map.setCenter(pos);
        this.map.setZoom(6);

        this.map.addListener('click', (evt:any) => {
          console.log(evt);
          
          this.placeMarkerAndPanTo({lat: evt.latLng.lat(), lng: evt.latLng.lng(),}, this.map);
        })

        this.placeMarkerAndPanTo(pos, this.map)

        /*
        this.marker = new google.maps.Marker({
          position: pos,
          map: this.map,          
        });        
        this.$store.dispatch('updatePosition',pos);
        */
      });
    } else {
      console.log("geolocation IS NOT available");
    }

  }

  placeMarkerAndPanTo(latLng:any, map:any) {
    if(this.marker){
      //remove old marker
      this.marker.setMap(null);
      this.marker = null;
    }
    this.marker = new google.maps.Marker({
      position: latLng,
      map: map
    });
    this.map.panTo(latLng);
    this.marker.addListener('click', () => {
      this.map.setZoom(12);
      //this.map.setCenter(this.marker.getPosition());
    });
    this.$store.dispatch('mapState/updatePosition',latLng);
  }
}
</script>
<style scoped>
.map {
  width: 400px;
  height: 400px;
}
</style>
