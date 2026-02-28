import { useState } from "react";
import CitySelect from "./menuAddCity/CitySelect";

export default function MenuAddCity({
  cities,
  setCities,
  setSelectedCityIndex,
}: {
  cities: string[];
  setCities: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedCityIndex: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [isShowCitySelect, setIsShowCitySelect] = useState(false);

  const selectCity = () => {
    if (isShowCitySelect) {
      setIsShowCitySelect(false);
    } else {
      setIsShowCitySelect(true);
    }
  };
  return (
    <>
      <div
        className="card"
        onClick={() => {
          selectCity();
        }}
      >
        도시 검색
      </div>
      {isShowCitySelect && (
        <CitySelect
          cities={cities}
          setCities={setCities}
          setSelectedCityIndex={setSelectedCityIndex}
          setIsShowCitySelect={setIsShowCitySelect}
        />
      )}
    </>
  );
}
