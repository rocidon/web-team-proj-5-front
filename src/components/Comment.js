import "../css/Comment.css";
import convertTime from "../time";
import axios from "axios";
import { useState } from "react";

function Comment({ data, commentUUID, setIsCommentLoading, getComments }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateText, setUpdateText] = useState("");

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
  const onUpdateComplete = async () => {
    setIsCommentLoading(true);
    await updateComment();
    getComments();
  };

  const updateComment = async () => {
    try {
      await axios
        .post("http://localhost:8080/comments/update", {
          params: {
            comments_uuid2: commentUUID,
            comments_text: updateText,
          },
        })
        .then((res) => {
          console.log(res.data);
          alert("수정이 완료되었습니다");
        });
    } catch {}
  };

  const deleteComment = async () => {
    try {
      await axios
        .post("http://localhost:8080/comments/delete", {
          params: {
            comment_uuid: commentUUID,
          },
        })
        .then((res) => {
          alert("댓글이 삭제되었습니다.");
          console.log(res.data);
        })
        .catch(function (err) {
          console.log(err);
        });
    } catch {}
  };
  const onClick = async () => {
    setIsCommentLoading(true);
    await deleteComment();
    getComments();
  };
  return (
    <div className="comment">
      <h4>{data.creator}</h4>
      <div style={{ color: "gray", fontSize: "10px" }}>
        {convertTime(data.timestamp)}
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
      <div style={{ fontSize: "14px" }}> Like🤍 </div>
      <div style={{ color: "gray", fontSize: "14px" }}> + Reply</div>
    </div>
  );
}
export default Comment;
