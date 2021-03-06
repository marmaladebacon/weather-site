import axios from "axios";
import { Position } from "../store/types";

const APPID = "e7c35c7ebb985f498eceae6b60aac2de";
const rootUrl = "http://api.openweathermap.org/data/2.5/";
const weatherAPI = {
  async getCurrentWeather(position: Position) {
    try {
      return await axios.get(
        `${rootUrl}weather?lat=${position.lat}&lon=${
          position.lng
        }&units=metric&APPID=${APPID}`
      );
    } catch (error) {
      return {
        status: "Error fetching Current Forecast",
        error
      };
    }
  },
  async getFiveDayForecast(position: Position) {
    try {
      return await axios.get(
        `${rootUrl}forecast?lat=${position.lat}&lon=${
          position.lng
        }&units=metric&APPID=${APPID}`
      );
    } catch (error) {
      return {
        status: "Error fetching FiveDayForecast",
        error
      };
    }
  },

  getIconUrl(icon: string) {
    return `http://openweathermap.org/img/w/${icon}.png`;
  }
};

export default weatherAPI;
