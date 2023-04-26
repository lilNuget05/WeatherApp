import "./styles.css";
import weatherHelper from "./WeatherHelper";

import { Card } from "antd";
import {
  CloudDownloadOutlined,
  CompassOutlined,
  SwapOutlined,
  CompressOutlined
} from "@ant-design/icons";

export default function CompToday(props) {
  const { data } = props;

  let iconSrc = "https://openweathermap.org/img/wn/" + data.icon + "@2x.png";
  return (
    <>
      <Card>
        <div className="today-layout-grid">
          <div>
            <div className="today-layout-title">
              {data.weekday} {data.time}
            </div>
            <div className="today-layout-content">
              <div className="today-layout-content-part1">
                <div className="layout-content-part1-city">
                  {data.city} ({data.country}) {data.iconTooltip}
                </div>
                <div className="layout-content-part1-img">
                  <img
                    src={weatherHelper.getIconUrl(data.icon, 4)}
                    alt="Nav bildes"
                    title={data.iconTooltip}
                  />
                  <div className="layout-content-part1-temp">
                    {data.temperature}°C
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="layout-content-feelsLikeTemp">
              <br></br>Pēc sajūtām {data.feels_like_temparature}°C
            </div>
            <div className="layout-parameters-grid">
              <div className="layout-parameter-icon">
                <CloudDownloadOutlined />
              </div>
              <div className="layout-parameter-name">Nokrišņi</div>
              <div className="layout-parameter-data">{data.humidity} %</div>
            </div>
            <div className="layout-parameters-grid">
              <div className="layout-parameter-icon">
                <CompassOutlined />
              </div>
              <div className="layout-parameter-name">Vēja virziens</div>
              <div className="layout-parameter-data">{data.windDirection}</div>
            </div>
            <div className="layout-parameters-grid">
              <div className="layout-parameter-icon">
                <SwapOutlined />
              </div>
              <div className="layout-parameter-name">Vēja ātrums</div>
              <div className="layout-parameter-data">{data.windSpeed} m/s</div>
            </div>
            <div className="layout-parameters-grid">
              <div className="layout-parameter-icon">
                <CompressOutlined />
              </div>
              <div className="layout-parameter-name">
                Atmosfēras<br></br>spiediens
              </div>
              <div className="layout-parameter-data">{data.pressure} hPa</div>
            </div>
          </div>
        </div>
        <div className="layout-hour-grid">
          {data.hours &&
            data.hours.length > 0 &&
            data.hours.slice(0, 6).map((item, index) => {
              return (
                <Card>
                  <div>{item.name}</div>
                  <div className="layout-grid">
                    <img
                      className="weather-icon-style"
                      src={weatherHelper.getIconUrl(data.icon, 4)}
                      alt="Nav bildes"
                      title={data.iconTooltip}
                    />{" "}
                    <div className="wather-temp-style">
                      {item.temperature}°C
                    </div>
                  </div>
                </Card>
              );
            })}
        </div>
      </Card>
    </>
  );
}
