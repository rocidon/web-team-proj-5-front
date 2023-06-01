import { useState } from "react";
import axios from "axios";
import Posts from "../components/Posts";

function Main({ datas, isLoading, setIsLoading, setClickedPost, getDatas }) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const createNewPost = async () => {
    try {
      await axios
        .post("http://localhost:8080/posts", {
          params: {
            post_creator: "정재승작성연습",
            post_email: "ffff7777ffff7777",
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
        <form onSubmit={onSubmit}>
          <input
            type="text"
            maxLength={20}
            required
            value={title}
            onChange={onTitleChange}
            placeholder="제목입력부분"
          />
          <input
            type="text"
            maxLength={200}
            required
            value={text}
            onChange={onTextChange}
            placeholder="글내용 입력부분"
          />
          <input type="submit" value="작성" />
        </form>
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
