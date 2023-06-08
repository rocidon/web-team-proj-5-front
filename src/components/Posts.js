import { useNavigate } from "react-router-dom";
import "../css/Posts.css";
import convertTime from "../time";
import axios from "axios";
import { useState } from "react";

function Posts({ data, setClickedPost }) {
  const navigate = useNavigate();
  //해당게시글 클릭시 detail 페이지로 이동
  const goToDetail = () => {
    setClickedPost(data);
    navigate(`/detail?uuid=${data.uuid}`);
  };

  return (
    <div className="bulletin">
      <h1 onClick={goToDetail}>{data.title}</h1>
      <div style={{ color: "gray", fontSize: "14px" }}>
        <span>
          {data.creator} / {convertTime(data.timestamp)}
        </span>
      </div>
      <div style={{ fontSize: "14px" }}>
        <span>Like🤍 {data.likecount}</span>
      </div>
    </div>
  );
}
export default Posts;
