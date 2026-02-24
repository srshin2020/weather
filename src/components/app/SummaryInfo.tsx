import type { WeatherResponse } from "../../type/WeatherResponse";

export default function SummaryInfo({
  weather,
}: {
  weather: WeatherResponse | null;
}) {
  return (
    <div className="summary-info">
      <p className="temperature">{weather?.main.temp}°C</p>
      <p className="weather-description">{weather?.weather[0].description}</p>
      <p className="feels-like">체감 {weather?.main.feels_like}°C</p>
      <p className="temp">
        <span className="temp-min">최저 {weather?.main.temp_min}°C </span>
        <span className="temp-max">최고 {weather?.main.temp_max}°C</span>
      </p>
    </div>
  );
}
