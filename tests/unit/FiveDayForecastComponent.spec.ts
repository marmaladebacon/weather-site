import weatherAPI from '../../src/utils/weatherAPI';
import { shallowMount } from '@vue/test-utils';
import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import FiveDayForecastComponent from '../../src/components/FiveDayForecastComponent.vue';



jest.mock('../../src/utils/weatherAPI', ()=>{
  const data = {"coord":{"lon":139.01,"lat":35.02},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"base":"stations","main":{"temp":285.514,"pressure":1013.75,"humidity":100,"temp_min":285.514,"temp_max":285.514,"sea_level":1023.22,"grnd_level":1013.75},"wind":{"speed":5.52,"deg":311},"clouds":{"all":0},"dt":1485792967,"sys":{"message":0.0025,"country":"JP","sunrise":1485726240,"sunset":1485763863},"id":1907296,"name":"Tawarano","cod":200};
  return {
    getCurrentWeather(position: Position) {
      return new Promise((resolve, reject) =>{
        resolve(data);
      })
    },
    getFiveDayForecast(position: Position) {
      return new Promise((resolve, reject) =>{
        resolve(data);// change to 5 day data
      })
    },
  }
});

describe('WeatherComponent', () => {
  let wrapper: any;
  beforeEach(()=>{
    Vue.use(BootstrapVue);
  })
  test('is a Vue instance', () => {
    wrapper = shallowMount(FiveDayForecastComponent);
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  test('try async', () => {

  })
});