import type { WeatherResponse } from "../../type/WeatherResponse";
import MenuShowDetail from "./menu/MenuShowDetail";
import MenuAddCity from "./menu/MenuAddCity";
import "./Menu.css";

export default function Menu({
  weather,
  cities,
  selectedCityIndex,
  setCities,
  setSelectedCityIndex,
}: {
  weather: WeatherResponse | null;
  cities: string[];
  selectedCityIndex: number;
  setCities: (cities: string[]) => void;
  setSelectedCityIndex: (selectedCityIndex: number) => void;
}) {
  return (
    <div className="menu-container">
      <MenuShowDetail weather={weather} />
      <MenuAddCity
        cities={cities}
        selectedCityIndex={selectedCityIndex}
        setCities={setCities}
        setSelectedCityIndex={setSelectedCityIndex}
      />
    </div>
  );
}
