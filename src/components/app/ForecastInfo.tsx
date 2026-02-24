import type { ForecastResponse } from "../../type/ForecastResponse";

export default function ForecastInfo({
  forecast4days,
}: {
  forecast4days: ForecastResponse | null;
}) {
  return (
    <div className="forecast-info card">
      {forecast4days?.list.slice(0, 4).map((item, index) => (
        <div className="forecast-info-item" key={index}>
          <div className="forecast-info-item-time">
            {new Date((item.dt ?? 0) * 1000).toLocaleTimeString("ko-KR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
          <div className="forecast-info-item-temperature">
            {item.main.temp} °C
          </div>
        </div>
      ))}
    </div>
  );
}
