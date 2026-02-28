import { useState } from "react";
import "./CitySelectTitle.css";
import { CITY_LIST } from "../../../../../type/cityList";

export default function CitySelectTitle() {
  const [searchCity, setSearchCity] = useState("");
  const [recommendedCities, setRecommendedCities] = useState<string[]>([]);

  const handleSearchCity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchCity(e.target.value);
    // 검색 결과 추천
    const filteredCities = CITY_LIST.filter((city: string) =>
      city.toLowerCase().includes(e.target.value.toLowerCase()),
    );
    console.log(filteredCities);
    setRecommendedCities(filteredCities);
  };

  return (
    <div className="city-select-title">
      <div className="city-select-title-recommended-cities">
        {/* // 추천 도시 5개 출력, 추천 도시가 없으면 출력하지 않음 */}
        {recommendedCities.length > 0 &&
          recommendedCities.slice(0, 5).map((city: string, index: number) => (
            <div className="city-select-title-recommended-city" key={index}>
              {city}
            </div>
          ))}
      </div>
      <input
        className="city-select-title-input"
        type="text"
        value={searchCity}
        onChange={handleSearchCity}
        placeholder="도시 검색"
      />
    </div>
  );
}
