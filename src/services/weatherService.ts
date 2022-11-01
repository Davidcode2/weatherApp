type Temperature = {
  temperature: number,
  high: number,
  low: number,
  feel: number
}
export class WeatherService {
  private location: HTMLInputElement = document.querySelector("#location");

  private weatherData: any;

  private temperature: Temperature;
  
  private units: string;

  async callApi() {
    const weatherData = await this.getWeatherIn(this.location.value, this.units="metric");
    this.extractData(weatherData);
    return weatherData;
  }

  getWeatherIn(location: string, units: string) {
    return fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&limit=3&appid=0c11016b48bd38806a52db2ea72606ce&units=${units}`
    ).then((res) => {
      return res.json();
    }).then(res => {
      return res;
    });
  }

  extractData(weatherObj: any) {
    console.log(weatherObj);
    this.weatherData = weatherObj;
    const temperatureData = this.setTemperature(weatherObj);
    const rainData = this.getRainData(weatherObj);
    const sunData = this.getSunData(weatherObj);
    const windData = this.getWindData(weatherObj);
  }

  setTemperature(weather: any) {
    this.temperature = { 
      temperature: weather.main.temp,
      high: weather.main.temp_max,
      low: weather.main.temp_min,
      feel: weather.main.feels_like
    }
  }

  getTemperature() {
    return this.temperature;
  }

  getRainData(weather: any) {
    return weather
  }

  getSunData(weather: any) {
    return weather.sys;
  }

  getWindData(weather: any) {
    return weather.wind;
  }

  public getWeather() {
    return this.weatherData;
  }
}
