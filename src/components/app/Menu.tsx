import type { WeatherResponse } from "../../type/WeatherResponse";
import MenuShowDetail from "./menu/MenuShowDetail";
import MenuAddCity from "./menu/MenuAddCity";
import "./Menu.css";

export default function Menu({
  weather,
  cities,
}: {
  weather: WeatherResponse | null;
  cities: string[];
}) {
  return (
    <div className="menu-container">
      <MenuShowDetail weather={weather} />
      <MenuAddCity cities={cities} />
    </div>
  );
}
