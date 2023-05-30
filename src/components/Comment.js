import "../css/Comment.css";
import convertTime from "../time";

function Comment({ data }) {
  return (
    <div className="comment">
      <h4>{data.creator}</h4>
      <div style={{ color: "gray", fontSize: "10px" }}>
        {convertTime(data.timestamp)}
      </div>
      <div>{data.text}</div>
      <div style={{ fontSize: "14px" }}> Like🤍 </div>
      <div style={{ color: "gray", fontSize: "14px" }}> + Reply</div>
    </div>
  );
}
export default Comment;
