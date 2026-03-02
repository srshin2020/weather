import { useState } from "react";
import DetailInfo from "./menuShowDetail/DetailInfo";
import type { WeatherResponse } from "../../../type/WeatherResponse";

export default function MenuShowDetail({
  weather,
}: {
  weather: WeatherResponse | null;
}) {
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
    <>
      <div
        className="card"
        onClick={() => {
          showDetail();
        }}
      >
        show detail information
      </div>
      {(isShowDetail || isExiting) && (
        <DetailInfo
          weather={weather}
          isExiting={isExiting}
          showDetail={showDetail}
        />
      )}
    </>
  );
}
