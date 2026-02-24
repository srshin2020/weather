import { useState } from "react";
import DetailInfo from "./DetailInfo";
import type { WeatherResponse } from "../../type/WeatherResponse";

export default function Menu({ weather }: { weather: WeatherResponse | null }) {
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const showDetail = () => {
    console.log("showDetail");
    if (isShowDetail) {
      setIsShowDetail(false);
      setIsExiting(true);
      setTimeout(() => {
        setIsExiting(false);
      }, 1000);
    } else {
      setIsShowDetail(true);
    }
  };
  return (
    <div className="menu-container">
      <div
        className="menu-detail-info-button card"
        onClick={() => {
          showDetail();
        }}
      >
        show detail information
      </div>
      <div className="menu-city-select-button card">지역 선택</div>
      {(isShowDetail || isExiting) && (
        <div className="detail-info-overlay">
          <DetailInfo
            weather={weather}
            isExiting={isExiting}
            showDetail={showDetail}
          />
        </div>
      )}
    </div>
  );
}
