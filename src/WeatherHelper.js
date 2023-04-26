const weatherHelper = {
  formatDate(utc, timezone, format) {
    const dt_timezone = new Date(utc * 1e3 + timezone * 1e3).toISOString();
    const dt = new Date(dt_timezone.substr(0, 19));
    if (format === "day") {
      return new dt.getDate();
    } else if (format === "time") {
      const hr = parseInt(dt_timezone.substr(11, 2), 0);
      if (hr === 12) {
        return "12pm";
      } else if (hr === 0) {
        return "12am";
      } else {
        return hr > 12 ? hr - 12 + "pm" : hr + "am";
      }
    } else if (format === "weekday") {
      return dt.toLocaleTimeString("lv-lv", { weekday: "long" }).split(" ")[0];
    } else if (format === "hhmm") {
      let datetext = dt.toTimeString();
      datetext = datetext.split(" ")[0];
      datetext = datetext.split(":")[0] + ":" + datetext.split(":")[1];
      return datetext;
    } else if (format === "ddmm") {
      let datetext = dt.toLocaleDateString("lv-lv", {
        day: "numeric",
        month: "numeric"
      });
      return datetext;
    }
  },
  getIconUrl(icon, size) {
    return `http://openweathermap.org/img/wn/${icon}@${size}x.png`;
  },
  convertDegreeToCompassPoint(winddeg) {
    const compassPoints = [
      "Z",
      "ZZA",
      "ZA",
      "AZA",
      "A",
      "ADA",
      "DA",
      "DDA",
      "D",
      "DDR",
      "DR",
      "RDR",
      "R",
      "RZR",
      "ZR",
      "ZZR"
    ];
    const rawPosition = Math.floor(winddeg / 22.5 + 0.5);
    const arrayPosition = rawPosition % 16;
    return compassPoints[arrayPosition];
  },
  formatData(dayResult, forecastResult) {
    let hours = [];
    let days = {};
    if (
      forecastResult &&
      forecastResult.list &&
      forecastResult.list.length > 0
    ) {
      forecastResult.list.map((item, index) => {
        hours.push({
          name: weatherHelper.formatDate(item.dt, dayResult.timezone, "hhmm"),
          temperature: parseInt(item.main.temp, 0),
          icon: item.weather[0].icon,
          iconTooltip: item.weather[0].description
        });

        let weekday = weatherHelper
          .formatDate(item.dt, dayResult.timezone, "weekday")
          .replace(",", "");
        let isDuplicated = days.hasOwnProperty(weekday);
        if (!isDuplicated) {
          days[weekday] = {
            min_temp: parseInt(item.main.temp_min, 0),
            max_temp: parseInt(item.main.temp_max, 0),
            name: weekday,
            date: weatherHelper.formatDate(item.dt, dayResult.timezone, "ddmm"),
            min_icon: item.weather[0].icon,
            min_iconTooltip: item.weather[0].description,
            max_icon: item.weather[0].icon,
            max_iconTooltip: item.weather[0].description
          };
        } else {
          let item_min = parseInt(item.main.temp_min, 0);
          let item_max = parseInt(item.main.temp_max, 0);

          if (item_min < days[weekday].min_temp) {
            days[weekday].min_temp = item_min;
            days[weekday].min_icon = item.weather[0].icon;
            days[weekday].min_iconTooltip = item.weather[0].description;
          }
          if (item_max > days[weekday].max_temp) {
            days[weekday].max_temp = item_max;
            days[weekday].max_icon = item.weather[0].icon;
            days[weekday].max_iconTooltip = item.weather[0].description;
          }
        }
      });
    }

    let weatherDataFromApi = {
      city: dayResult.name,
      country: dayResult.sys.country,
      temperature: parseInt(dayResult.main.temp, 0),
      feels_like_temparature: parseInt(dayResult.main.feels_like, 0),
      time: weatherHelper.formatDate(dayResult.dt, dayResult.timezone, "hhmm"),
      weekday: weatherHelper.formatDate(
        dayResult.dt,
        dayResult.timezone,
        "weekday"
      ),
      icon: dayResult.weather[0].icon,
      iconTooltip: dayResult.weather[0].description,
      windDirection: weatherHelper.convertDegreeToCompassPoint(
        dayResult.wind.deg
      ),
      windSpeed: parseInt(dayResult.wind.speed, 0),
      pressure: dayResult.main.pressure,
      humidity: dayResult.main.humidity,
      hours: hours,
      days: Object.values(days)
    };

    return weatherDataFromApi;
  }
};

export default weatherHelper;
