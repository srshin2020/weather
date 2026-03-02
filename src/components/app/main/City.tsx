import "./City.css";

export default function City({
  selectedCityName,
}: {
  selectedCityName: string | null | undefined;
}) {
  if (!selectedCityName) {
    console.log("selectedCityName is null or undefined");
    return null;
  }
  return (
    <div>
      <div>나의 위치</div>
      <div className="city-name">{selectedCityName}</div>
    </div>
  );
}
