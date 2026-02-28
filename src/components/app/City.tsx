import "./City.css";

export default function City({
  selectedCityName,
}: {
  selectedCityName: string;
}) {
  return (
    <div>
      <div>나의 위치</div>
      <div className="city-name">{selectedCityName}</div>
    </div>
  );
}
