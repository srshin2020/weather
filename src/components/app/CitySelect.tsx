import { useEffect, useState } from "react";
import api from "../../util/api";
import "./CitySelect.css";
import type { WeatherResponse } from "../../type/WeatherResponse";
import CitySelectTitle from "./citySelect/CitySelectTitle";
import CitySelectList from "./citySelect/CitySelectList";

export default function CitySelect({
  cities,
  setCities,
  setSelectedCityIndex,
  setIsShowCitySelect,
}: {
  cities: string[];
  setCities: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedCityIndex: React.Dispatch<React.SetStateAction<number>>;
  setIsShowCitySelect: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [weatherList, setWeatherList] = useState<WeatherResponse[]>([]);

  useEffect(() => {
    const fetchWeatherList = async () => {
      const results = await Promise.all(
        cities.map((city) => api.getWeather(city)),
      );
      setWeatherList(
        results.filter((data): data is WeatherResponse => data != null),
      );
    };
    fetchWeatherList();

    // 의존성 배열이 비어있으면 컴포넌트가 마운트될 때 한 번만 실행
    // 의존성 배열이 있으면 의존성 배열이 변경될 때 실행
  }, [cities]);

  return (
    <div className="city-select-overlay">
      <CitySelectList
        weathers={weatherList}
        cities={cities}
        setCities={setCities}
        setSelectedCityIndex={setSelectedCityIndex}
        setIsShowCitySelect={setIsShowCitySelect}
      />
      <CitySelectTitle setCities={setCities} />
    </div>
  );
}
