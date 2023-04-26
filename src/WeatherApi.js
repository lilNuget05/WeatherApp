const API_KEY = "32a5bb7b9aa1126387e06acad817149e";
const API_CURRENT_URL = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&units=metric&lang=la`;
const API_FORECAST_URL = `https://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}&units=metric&lang=la`;

const weatherApiObject = {
  async getWeatherToday(city) {
    return fetch(API_CURRENT_URL + "&q=" + city)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        return {};
      });
  },
  async getForecastData(city) {
    return fetch(API_FORECAST_URL + "&q=" + city)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        return {};
      });
  }
};

export default weatherApiObject;
