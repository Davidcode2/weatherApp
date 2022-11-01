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
    const temperatureContainer = document.querySelector(".temperature");
    temperatureContainer.textContent = this.weatherService.getTemperature().temperature.toString();
  }

}
