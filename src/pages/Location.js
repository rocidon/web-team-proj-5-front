import MapApi from "../components/MapAPI";
import "../css/Location.css"

function Location() {
  return (
    <div className="location">
      <h4>오시는 길</h4>
      <hr />
      <div>강남대학교 이공관</div>
      <div>주소 : 경기 용인시 기흥구 강남로 40</div>
      <br />
      <MapApi />
    </div>
  );
}
export default Location;
