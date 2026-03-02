import { useState, useEffect, useRef } from "react";
import "./App.css";
import api from "../util/api";
import type { WeatherResponse } from "../type/WeatherResponse";
import type { ForecastResponse } from "../type/ForecastResponse";
import SummaryInfo from "./app/SummaryInfo";
import ForecastInfo from "./app/ForecastInfo";
import Menu from "./app/Menu";
import City from "./app/City";
import CitySelect from "./app/menu/menuAddCity/CitySelect";

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
  // 스와이프 참조
  const swipeRef = useRef<HTMLDivElement>(null);

  // 스크롤 누적 값
  const wheelAccumulator = useRef<number>(0);
  // 마지막 스크롤 시간
  const lastScrollTime = useRef<number>(0);

  // 도시 리스트 참조와 선택된 도시 인덱스 참조를 업데이트
  citiesRef.current = cities;
  // 선택된 도시 인덱스 참조를 업데이트
  selectedCityIndexRef.current = selectedCityIndex;

  // 도시 선택 창이 열려있지 않을 때만 스크롤 이벤트 처리
  useEffect(() => {
    if (isShowCitySelect) return;
    const element = swipeRef.current;
    if (!element) return;

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();

      // 도시 리스트가 2개 미만이면 리턴
      if (citiesRef.current.length < 2) return;

      // wheel의 delta x가 5 이하면 리턴
      if (Math.abs(event.deltaX) < 5) return;

      const now = Date.now();
      const timeSinceLastScroll = now - lastScrollTime.current;
      if (timeSinceLastScroll < 300) return;

      // wheel의 delta x를 누적
      wheelAccumulator.current += event.deltaX;

      if (wheelAccumulator.current > 100) {
        if (selectedCityIndexRef.current < citiesRef.current.length - 1) {
          setSelectedCityIndex((prev) =>
            Math.min(prev + 1, citiesRef.current.length - 1),
          );
        }
        lastScrollTime.current = now;
        wheelAccumulator.current = 0;
      } else if (wheelAccumulator.current < -100) {
        if (selectedCityIndexRef.current > 0) {
          setSelectedCityIndex((prev) => Math.max(prev - 1, 0));
        }
        lastScrollTime.current = now;
        wheelAccumulator.current = 0;
      }
    };

    element.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      element.removeEventListener("wheel", handleWheel);
    };
  }, [isShowCitySelect]);

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

  const touchStartX = useRef<number>(0);
  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    const touchEndX = event.changedTouches[0].clientX;
    const touchDeltaX = touchEndX - touchStartX.current;

    if (touchDeltaX < -10) {
      if (selectedCityIndexRef.current < citiesRef.current.length - 1) {
        setSelectedCityIndex((prev) => prev + 1);
      }
    } else if (touchDeltaX > 10) {
      if (selectedCityIndexRef.current > 0) {
        setSelectedCityIndex((prev) => prev - 1);
      }
    }
  };

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
        <div className="main-container">
          <div
            className="main-container-inner"
            ref={swipeRef}
            onTouchStart={(e) => {
              handleTouchStart(e);
            }}
            onTouchEnd={(e) => {
              handleTouchEnd(e);
            }}
          >
            <div className="title">Weather App</div>
            <City selectedCityName={cities[selectedCityIndex]} />
            <SummaryInfo weather={weather} />
          </div>
          <ForecastInfo forecast4days={forecast4days} />
          <Menu weather={weather} setIsShowCitySelect={setIsShowCitySelect} />
        </div>
      )}
    </>
  );
}

export default App;
