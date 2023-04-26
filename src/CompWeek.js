import "./styles.css";
import weatherHelper from "./WeatherHelper";
import { Card } from "antd";

export default function CompWeek(props) {
  const { data } = props;
  return (
    <>
      <Card>
        <div className="CompWeek-grid-Layout">
          {data.days &&
            data.days.length > 0 &&
            data.days.map((item, index) => {
              return (
                <div className="compWeek-grid-border-style" key={index}>
                  {item.name}
                  <br></br> {item.date}
                </div>
              );
            })}

          {data.days &&
            data.days.length > 0 &&
            data.days.map((item, index) => {
              return (
                <div className="compWeek-grid-border-style" key={index}>
                  Diena
                  <br></br>{" "}
                  <img
                    className="CompWeek-data-img-style"
                    src={weatherHelper.getIconUrl(item.max_icon, 4)}
                    alt="Nav bildes"
                    title={data.max_iconTooltip}
                  />
                  <br></br> {item.max_temp}°C
                </div>
              );
            })}
          {data.days &&
            data.days.length > 0 &&
            data.days.map((item, index) => {
              return (
                <div className="compWeek-grid-border-style" key={index}>
                  Nakts
                  <br></br>{" "}
                  <img
                    className="CompWeek-data-img-style"
                    src={weatherHelper.getIconUrl(item.min_icon, 4)}
                    alt="Nav bildes"
                    title={data.min_iconTooltip}
                  />
                  <br></br> {item.min_temp}°C
                </div>
              );
            })}
        </div>
      </Card>
    </>
  );
}
