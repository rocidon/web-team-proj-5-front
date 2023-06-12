import { useNavigate } from "react-router-dom";
import "../css/Bulletin.css";
import convertTime from "../time";
import axios from "axios";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";

function Bulletin({
  data,
  setIsLoading,
  getDatas,
  setIsPostLoading,
  getPost,
  isPostMine,
}) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateText, setUpdateText] = useState("");
  const [isLiked, setIsLiked] = useState(0);
  const [likecount, setLikecount] = useState(0);

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
    } catch { }
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
    } catch { }
  };

  const onUpdateComplete = async () => {
    setIsPostLoading(true);
    await updatePost();
    getPost();
  };

  const getIsLiked = async () => {
    try {
      await axios
        .get("http://localhost:8080/posts/likelist/email", {
          params: {
            post_uuid: data.uuid,
            post_email: localStorage.getItem("email"),
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
        .get("http://localhost:8080/posts/likelist/count", {
          params: {
            post_uuid: data.uuid,
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

  useEffect(() => {
    getIsLiked();
    getLikeCount();
  }, []);

  const onLikeBtnClick = async () => {
    if (isLiked) {
      // 좋아요 누른 상태에서 버튼 클릭
      try {
        await axios
          .post("http://localhost:8080/likelist/delete/posts", {
            params: {
              post_uuid: data.uuid,
              post_email: localStorage.getItem("email"),
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
          .post("http://localhost:8080/likelist/posts", {
            params: {
              post_uuid: data.uuid,
              post_email: localStorage.getItem("email"),
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

  return (
    <div className="bulletin">
      <h1>{data.title}</h1>
      <div style={{ color: "gray", fontSize: "14px" }}>
        <span>
          {data.creator} / {convertTime(data.timestamp)}
        </span>
        {isPostMine && (
          <>
            <Button variant="outline-danger" size="sm" onClick={onClick} >삭제</Button>{' '}
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
          {isLiked ? "Like❤️ " : "Like🤍 "} {likecount}
        </span>
      </div>
    </div>
  );
}
export default Bulletin;
