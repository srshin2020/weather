import type { WeatherResponse } from "../../../../../type/WeatherResponse";
import "./CitySelectList.css";

export default function CitySelectList({
  weathers,
  setSelectedCityIndex,
  setIsShowCitySelect,
}: {
  weathers: WeatherResponse[];
  setSelectedCityIndex: React.Dispatch<React.SetStateAction<number>>;
  setIsShowCitySelect: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const handleClick = (index: number) => {
    console.log(index);
    setSelectedCityIndex(index);
    setIsShowCitySelect(false);
  };
  return (
    <>
      {weathers.map((weather, index) => (
        <div
          className="city-select-item card"
          key={index}
          onClick={() => handleClick(index)}
        >
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
    </>
  );
}
