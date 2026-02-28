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
  const [selectedCityIndex, setSelectedCityIndex] = useState<number>(0);

  useEffect(() => {
    console.log(selectedCityIndex);
    console.log("cities[selectedCityIndex]: ", cities[selectedCityIndex]);
    const fetchWeather = async () => {
      const data = await api.getWeather(cities[selectedCityIndex]);
      if (data) {
        setWeather(data);
      }
    };
    fetchWeather();

    const fetchForecast5days3hours = async () => {
      const data = await api.getforecast5days3hours(cities[selectedCityIndex]);
      console.log(data);
      setForecast4days(data);
    };
    fetchForecast5days3hours();

    // 의존성 배열이 비어있으면 컴포넌트가 마운트될 때 한 번만 실행
    // 의존성 배열이 있으면 의존성 배열이 변경될 때 실행
  }, [selectedCityIndex]);

  return (
    <div className="app">
      <div className="title">Weather App</div>
      <City selectedCityName={cities[selectedCityIndex]} />
      <SummaryInfo weather={weather} />
      <ForecastInfo forecast4days={forecast4days} />
      <Menu
        weather={weather}
        cities={cities}
        setCities={setCities}
        setSelectedCityIndex={setSelectedCityIndex}
      />
    </div>
  );
}

export default App;
