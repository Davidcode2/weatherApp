type Temperature = {
  temperature: number;
  high: number;
  low: number;
  feel: number;
}

export class WeatherService {
  private location: HTMLInputElement = document.querySelector("#location");

  private weatherData: any;

  private temperature: Temperature;
  
  private sunData: any;
  
  public units: string = "metric";

  private generalInfo: any;

  private timezone: number;

  async callApi() {
    const weatherData = await this.getWeatherIn(this.location.value, this.units);
    this.extractData(weatherData);
    return weatherData;
  }

  getWeatherIn(location: string, units?: string) {
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
    const generalInfo = this.setGeneralInfo(weatherObj);
    const timezone = this.setTimezone(weatherObj);
    const rainData = this.getRainData(weatherObj);
    const sunData = this.setSunData(weatherObj);
    const windData = this.getWindData(weatherObj);
  }

  setGeneralInfo(weather: any) {
    this.generalInfo = {
      name: weather.name,
    };
  }

  setTemperature(weather: any) {
    this.temperature = { 
      temperature: weather.main.temp,
      high: weather.main.temp_max,
      low: weather.main.temp_min,
      feel: weather.main.feels_like
    }
  }

  setSunData(weather: any) {
    this.sunData = { 
      sunrise: weather.sys.sunrise,
      sunset: weather.sys.sunset
    }
  }

  setTimezone(weather: any) {
    this.timezone = weather.timezone; 
    console.log(this.timezone);
  }

  getGeneralInfo() {
    return this.generalInfo;
  }

  getTemperature() {
    return this.temperature;
  }

  getSunData() {
    return this.sunData;
  }

  getTimezone() {
    return this.timezone;
  }

  getRainData(weather: any) {
    return weather
  }

  getWindData(weather: any) {
    return weather.wind;
  }

  public getWeather() {
    return this.weatherData;
  }
}
