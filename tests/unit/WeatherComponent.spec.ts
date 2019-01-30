import { shallowMount } from '@vue/test-utils';
import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import WeatherComponent from '../../src/components/WeatherComponent.vue';

describe('WeatherComponent', () => {
  let wrapper: any;
  beforeEach(()=>{
    Vue.use(BootstrapVue);

  })

  test('is a Vue instance', () => {
    wrapper = shallowMount(WeatherComponent);
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  test('produces the correct city name string if provided', () => {
    wrapper = shallowMount(WeatherComponent, {
      propsData: {
        date: '2019',
        weather: 'Sunny',
        icon: '10n',
        width: 40,
        height: 294,
        fontSize: 5,
        temperature: '12 to 15',
        city: 'london',
        country: 'GB',
      }
    })

    expect((wrapper.vm as any).cityName).toEqual('in london, ');
  });

  test('produces the correct city name string if empty', () => {
    wrapper = shallowMount(WeatherComponent, {
      propsData: {
        date: '2019',
        weather: 'Sunny',
        icon: '10n',
        width: 40,
        height: 294,
        fontSize: 5,
        temperature: '12 to 15',
        city: '',
        country: '',
      }
    })

    expect((wrapper.vm as any).cityName).toEqual('on Earth');
  });

  test('produces the correct country name string if provided', () => {
    wrapper = shallowMount(WeatherComponent, {
      propsData: {
        date: '2019',
        weather: 'Sunny',
        icon: '10n',
        width: 40,
        height: 294,
        fontSize: 5,
        temperature: '12 to 15',
        city: 'london',
        country: 'GB',
      }
    })

    expect((wrapper.vm as any).countryName).toEqual('United Kingdom');
  });

  test('produces the correct country name string if empty', () => {
    wrapper = shallowMount(WeatherComponent, {
      propsData: {
        date: '2019',
        weather: 'Sunny',
        icon: '10n',
        width: 40,
        height: 294,
        fontSize: 5,
        temperature: '12 to 15',
        city: 'london',
        country: '',
      }
    })

    expect((wrapper.vm as any).countryName).toEqual('');
  });
});