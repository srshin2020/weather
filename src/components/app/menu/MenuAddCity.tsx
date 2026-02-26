import { useState } from "react";
import CitySelect from "./menuAddCity/CitySelect";

export default function MenuAddCity({ cities }: { cities: string[] }) {
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
        지역 선택
      </div>
      {isShowCitySelect && <CitySelect cities={cities} />}
    </>
  );
}
