<template>
  <div>
  <!--<b-table :items="items">
  </b-table> -->
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import {Component, Watch} from 'vue-property-decorator';
import {State} from 'vuex-class';
import {Position} from '../store/types';
@Component
export default class FiveDataForecastComponent extends Vue{
  items:any;
  @State position!: Position;
  mounted(){

  }

  @Watch('position')
  onPositionChanged(currVal: Position){
    console.log('Position Changed Watched');
    console.log(this.position);
  }

}
</script>
<style scoped>

</style>


