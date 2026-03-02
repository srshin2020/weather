import SummaryInfo from "./main/SummaryInfo";
import ForecastInfo from "./main/ForecastInfo";
import Menu from "./main/Menu";
import City from "./main/City";
import type { ForecastResponse } from "../../type/ForecastResponse";
import type { WeatherResponse } from "../../type/WeatherResponse";
import { useEffect, useRef } from "react";

export default function Main({
  cities,
  selectedCityIndex,
  weather,
  forecast4days,
  setIsShowCitySelect,
  isShowCitySelect,
  setSelectedCityIndex,
}: {
  cities: string[];
  selectedCityIndex: number;
  weather: WeatherResponse | null;
  forecast4days: ForecastResponse | null;
  setIsShowCitySelect: React.Dispatch<React.SetStateAction<boolean>>;
  isShowCitySelect: boolean;
  setSelectedCityIndex: React.Dispatch<React.SetStateAction<number>>;
}) {
  const touchStartX = useRef<number>(0);
  const selectedCityIndexRef = useRef<number>(selectedCityIndex);
  const citiesRef = useRef<string[]>(cities);
  // 스와이프 참조
  const swipeRef = useRef<HTMLDivElement>(null);

  selectedCityIndexRef.current = selectedCityIndex;
  citiesRef.current = cities;

  // 스크롤 누적 값
  const wheelAccumulator = useRef<number>(0);
  // 마지막 스크롤 시간
  const lastScrollTime = useRef<number>(0);

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
      console.log("wheelAccumulator", wheelAccumulator.current);

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
    <div className="main-container">
      <div
        className="main-container-inner"
        ref={swipeRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="title">Weather App</div>
        <City selectedCityName={cities[selectedCityIndex]} />
        <SummaryInfo weather={weather} />
      </div>
      <ForecastInfo forecast4days={forecast4days} />
      <Menu weather={weather} setIsShowCitySelect={setIsShowCitySelect} />
    </div>
  );
}
