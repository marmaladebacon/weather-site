<template>
  <div>
    <div class="pos-debug">{{position.lat}},{{position.lng}}</div>
    <b-jumbotron><MapComponent namespace="mainMapComponent"></MapComponent></b-jumbotron>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MapComponent from "@/components/MapComponent.vue";
import {State} from 'vuex-class';
import {Position} from '../store/types';

@Component({
  components: {
    MapComponent
  }
})
export default class Home extends Vue {
  @State position!:Position;
}
</script>
<style scoped>
.pos-debug {
  position:absolute;
  right: 5vw;
  top: 5vh;
  border: 1px black solid;
}
</style>
