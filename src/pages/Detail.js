import Bulletin from "../components/Bulletin";
import Comment from "../components/Comment";
import { Button } from "react-bootstrap";
import "../css/Detail.css";
import { useState, useEffect } from "react";
import axios from "axios";

function Detail({ clickedPost, setClickedPost }) {
  const [text, setText] = useState("");

  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const commentList = [];
  const getComments = async () => {
    const dataJson = await (
      await fetch(`http://localhost:8080/comments`)
    ).json();
    await dataJson.map((data) => {
      if (data.uuid == clickedPost.uuid) {
        commentList.push(data);
      }
    });
    setComments(commentList);
    console.log(comments);
    setIsLoading(false);
  };
  useEffect(() => {
    getComments();
  }, []);

  const createNewComment = async () => {
    try {
      await axios
        .post("http://localhost:8080/comments", {
          params: {
            post_uuid: clickedPost.uuid,
            comment_creator: "정재승댓글작성연습",
            comment_uid: "zzzz9999zzzz9999zzzz",
            comment_text: text,
          },
        })
        .then((res) => {
          console.log(res.data);
          //alert("댓글 작성이 완료되었습니다.");
        })
        .catch(function (err) {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const onTextChange = ({ target: { value } }) => {
    setText(value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    setText("");
    setIsLoading(true);
    await createNewComment();
    getComments();
  };

  return (
    <div>
      {isLoading ? (
        <div>
          <span>로딩중</span>
        </div>
      ) : (
        <>
          <Bulletin data={clickedPost} setClickedPost={setClickedPost} />
          <div className="inputComment">
            <h4>Add Comment</h4>
            <form onSubmit={onSubmit}>
              <textarea
                onChange={onTextChange}
                placeholder="댓글입력하는곳"
                value={text}
              />
              <input type="submit" value="댓글작성" />
              <br />
              <Button variant="outline-primary">등록</Button> <br />
              <Button variant="outline-danger">삭제</Button>{" "}
              <Button variant="outline-secondary">수정</Button>{" "}
            </form>
          </div>
          <div>
            {comments.map((data) => {
              return <Comment key={data.uuid2} data={data} />;
            })}
          </div>
        </>
      )}
    </div>
  );
}
export default Detail;
