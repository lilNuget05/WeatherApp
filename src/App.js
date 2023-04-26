import { useState } from "react";
import "./styles.css";
import CompToday from "./CompToday";
import CompWeek from "./CompWeek";
import weatherApiObject from "./WeatherApi";
import weatherHelper from "./WeatherHelper";

import { GlobalOutlined } from "@ant-design/icons";
import { Layout, Input, Button, Empty } from "antd";

const { Content } = Layout;
const { Search } = Input;

export default function App() {
  const [inputText, setinputText] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [showWeek, setShowWeek] = useState(false);
  const [weatherData, setWeatherData] = useState({});
  const [warningText, setWarningText] = useState("");

  async function formatWeatherData(searchtext) {
    let dayResult = await weatherApiObject.getWeatherToday(searchtext);

    if (dayResult.cod === "404") {
      setShowResult(false);
      setWeatherData({});
      setWarningText(
        "Ievadītā pilsēta neeksistē! Pamēģiniet atrast citu pilsētu"
      );
      return;
    }

    let forecastResult = await weatherApiObject.getForecastData(searchtext);

    let weatherDataFromApi = weatherHelper.formatData(
      dayResult,
      forecastResult
    );

    setShowResult(true);
    setWarningText("");
    setWeatherData(weatherDataFromApi);
  }

  function onSearch(value) {
    if (value.length === 0) return;
    formatWeatherData(value);
  }
  function onBtnClick() {
    setShowWeek(true);
  }

  return (
    <div className="App">
      <div className="app-title">
        <GlobalOutlined className="app-title-icon" />
        <span className="app-title-text">Laika apstākļu aplikācija</span>
      </div>
      <Layout className="main-layout">
        <Content>
          <div className="content-search-row">
            <Search placeholder="Pilseta" onSearch={onSearch} enterButton />
            <div className="content-row-right">
              <Button onClick={onBtnClick}>Nedēļas prognoze</Button>
            </div>
          </div>
          {showResult && (
            <>
              <div className="comp-today">
                <CompToday data={weatherData} />
              </div>
              {showWeek && <CompWeek data={weatherData} />}
            </>
          )}
          {warningText.length > 0 && (
            <div className="warning-text">
              <Empty description={warningText} />
            </div>
          )}
        </Content>
      </Layout>
      {warningText.length > 0 && <span>{warningText}</span>}
    </div>
  );
}
