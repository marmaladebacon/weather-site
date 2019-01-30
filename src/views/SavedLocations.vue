<template>
  <div>
    <b-container>
      <div v-for="(item, index) in getSavedPositions" :key="index">
        <FiveDayForecastComponent
          class="spacing"
          :position="item"
        ></FiveDayForecastComponent>
      </div>
    </b-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import FiveDayForecastComponent from "@/components/FiveDayForecastComponent.vue";
import { State } from "vuex-class";
import { Position } from "../store/types";

@Component({
  components: {
    FiveDayForecastComponent
  }
})
export default class SavedLocations extends Vue {
  @State savedPositions!: Position[];

  mounted() {
    console.log("Saved Locations mounted");
    console.log(this.savedPositions);
  }

  get getSavedPositions(): Position[] {
    return this.savedPositions;
  }
}
</script>
<style scoped>
.spacing {
  padding-top: 10px;
  padding-bottom: 10px;
}
</style>
