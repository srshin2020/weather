export interface WeatherResponse {
  // 위치 정보 (경도, 위도)
  coord: {
    lon: number;
    lat: number;
  };
  // 날씨 정보 (아이콘, 날씨 상태, 날씨 설명)
  weather: [
    {
      id: number; // 날씨 ID (ex: 800, 801, 802, 803, 804)
      main: string; // 날씨 상태 (ex: "Clear", "Clouds", "Rain", "Snow", "Thunderstorm", "Drizzle", "Mist", "Smoke", "Haze", "Dust", "Fog", "Sand", "Ash", "Squall", "Tornado")
      description: string; // 날씨 설명 (ex: "clear sky", "few clouds", "scattered clouds", "broken clouds", "shower rain", "rain", "thunderstorm", "snow", "mist")
      icon: string; // 날씨 아이콘 (ex: "01d", "01n", "02d", "02n", "03d", "03n", "04d", "04n", "09d", "09n", "10d", "10n", "13d", "13n")
    }
  ];
  // 기반 정보 (기반 정보)
  base: string;
  // 기온 정보 (기온, 체감 온도, 최저 온도, 최고 온도, 기압, 습도, 해면 기압, 지면 기압)
  main: {
    temp: number; // 기온 (ex: 283.15, 283.15, 283.15, 283.15, 283.15)
    feels_like: number; // 체감 온도 (ex: 283.15, 283.15, 283.15, 283.15, 283.15)
    temp_min: number; // 최저 온도 (ex: 283.15, 283.15, 283.15, 283.15, 283.15)
    temp_max: number; // 최고 온도 (ex: 283.15, 283.15, 283.15, 283.15, 283.15)
    pressure: number; // 기압 (ex: 1013.25, 1013.25, 1013.25, 1013.25, 1013.25)
    humidity: number; // 습도 (ex: 50, 50, 50, 50, 50)
    sea_level: number; // 해면 기압 (ex: 1013.25, 1013.25, 1013.25, 1013.25, 1013.25)
    grnd_level: number; // 지면 기압 (ex: 1013.25, 1013.25, 1013.25, 1013.25, 1013.25)
  };
  // 가시성 정보 (가시성)
  visibility: number; // 가시성 (ex: 10000, 10000, 10000, 10000, 10000)
  // 바람 정보 (바람 속도, 바람 방향)
  wind: {
    speed: number; // 바람 속도 (ex: 1.5, 1.5, 1.5, 1.5, 1.5)
    deg: number; // 바람 방향 (ex: 180, 180, 180, 180, 180)
  };
  // 구름 정보 (구름 정도)
  clouds: {
    all: number; // 구름 정도 (ex: 50, 50, 50, 50, 50)
  };
  // 날짜 및 시간 정보 (날짜 및 시간)
  dt: number;
  // 시스템 정보 (시스템 유형, 시스템 ID, 국가, 일출 시간, 일몰 시간)
  sys: {
    type: number; // 시스템 유형 (ex: 1, 1, 1, 1, 1)
    id: number; // 시스템 ID (ex: 1, 1, 1, 1, 1)
    country: string; // 국가 (ex: "KR", "KR", "KR", "KR", "KR")
    sunrise: number; // 일출 시간 (ex: 1714281600, 1714281600, 1714281600, 1714281600, 1714281600)
    sunset: number; // 일몰 시간 (ex: 1714281600, 1714281600, 1714281600, 1714281600, 1714281600)
  };
  // 시간대 정보 (시간대)
  timezone: number; // 시간대 (ex: 9, 9, 9, 9, 9)
  // 도시 ID (도시 ID)
  id: number; // 도시 ID (ex: 1835841, 1835841, 1835841, 1835841, 1835841)
  // 도시 이름 (도시 이름)
  name: string; // 도시 이름 (ex: "Seoul", "Seoul", "Seoul", "Seoul", "Seoul")
  // 코드 (코드)
  cod: number; // 코드 (ex: 200, 200, 200, 200, 200)
}
