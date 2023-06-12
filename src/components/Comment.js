import { Button } from "react-bootstrap";
import "../css/Comment.css";
import convertTime from "../time";
import axios from "axios";
import { useEffect, useState } from "react";

function Comment({ data, commentUUID, setIsCommentLoading, getComments }) {
  const [isLiked, setIsLiked] = useState(0);
  const [likecount, setLikecount] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isCommentMine, setIsCommentMine] = useState(false);
  const [updateText, setUpdateText] = useState("");

  useEffect(() => {
    if (data.email == localStorage.getItem("email")) {
      setIsCommentMine(true);
    }
    getIsLiked();
    getLikeCount();
  }, []);

  const getIsLiked = async () => {
    try {
      await axios
        .get("http://localhost:8080/comments/likelist/email", {
          params: {
            comments_uuid2: data.uuid2,
            comments_email: localStorage.getItem("email"),
          },
        })
        .then((res) => {
          console.log(res.data[0].result);
          if (res.data[0].result === 0) {
            setIsLiked(0);
          } else {
            setIsLiked(1);
          }
        })
        .catch(function (err) {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };
  const getLikeCount = async () => {
    try {
      await axios
        .get("http://localhost:8080/comments/likelist/count", {
          params: {
            comments_uuid2: data.uuid2,
          },
        })
        .then((res) => {
          console.log("누른개수" + res.data[0].result);
          setLikecount(res.data[0].result);
        })
        .catch(function (err) {
          console.log(err);
        });
    } catch { }
  };

  const onLikeBtnClick = async () => {
    if (isLiked) {
      // 좋아요 누른 상태에서 버튼 클릭
      try {
        await axios
          .post("http://localhost:8080/likelist/delete/comments", {
            params: {
              comments_uuid2: data.uuid2,
              comments_email: localStorage.getItem("email"),
            },
          })
          .then((res) => {
            console.log(res.data);
            setIsLiked(0);
          })
          .catch(function (err) {
            console.log(err);
          });
      } catch { }
      await getLikeCount();
    } else {
      // 좋아요 안누른 상태에서 버튼 클릭
      try {
        await axios
          .post("http://localhost:8080/likelist/comments", {
            params: {
              comments_uuid2: data.uuid2,
              comments_eamil: localStorage.getItem("email"),
            },
          })
          .then((res) => {
            console.log(res.data);
            setIsLiked(1);
          })
          .catch(function (err) {
            console.log(err);
          });
      } catch { }
      await getLikeCount();
    }
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
    } catch { }
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
    } catch { }
  };
  const onClick = async () => {
    setIsCommentLoading(true);
    await deleteComment();
    getComments();
  };
  return (
    <div className="comment">
      <h4>Re: {data.creator}</h4>
      <div style={{ color: "gray", fontSize: "10px" }}>
        {convertTime(data.timestamp)}
        {isCommentMine && (
          <>
            <Button variant="outline-danger" size="sm" onClick={onClick}>삭제</Button>
            <Button variant="outline-secondary" size="sm" onClick={onUpdateToggle}>
              {isUpdating ? "취소" : "수정"}
            </Button>
            {isUpdating && <Button variant="outline-primary" size="sm" onClick={onUpdateComplete}>완료</Button>}
          </>

        )}
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
        <span onClick={onLikeBtnClick}>
          {isLiked ? "Like❤️ " : "Like🤍 "}
          {likecount}
        </span>
      </div>
    </div>
  );
}
export default Comment;
