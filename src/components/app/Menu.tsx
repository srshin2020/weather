import type { WeatherResponse } from "../../type/WeatherResponse";
import MenuShowDetail from "./menu/MenuShowDetail";
import "./Menu.css";

export default function Menu({
  weather,
  setIsShowCitySelect,
}: {
  weather: WeatherResponse | null;
  setIsShowCitySelect: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="menu-container">
      <MenuShowDetail weather={weather} />
      <div
        className="card"
        onClick={() => {
          setIsShowCitySelect(true);
        }}
      >
        도시 검색
      </div>
    </div>
  );
}
