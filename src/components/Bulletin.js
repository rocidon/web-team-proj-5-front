import { useNavigate } from "react-router-dom";
import "../css/Bulletin.css";
import convertTime from "../time";

function Bulletin({ data, setClickedPost }) {
  const navigate = useNavigate();
  //해당게시글 클릭시 detail 페이지로 이동
  const goToDetail = () => {
    setClickedPost(data);
    navigate("/detail");
  };
  return (
    <div className="bulletin" onClick={goToDetail}>
      <h1>{data.title}</h1>
      <div style={{ color: "gray", fontSize: "14px" }}>
        <span>
          {data.creator} / {convertTime(data.timestamp)}
        </span>
      </div>
      <div>{data.text}</div>
      <div style={{ fontSize: "14px" }}>
        <span>Like🤍 {data.likecount}</span>
      </div>
    </div>
  );
}
export default Bulletin;
