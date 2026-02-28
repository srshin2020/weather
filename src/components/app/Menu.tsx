import type { WeatherResponse } from "../../type/WeatherResponse";
import MenuShowDetail from "./menu/MenuShowDetail";
import MenuAddCity from "./menu/MenuAddCity";
import "./Menu.css";

export default function Menu({
  weather,
  cities,
  setCities,
}: {
  weather: WeatherResponse | null;
  cities: string[];
  setCities: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  return (
    <div className="menu-container">
      <MenuShowDetail weather={weather} />
      <MenuAddCity cities={cities} setCities={setCities} />
    </div>
  );
}
