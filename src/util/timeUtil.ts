// dt + timezone : 해당 도시의 현지 시각을 “UTC처럼” 표현한 값
export const getLocalTime = (dt: number, timezone: number): string => {
  return new Date((dt + timezone) * 1000).toLocaleTimeString("ko-KR", {
    timeZone: "UTC",
    hour: "2-digit",
    minute: "2-digit",
  });
};
