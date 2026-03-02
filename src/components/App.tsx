import { useState, useEffect, useRef } from "react";
import "./App.css";
import api from "../util/api";
import type { WeatherResponse } from "../type/WeatherResponse";
import type { ForecastResponse } from "../type/ForecastResponse";
import CitySelect from "./app/CitySelect";
import Main from "./app/main";

function App() {
  //  state 관리

  // 선택된 도시 인덱스
  const [selectedCityIndex, setSelectedCityIndex] = useState<number>(0);
  // 선택된 도시의 날씨 정보
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  // 선택된 도시의 5일 3시간 예보 정보
  const [forecast4days, setForecast4days] = useState<ForecastResponse | null>(
    null,
  );
  // 도시 리스트
  const [cities, setCities] = useState<string[]>([
    "seoul",
    "new york",
    "tokyo",
  ]);

  const [isShowCitySelect, setIsShowCitySelect] = useState<boolean>(false);

  // ref 관리
  // 도시 리스트 참조
  // 선택된 도시 인덱스 참조
  const citiesRef = useRef<string[]>(cities);
  // 선택된 도시 인덱스 참조
  const selectedCityIndexRef = useRef<number>(selectedCityIndex);

  // 도시 리스트 참조와 선택된 도시 인덱스 참조를 업데이트
  citiesRef.current = cities;
  // 선택된 도시 인덱스 참조를 업데이트
  selectedCityIndexRef.current = selectedCityIndex;

  useEffect(() => {
    const fetchWeather = async () => {
      const data = await api.getWeather(cities[selectedCityIndex]);
      if (data) {
        setWeather(data);
      }
    };

    const fetchForecast5days3hours = async () => {
      const data = await api.getforecast5days3hours(cities[selectedCityIndex]);
      setForecast4days(data);
    };
    if (selectedCityIndex < 0 || selectedCityIndex >= cities.length) {
      console.log("selectedCityIndex is out of range", selectedCityIndex);
      return;
    }
    Promise.all([fetchForecast5days3hours(), fetchWeather()]);

    // 의존성 배열이 있으면 의존성 배열이 변경될 때 실행
  }, [selectedCityIndex, cities]);

  return (
    <>
      {isShowCitySelect ? (
        <CitySelect
          cities={cities}
          setCities={setCities}
          setSelectedCityIndex={setSelectedCityIndex}
          setIsShowCitySelect={setIsShowCitySelect}
        />
      ) : (
        <Main
          cities={cities}
          selectedCityIndex={selectedCityIndex}
          weather={weather}
          forecast4days={forecast4days}
          setIsShowCitySelect={setIsShowCitySelect}
          isShowCitySelect={isShowCitySelect}
          setSelectedCityIndex={setSelectedCityIndex}
        />
      )}
    </>
  );
}

export default App;
