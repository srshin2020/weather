import type { WeatherResponse } from "../../type/WeatherResponse";
import MenuShowDetail from "./menu/MenuShowDetail";
import MenuAddCity from "./menu/MenuAddCity";
import "./Menu.css";

export default function Menu({
  weather,
  cities,
  setCities,
  setSelectedCityIndex,
}: {
  weather: WeatherResponse | null;
  cities: string[];
  setCities: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedCityIndex: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <div className="menu-container">
      <MenuShowDetail weather={weather} />
      <MenuAddCity
        cities={cities}
        setCities={setCities}
        setSelectedCityIndex={setSelectedCityIndex}
      />
    </div>
  );
}
