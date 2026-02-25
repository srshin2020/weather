import type { ForecastResponse } from "../../type/ForecastResponse";
import "./ForecastInfo.css";

export default function ForecastInfo({
  forecast4days,
}: {
  forecast4days: ForecastResponse | null;
}) {
  if (!forecast4days) {
    return null; // 데이터가 없으면 아무것도 렌더링하지 않음
  }
  return (
    <div className="forecast-info card">
      {forecast4days?.list.map((item, index) => (
        <div key={index} className="forecast-info-item">
          <div>
            {new Date((item.dt ?? 0) * 1000)
              .toLocaleDateString("ko-KR", {
                month: "2-digit",
                day: "2-digit",
              })
              .replace(/\.$/, "")}{" "}
            {/* 마지막 점 제거 */}
          </div>
          <div>
            {new Date((item.dt ?? 0) * 1000).toLocaleTimeString("ko-KR", {
              hour: "2-digit",
            })}
          </div>
          <div>{item.weather[0].description}</div>
          <img
            src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
            alt={item.weather[0].description}
          />
          <div>{item.main.temp} °C</div>
        </div>
      ))}
    </div>
  );
}
