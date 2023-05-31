import Bulletin from "../components/Bulletin";
import Comment from "../components/Comment";
import { Button } from "react-bootstrap";
import "../css/Detail.css";
import { useState, useEffect } from "react";

function Detail({ clickedPost, setClickedPost }) {
  // /comments에서 fetch한 json을 저장하는 Array
  const [comments, setComments] = useState([]);
  // fetch가 완료되었는지를 나타내는 boolean
  const [isLoading, setIsLoading] = useState(true);
  // 가져온 모든 comments에서 해당 글에 맞는 댓글들을 선별하여 저장하는 Array
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
