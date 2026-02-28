import { useState } from "react";
import "./CitySelectTitle.css";
import { CITY_LIST } from "../../../../../type/cityList";

export default function CitySelectTitle({
  setCities,
}: {
  setCities: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  // 검색 도시
  const [searchCity, setSearchCity] = useState("");
  // 검색 결과 추천 도시
  const [recommendedCities, setRecommendedCities] = useState<string[]>([]);
  // 추천 도시 중 하이라이트된 도시의 인덱스
  const [highlightedCityIndex, setHighlightedCityIndex] = useState<number>(0);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      if (recommendedCities.length > 0) {
        setHighlightedCityIndex(
          (prev) => (prev + 1) % recommendedCities.length,
        );
      }
    } else if (e.key === "ArrowUp") {
      setHighlightedCityIndex(
        (prev) =>
          (prev - 1 + recommendedCities.length) % recommendedCities.length,
      );
    } else if (e.key === "Enter") {
      console.log(
        recommendedCities[highlightedCityIndex],
        highlightedCityIndex,
      );
      // 추천 도시가 없으면 도시를 추가하지 않음
      if (recommendedCities[highlightedCityIndex] === undefined) {
        return;
      }
      setSearchCity("");
      setRecommendedCities([]);
      // 도시를 추가하나 중복은 추가하지 않음
      setCities((prev) => {
        if (prev.includes(recommendedCities[highlightedCityIndex])) {
          return prev;
        }
        return [...prev, recommendedCities[highlightedCityIndex]];
      });
    } else if (e.key === "Escape") {
      setSearchCity("");
      setRecommendedCities([]);
    }
  };

  const handleSearchCity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchCity(e.target.value);
    // 검색 결과 추천
    const filteredCities = CITY_LIST.filter((city: string) =>
      city.toLowerCase().includes(e.target.value.toLowerCase()),
    );
    console.log(filteredCities);
    setRecommendedCities(filteredCities);
    setHighlightedCityIndex(0);
  };

  return (
    <div className="city-select-title">
      <div className="city-select-title-recommended-cities">
        {/* // 추천 도시 5개 출력, 추천 도시가 없으면 출력하지 않음 */}
        {recommendedCities.length > 0 &&
          recommendedCities.slice(0, 5).map((city: string, index: number) => (
            <div
              className={
                "city-select-title-recommended-city" +
                (index === highlightedCityIndex ? " highlighted" : "")
              }
              key={index}
            >
              {city}
            </div>
          ))}
      </div>
      <input
        className="city-select-title-input"
        type="text"
        value={searchCity}
        onKeyDown={handleKeyDown}
        onChange={handleSearchCity}
        placeholder="도시 검색"
      />
    </div>
  );
}
