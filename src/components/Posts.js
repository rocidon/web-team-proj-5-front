import { useNavigate } from "react-router-dom";
import "../css/Posts.css";
import convertTime from "../time";
import axios from "axios";
import { useEffect, useState } from "react";

function Posts({ data, setClickedPost }) {
  const [isLiked, setIsLiked] = useState(0);
  const [likecount, setLikecount] = useState(0);
  const navigate = useNavigate();
  //해당게시글 클릭시 detail 페이지로 이동
  const goToDetail = () => {
    setClickedPost(data);
    navigate(`/detail?uuid=${data.uuid}`);
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
    } catch {}
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
      } catch {}
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
      } catch {}
      await getLikeCount();
    }
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
        <span onClick={onLikeBtnClick}>
          {isLiked ? "Like❤️ " : "Like🤍 "}
          {likecount}
        </span>
      </div>
    </div>
  );
}
export default Posts;
