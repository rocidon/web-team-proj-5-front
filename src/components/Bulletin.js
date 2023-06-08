import { useNavigate } from "react-router-dom";
import "../css/Bulletin.css";
import convertTime from "../time";
import axios from "axios";
import { useState } from "react";

function Bulletin({ data, setIsLoading, getDatas, setIsPostLoading, getPost }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateText, setUpdateText] = useState("");

  const navigate = useNavigate();
  const deletePost = async () => {
    try {
      await axios
        .post("http://localhost:8080/posts/delete", {
          params: {
            post_uuid: data.uuid,
          },
        })
        .then((res) => {
          alert("게시글이 삭제되었습니다.");
          console.log(res.data);
        })
        .catch(function (err) {
          console.log(err);
        });
    } catch {}
  };
  const onClick = async () => {
    await deletePost();
    setIsLoading(true);
    navigate("/main");
    getDatas();
  };

  const onUpdateToggle = () => {
    if (!isUpdating) {
      setUpdateText(data.text);
    } else {
      setUpdateText("");
    }
    setIsUpdating((prev) => !prev);
  };
  const onChange = ({ target: { value } }) => {
    setUpdateText(value);
  };

  const updatePost = async () => {
    try {
      await axios
        .post("http://localhost:8080/posts/update", {
          params: {
            post_uuid: data.uuid,
            post_text: updateText,
          },
        })
        .then((res) => {
          console.log(res.data);
          alert("수정이 완료되었습니다");
        });
    } catch {}
  };

  const onUpdateComplete = async () => {
    setIsPostLoading(true);
    await updatePost();
    getPost();
  };

  return (
    <div className="bulletin">
      <h1>{data.title}</h1>
      <div style={{ color: "gray", fontSize: "14px" }}>
        <span>
          {data.creator} / {convertTime(data.timestamp)}
        </span>
        <button onClick={onClick}>삭제하기</button>
        <button onClick={onUpdateToggle}>
          {isUpdating ? "취소하기" : "수정하기"}
        </button>
        {isUpdating && <button onClick={onUpdateComplete}>수정완료</button>}
      </div>
      <div>
        {isUpdating ? (
          <textarea
            maxLength="200"
            value={updateText}
            onChange={onChange}
          ></textarea>
        ) : (
          <p>{data.text}</p>
        )}
      </div>
      <div style={{ fontSize: "14px" }}>
        <span>Like🤍 {data.likecount}</span>
      </div>
    </div>
  );
}
export default Bulletin;
