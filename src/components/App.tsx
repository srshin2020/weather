import { useState, useEffect } from "react";
import "./App.css";
import api from "../util/api";
import type { WeatherResponse } from "../type/WeatherResponse";
import DetailInfo from "./app/DetailInfo";
import type { ForecastResponse } from "../type/ForecastResponse";
import SummaryInfo from "./app/SummaryInfo";
import ForecastInfo from "./app/ForecastInfo";

function App() {
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [forecast4days, setForecast4days] = useState<ForecastResponse | null>(
    null
  );

  useEffect(() => {
    const fetchWeather = async () => {
      const data = await api.getWeather("Seoul");
      console.log(data);
      setWeather(data);
    };
    fetchWeather();

    const fetchForecast5days3hours = async () => {
      const data = await api.getforecast5days3hours("Seoul");
      console.log(data);
      setForecast4days(data);
    };
    fetchForecast5days3hours();

    // 의존성 배열이 비어있으면 컴포넌트가 마운트될 때 한 번만 실행
  }, []);

  const showDetail = () => {
    console.log("showDetail");
    if (isShowDetail) {
      setIsShowDetail(false);
      setIsExiting(true);
      setTimeout(() => {
        setIsExiting(false);
      }, 1000);
    } else {
      setIsShowDetail(true);
    }
  };
  return (
    <div className="app">
      <div className="title">Weather App</div>
      <div>
        <div>나의 위치</div>
        <div className="city-name">서울</div>
      </div>
      <SummaryInfo weather={weather} />
      <ForecastInfo forecast4days={forecast4days} />
      <div
        className="detail-info-button card"
        onClick={() => {
          showDetail();
        }}
      >
        show detail information
      </div>

      {(isShowDetail || isExiting) && (
        <div className="detail-info-overlay">
          <DetailInfo
            weather={weather}
            isExiting={isExiting}
            showDetail={showDetail}
          />
        </div>
      )}
    </div>
  );
}

export default App;
