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
      <p>경도: {weather?.coord.lon}</p>
      <p>위도: {weather?.coord.lat}</p>

      <p>날씨 ID: {weather?.weather[0].id}</p>
      <p>날씨 상태: {weather?.weather[0].main}</p>
      <p>날씨 설명: {weather?.weather[0].description}</p>
      <p>날씨 아이콘: {weather?.weather[0].icon}</p>

      <p>기반 정보: {weather?.base}</p>
      <p>기온: {weather?.main.temp}°C</p>
      <p>체감 온도: {weather?.main.feels_like}°C</p>
      <p>최저 온도: {weather?.main.temp_min}°C</p>
      <p>최고 온도: {weather?.main.temp_max}°C</p>
      <p>기압: {weather?.main.pressure}hPa</p>
      <p>습도: {weather?.main.humidity}%</p>
      <p>해면 기압: {weather?.main.sea_level}hPa</p>
      <p>지면 기압: {weather?.main.grnd_level}hPa</p>

      <p>가시성: {weather?.visibility}m</p>

      <p>바람 속도: {weather?.wind.speed} m/s</p>
      <p>바람 방향: {weather?.wind.deg}°</p>

      <p>구름 정도: {weather?.clouds.all}%</p>

      <p>날짜 및 시간: {weather?.dt}</p>

      <p>시스템 유형: {weather?.sys.type}</p>
      <p>시스템 ID: {weather?.sys.id}</p>
      <p>국가: {weather?.sys.country}</p>
      <p>일출 시간: {weather?.sys.sunrise}</p>
      <p>일몰 시간: {weather?.sys.sunset}</p>

      <p>시간대: {weather?.timezone}</p>
      <p>도시 ID: {weather?.id}</p>
      <p>도시 이름: {weather?.name}</p>
      <p>코드: {weather?.cod}</p>
    </>
  );
}

export default App;
