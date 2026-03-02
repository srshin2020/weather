import type { WeatherResponse } from "../../../../type/WeatherResponse";
import "./DetailInfo.css";

export default function DetailInfo({
  weather,
  isExiting,
  showDetail,
}: {
  weather: WeatherResponse | null;
  isExiting: boolean;
  showDetail: () => void;
}) {
  return (
    <div className="detail-info-overlay">
      <div
        onClick={showDetail}
        className={`detail-info card ${isExiting ? "exiting" : ""}`}
      >
        <div className="detail-info-header card">detail information</div>
        <p>날씨 ID: {weather?.weather[0].id}</p>
        <p>날씨 상태: {weather?.weather[0].main}</p>
        <p>날씨 설명: {weather?.weather[0].description}</p>
        <p>날씨 아이콘: {weather?.weather[0].icon}</p>
        <p>가시성: {weather?.visibility}m</p>

        <p>바람 속도: {weather?.wind.speed} m/s</p>
        <p>바람 방향: {weather?.wind.deg}°</p>

        <p>구름 정도: {weather?.clouds.all}%</p>

        <p>날짜 및 시간: {weather?.dt}</p>

        <p>시스템 유형: {weather?.sys.type}</p>
        <p>시스템 ID: {weather?.sys.id}</p>
        <p>국가: {weather?.sys.country}</p>
        <p>일출 시간: {weather?.sys.sunrise}</p>
        <p>일몰 시간: {weather?.sys.sunset}</p>

        <p>시간대: {weather?.timezone}</p>
        <p>도시 ID: {weather?.id}</p>
        <p>도시 이름: {weather?.name}</p>
        <p>코드: {weather?.cod}</p>
      </div>
    </div>
  );
}
