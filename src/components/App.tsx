import { useState, useEffect } from 'react';
import './App.css'
import api from '../util/api';
import type { WeatherResponse } from '../type/WeatherResponse';

function App() {
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  useEffect(() => {
    const fetchWeather = async () => {
      const data = await api.getWeather('Seoul');
      console.log(data);
      setWeather(data);
    };
    fetchWeather();
    // 의존성 배열이 비어있으면 컴포넌트가 마운트될 때 한 번만 실행
  }, []);

  return (
    <>
      <h1>Weather App</h1>
      <p>Longitude: {weather?.coord.lon}</p>
      <p>Latitude: {weather?.coord.lat}</p>

      <p>ID: {weather?.weather[0].id}</p>
      <p>Main: {weather?.weather[0].main}</p>
      <p>Description: {weather?.weather[0].description}</p>
      <p>Icon: {weather?.weather[0].icon}</p>

      <p>Base: {weather?.base}</p>
      <p>Temperature: {weather?.main.temp}°C</p>
      <p>Feels Like: {weather?.main.feels_like}°C</p>
      <p>Temperature Min: {weather?.main.temp_min}°C</p>
      <p>Temperature Max: {weather?.main.temp_max}°C</p>
      <p>Pressure: {weather?.main.pressure}hPa</p>
      <p>Humidity: {weather?.main.humidity}%</p>
      <p>Sea Level: {weather?.main.sea_level}hPa</p>
      <p>Grnd Level: {weather?.main.grnd_level}hPa</p>

      <p>Visibility: {weather?.visibility}m</p>

      <p>Wind Speed: {weather?.wind.speed} m/s</p>
      <p>Wind Degree: {weather?.wind.deg}°</p>

      <p>Clouds: {weather?.clouds.all}%</p>

      <p>Dt: {weather?.dt}</p>

      <p>Type: {weather?.sys.type}</p>
      <p>ID: {weather?.sys.id}</p>
      <p>Country: {weather?.sys.country}</p>
      <p>Sunrise: {weather?.sys.sunrise}</p>
      <p>Sunset: {weather?.sys.sunset}</p>

      <p>Timezone: {weather?.timezone}</p>
      <p>ID: {weather?.id}</p>
      <p>Name: {weather?.name}</p>
      <p>Cod: {weather?.cod}</p>
    </>
  );
}

export default App;
