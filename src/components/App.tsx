import { useState, useEffect } from 'react';
import './App.css'
import api from '../util/api';
import type { WeatherResponse } from '../type/WeatherResponse';
import DetailInfo from './app/DetailInfo';

function App() {
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [isShowDetail, setIsShowDetail] = useState(false);

  useEffect(() => {
    const fetchWeather = async () => {
      const data = await api.getWeather('Seoul');
      console.log(data);
      setWeather(data);
    };
    fetchWeather();
    // 의존성 배열이 비어있으면 컴포넌트가 마운트될 때 한 번만 실행
  }, []);


  const showDetail = () => {
    console.log('showDetail');
    setIsShowDetail(prev => !prev);
  };
  return (
    <div className='app'>
      <div className='title'>Weather App</div>
      <div>
        <div>나의 위치</div>
        <div className='city-name'>서울</div>
      </div>
      <div className='summary-info'>
        <p className='temperature'>{weather?.main.temp}°C</p>
        <p className='feels-like'>체감 {weather?.main.feels_like}°C</p>
        <p className='temp-min'>최저 {weather?.main.temp_min}°C</p>
        <p className='temp-max'>최고 {weather?.main.temp_max}°C</p>
      </div>
      <div className='detail-info-button card' onClick={() => { showDetail() }} > {isShowDetail ? 'show less information' : 'show detail information'}</div>

      {isShowDetail && (
        <DetailInfo weather={weather} />
      )
      }

    </div>
  );
}

export default App;
