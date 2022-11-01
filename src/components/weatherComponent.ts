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
    const wrapper = document.querySelector(".wrapper");
    const card = document.createElement("div");
    card.classList.add("card", "cardShadow");
    const cardSecondary = document.createElement("div");
    cardSecondary.classList.add("card", "cardShadow");
    this.drawGeneralInfo(card);
    this.drawTemperature(card);
    this.drawSun(cardSecondary);
    wrapper.appendChild(card);
    card.appendChild(cardSecondary);
  }

  drawGeneralInfo(card: HTMLElement) {
    const generalData = this.weatherService.getGeneralInfo();
    const unorderedList = document.createElement("ul");
    for (const key of Object.keys(generalData)) {
      const listElement = document.createElement("li");
      listElement.textContent = generalData[key].toString();
      if (key === "name") {
        listElement.classList.add("largeText");
      }
      unorderedList.appendChild(listElement);
    }
    card.appendChild(unorderedList);
  }

  drawTemperature(card: HTMLElement) {
    const temperatureData = this.weatherService.getTemperature();
    const unorderedList = document.createElement("div");
    unorderedList.classList.add("card");
    for (const key of Object.keys(temperatureData)) {
      const listElement = document.createElement("li");
      listElement.classList.add("card-small");
      const glyphContainer = document.createElement("i");
      if (key === "high") {
        glyphContainer.classList.add("fa-solid", "fa-temperature-full", "largeText")
      } else if (key === "low") {
        glyphContainer.classList.add("fa-solid", "fa-temperature-empty", "largeText")
      } else if (key === "feel") {
        glyphContainer.classList.add("fa-solid", "fa-hand-holding", "largeText")
      } else if (key === "temperature") {
        glyphContainer.classList.add("fa-solid", "fa-temperature-half", "largeText")
      }
      listElement.textContent = `${temperatureData[key as keyof Temperature].toString()} °${(this.weatherService.units === "metric") ? "C" : "F"}`;
      listElement.appendChild(glyphContainer);
      unorderedList.appendChild(listElement);
    }
    card.appendChild(unorderedList);
  }

  drawSun(card: HTMLElement) {
    const sunData = this.weatherService.getSunData();
    const timezone = this.weatherService.getTimezone();
    const unorderedList = document.createElement("ul");
    for (const key of Object.keys(sunData)) {
      const glyphContainer = document.createElement("i");
      if (key === "sunrise") {
        glyphContainer.classList.add("fa-regular", "fa-sun", "largeText")
      } else if (key === "sunset") {
        glyphContainer.classList.add("fa-regular", "fa-moon", "largeText")
      }
      const listElement = document.createElement("li");
      listElement.classList.add("card-small-sans");
      listElement.textContent = new Date((sunData[key] + timezone) * 1000).toLocaleTimeString();
      listElement.appendChild(glyphContainer);
      unorderedList.appendChild(listElement);
    }
    card.appendChild(unorderedList);
  }
}
