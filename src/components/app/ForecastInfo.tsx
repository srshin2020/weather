import type { ForecastResponse } from "../../type/ForecastResponse";
import "./ForecastInfo.css";

export default function ForecastInfo({
  forecast4days,
}: {
  forecast4days: ForecastResponse | null;
}) {
  return (
    <div className="forecast-info card">
      {forecast4days?.list.map((item, index) => (
        <div className="forecast-info-item" key={index}>
          <div className="forecast-info-item-time">
            {new Date((item.dt ?? 0) * 1000)
              .toLocaleDateString("ko-KR", {
                month: "2-digit",
                day: "2-digit",
              })
              .replace(/\.$/, "")}{" "}
            {/* 마지막 점 제거 */}
          </div>
          <div className="forecast-info-item-time">
            {new Date((item.dt ?? 0) * 1000).toLocaleTimeString("ko-KR", {
              hour: "2-digit",
            })}
          </div>
          <div>{item.weather[0].description}</div>
          <img
            src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
            alt={item.weather[0].description}
          />
          <div className="forecast-info-item-temperature">
            {item.main.temp} °C
          </div>
        </div>
      ))}
    </div>
  );
}
