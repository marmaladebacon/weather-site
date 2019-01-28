<template>
  <div>
    <MapComponent></MapComponent>    
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MapComponent from "@/components/MapComponent.vue";

@Component({
  components: {
    MapComponent
  }
})
export default class Home extends Vue {}
</script>
