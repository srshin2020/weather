# Weather App

OpenWeatherMap API를 활용한 다중 도시 날씨 조회 웹 앱입니다.  
데스크톱과 모바일에서 도시 전환, 예보 확인, 도시 추가·삭제를 지원합니다.

## 기술 스택

- **Frontend**: React 19, TypeScript, Vite
- **스타일**: CSS (컴포넌트별 분리)
- **API**: [OpenWeatherMap API](https://openweathermap.org/api)
  - Current Weather
  - 5 Day / 3 Hour Forecast
- **배포**: GitHub Pages (GitHub Actions)

## 주요 기능

### 메인 화면

- **현재 날씨 요약**: 선택한 도시의 온도, 날씨 설명, 아이콘, 현지 시간
- **5일 3시간 예보**: 가로 스크롤로 시간대별 예보 확인
- **도시 전환**
  - 데스크톱: 트랙패드/마우스 휠 가로 스크롤
  - 모바일: 좌우 스와이프
- **상세 정보**: 바람, 구름, 가시거리, 일출/일몰 등 추가 정보 모달

### 도시 관리

- **도시 검색·추가**: 검색어 입력 시 추천 도시 목록 표시, 탭 또는 Enter로 추가
- **도시 목록**: 등록된 도시별 현재 날씨 카드 목록
- **도시 삭제**: 스와이프로 삭제 버튼 노출 후 삭제 (최소 1개 유지)
- **도시 선택**: 목록에서 도시 탭 시 해당 도시로 전환 후 메인 화면 복귀

## 프로젝트 구조

```
src/
├── components/
│   ├── App.tsx              # 앱 루트, 상태 관리, API 호출
│   └── app/
│       ├── main.tsx         # 메인 화면 (스와이프·휠 도시 전환)
│       ├── main/            # City, SummaryInfo, ForecastInfo, Menu
│       ├── CitySelect.tsx   # 도시 선택 오버레이
│       └── citySelect/      # CitySelectList, CitySelectTitle
├── type/                    # WeatherResponse, ForecastResponse, cityList
└── util/
    ├── api.ts               # OpenWeatherMap API (싱글톤)
    └── timeUtil.ts          # 타임존 시간 변환
```

## 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

프로젝트 루트에 `.env` 파일을 만들고 OpenWeatherMap API 키를 설정합니다.

```
VITE_API_KEY=your_api_key_here
```

[OpenWeatherMap](https://openweathermap.org/api)에서 무료 API 키를 발급받을 수 있습니다.

### 3. 개발 서버 실행

```bash
npm run dev
```

모바일 기기에서 테스트할 때는 같은 Wi-Fi에서 접속할 수 있도록:

```bash
npm run dev -- --host
```

### 4. 빌드

```bash
npm run build
```

## 배포

`main` 브랜치에 push 시 GitHub Actions가 자동으로 GitHub Pages에 배포합니다.  
저장소 Secrets에 `VITE_API_KEY`를 등록해야 합니다.

- Base path: `/weather/` (`vite.config.ts`의 `base` 설정)

## 스크립트

| 명령어            | 설명               |
| ----------------- | ------------------ |
| `npm run dev`     | 개발 서버 실행     |
| `npm run build`   | 프로덕션 빌드      |
| `npm run preview` | 빌드 결과 미리보기 |
| `npm run lint`    | ESLint 실행        |
