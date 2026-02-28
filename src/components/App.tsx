import { useState, useEffect } from "react";
import "./App.css";
import api from "../util/api";
import type { WeatherResponse } from "../type/WeatherResponse";
import type { ForecastResponse } from "../type/ForecastResponse";
import SummaryInfo from "./app/SummaryInfo";
import ForecastInfo from "./app/ForecastInfo";
import Menu from "./app/Menu";
import City from "./app/City";

function App() {
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [forecast4days, setForecast4days] = useState<ForecastResponse | null>(
    null,
  );

  const [cities, setCities] = useState<string[]>(["seoul"]);

  useEffect(() => {
    const fetchWeather = async () => {
      const data = await api.getWeather(cities[0]);
      if (data) {
        setWeather(data);
      }
    };
    fetchWeather();

    const fetchForecast5days3hours = async () => {
      const data = await api.getforecast5days3hours(cities[0]);
      console.log(data);
      setForecast4days(data);
    };
    fetchForecast5days3hours();

    // 의존성 배열이 비어있으면 컴포넌트가 마운트될 때 한 번만 실행
  }, []);

  return (
    <div className="app">
      <div className="title">Weather App</div>
      <City />
      <SummaryInfo weather={weather} />
      <ForecastInfo forecast4days={forecast4days} />
      <Menu weather={weather} cities={cities} setCities={setCities} />
    </div>
  );
}

export default App;
