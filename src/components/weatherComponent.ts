type Temperature = {
  temperature: number;
  high: number;
  low: number;
  feel: number;
}
import { WeatherService } from '../services/weatherService';

export class WeatherComponent {
  private weatherService = new WeatherService();

  constructor() {
    this.init();
  }

  init() {
    const form = document.querySelector("form")
    form.addEventListener("submit", e => e.preventDefault());
    form.addEventListener('submit', async () => {
      const weatherData = await this.weatherService.callApi.call(this.weatherService)
      this.drawData(weatherData);
    });
  }

  drawData(weatherData: any) {
    console.log("from component: ", weatherData);
    this.drawGeneralInfo();
    this.drawTemperature();
    this.drawSun();
  }

  drawGeneralInfo() {
    const generalContainer = document.querySelector(".temperature");
    const generalData = this.weatherService.getGeneralInfo();
    const unorderedList = document.createElement("ul");
    for (const key of Object.keys(generalData)) {
      const listElement = document.createElement("li");
      console.log(generalData[key].toString());
      listElement.textContent = generalData[key].toString();
      unorderedList.appendChild(listElement);
    }
    generalContainer.appendChild(unorderedList);
  }

  drawTemperature() {
    const temperatureContainer = document.querySelector(".temperature");
    const temperatureData = this.weatherService.getTemperature();
    const unorderedList = document.createElement("ul");
    for (const key of Object.keys(temperatureData)) {
      const listElement = document.createElement("li");
      console.log(temperatureData[key as keyof Temperature].toString());
      listElement.textContent = temperatureData[key as keyof Temperature].toString();
      unorderedList.appendChild(listElement);
    }
    temperatureContainer.appendChild(unorderedList);
  }

  drawSun() {
    const sunContainer = document.querySelector(".sun");
    const sunData = this.weatherService.getSunData();
    const timezone = this.weatherService.getTimezone();
    const unorderedList = document.createElement("ul");
    for (const key of Object.keys(sunData)) {
      const listElement = document.createElement("li");
      listElement.textContent = new Date((sunData[key] + timezone) * 1000).toLocaleTimeString();
      unorderedList.appendChild(listElement);
    }
    sunContainer.appendChild(unorderedList);
  }
}
