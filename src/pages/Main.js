import { useState } from "react";
import axios from "axios";
import Posts from "../components/Posts";
import { Modal, Button } from "react-bootstrap";
import { usdDispatch, useDispatch, useSelector } from "react-redux";
import { clickedFunction } from "./../store.js"

function Main({ datas, isLoading, setIsLoading, setClickedPost, getDatas }) {
  let isClicked = useSelector((state) => { return state })
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const createNewPost = async () => {
    try {
      await axios
        .post("http://localhost:8080/posts", {
          params: {
            post_creator: localStorage.getItem("username"),
            post_email: localStorage.getItem("email"),
            post_title: title,
            post_text: text,
          },
        })
        .then((res) => {
          console.log(res.data);
          //alert("글 작성이 완료되었습니다.");
        })
        .catch(function (err) {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const onTitleChange = ({ target: { value } }) => {
    setTitle(value);
  };
  const onTextChange = ({ target: { value } }) => {
    setText(value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    setTitle("");
    setText("");
    setIsLoading(true);
    await createNewPost();
    getDatas();
  };

  return (
    <div>
      <div>
        {
          (isClicked.isClicked) ?
            (
              <form onSubmit={onSubmit}>
                <div>제목</div>
                <input
                  type="text"
                  maxLength={20}
                  required
                  value={title}
                  onChange={onTitleChange}
                  placeholder="제목입력부분"
                />
                <div>내용작성</div>
                <textarea
                  type="text"
                  maxLength={200}
                  required
                  value={text}
                  onChange={onTextChange}
                  placeholder="글내용 입력부분">
                </textarea>
                <input type="submit" value="작성" />
              </form>
            ) : (<div></div>)

        }
      </div>
      {isLoading ? (
        <span>로딩중</span>
      ) : (
        datas.map((data) => {
          return (
            <Posts
              key={data.uuid}
              data={data}
              setClickedPost={setClickedPost}
            />
          );
        })
      )}
    </div>
  );
}
export default Main;
