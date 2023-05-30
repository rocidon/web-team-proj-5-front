import Bulletin from "../components/Bulletin";
import Comment from "../components/Comment";
import { Button } from "react-bootstrap";
import "../css/Detail.css";
import { useState, useEffect } from "react";

function Detail({ clickedPost, setClickedPost }) {
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
            <textarea placeholder="댓글입력하는곳"></textarea>
            <br />
            <Button variant="outline-primary">등록</Button> <br />
            <Button variant="outline-danger">삭제</Button>{" "}
            <Button variant="outline-secondary">수정</Button>{" "}
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
