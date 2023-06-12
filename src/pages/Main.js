import { useState } from "react";
import axios from "axios";
import Posts from "../components/Posts";
import { Modal, Button, InputGroup, Form } from "react-bootstrap";
import { usdDispatch, useDispatch, useSelector } from "react-redux";
import { clickedFunction } from "./../store.js"
import "../css/Main.css";

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
            (<div className="submitform">
              <form onSubmit={onSubmit}>
                <h4 style={{ fontWeight: "bolder", fontSize: "16px" }}>제목</h4>
                <InputGroup size="sm" className="mb-3">
                  <Form.Control
                    aria-label="Small"
                    type="text"
                    maxLength={100}
                    required
                    value={title}
                    onChange={onTitleChange}
                    placeholder="제목쓰는곳"

                  />
                </InputGroup>
                <h4 style={{ fontWeight: "bolder", fontSize: "16px" }}>내용</h4>
                <textarea
                  type="text"
                  maxLength={200}
                  required
                  value={text}
                  onChange={onTextChange}
                  placeholder="글내용 입력하는곳">
                </textarea>
                <Button variant="primary" size="sm" type="submit">저장</Button>
              </form>
            </div>) : (<div></div>)

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
