import { useEffect, useState } from "react";
import api from "../../../../util/api";
import "./CitySelect.css";
import type { WeatherResponse } from "../../../../type/WeatherResponse";
import CitySelectTitle from "./citySelect/CitySelectTitle";
import CitySelectList from "./citySelect/CitySelectList";

export default function CitySelect({ cities }: { cities: string[] }) {
  const [weatherList, setWeatherList] = useState<WeatherResponse[]>([]);

  useEffect(() => {
    const fetchWeatherList = async () => {
      const weathers: WeatherResponse[] = [];
      for (const city of cities) {
        const data = await api.getWeather(city);
        if (data) {
          // setWeatherList((prev) => [...prev, data]);를 호출하면 개발자 도구에서 두번 렌더링되는 것을 막기 위해 push를 사용
          weathers.push(data);
        }
      }
      setWeatherList(weathers);
    };
    fetchWeatherList();

    // 의존성 배열이 비어있으면 컴포넌트가 마운트될 때 한 번만 실행
  }, []);

  return (
    <div className="city-select-overlay">
      <CitySelectList weathers={weatherList} />
      <CitySelectTitle />
    </div>
  );
}
