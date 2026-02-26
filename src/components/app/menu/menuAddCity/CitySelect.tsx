import { useEffect, useState } from "react";
import api from "../../../../util/api";
import "./CitySelect.css";
import type { WeatherResponse } from "../../../../type/WeatherResponse";

export default function CitySelect({ cities }: { cities: string[] }) {
  const [weatherList, setWeatherList] = useState<WeatherResponse[]>([]);

  useEffect(() => {
    const fetchWeatherList = async () => {
      for (const city of cities) {
        const data = await api.getWeather(city);
        if (data) {
          setWeatherList((prev) => [...prev, data]);
        }
      }
    };
    fetchWeatherList();

    // 의존성 배열이 비어있으면 컴포넌트가 마운트될 때 한 번만 실행
  }, []);

  return (
    <div className="city-select-overlay">
      {weatherList.map((weather, index) => (
        <div className="city-select-item card" key={index}>
          <div className="city-select-item-header">
            <div className="city-select-item-header-left">
              <div className="city-select-item-name">{weather.name}</div>
              <div className="city-select-item-time">
                {new Date(weather.dt * 1000).toLocaleTimeString("ko-KR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
            <div className="city-select-item-header-right">
              <div className="city-select-item-temperature-container">
                <div className="city-select-item-temperature">
                  {weather.main.temp}°C
                </div>
                <div className="city-select-item-weather-icon">
                  <img
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                    alt="날씨 아이콘"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* 도시 이름, 온도, 현재 시간, 날씨, 최고, 최저 온도, 날씨 아이콘 */}
          <div className="city-select-item-content">
            <div className="city-select-item-weather">
              {weather.weather[0].description}
            </div>
            <div className="city-select-item-temperature-container">
              <span className="city-select-item-max-temperature">
                최고 {weather.main.temp_max}°C
              </span>
              <span className="city-select-item-min-temperature-separator">
                {"  "}
              </span>
              <span className="city-select-item-min-temperature">
                최저 {weather.main.temp_min}°C
              </span>
            </div>
          </div>
        </div>
      ))}
      <div className="city-select-title card">지역 선택</div>
    </div>
  );
}
