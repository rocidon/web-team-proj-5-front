import { Nav, DropdownButton, Dropdown, Button } from "react-bootstrap";
import Comment from "../components/Comment";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Bulletin from "../components/Bulletin";
import Posts from "../components/Posts";
import axios from "axios";


// 현재 My 접속하면 오류납니다! (<Comment /> component에 props 전달해주지 않아서..)
// 수정할 예정 입니다! 23.05.31. 정재승-

function My({ setIsLoggedIn, setClickedPost, commentUUID, setIsCommentLoading, getComments }) {
  const [isPost, setIsPost] = useState(true);

  const [postDatas, setPostDatas] = useState([]);//작성 게시물 담을변수(좋아요순)
  const [commentDatas, setCommentDatas] = useState([]);//작성 댓글 담을변수(좋아요순)

  const [postDatasTime, setPostDatasTime] = useState([]);//작성 게시물 담을변수(시간순)
  const [commentDatasTime, setCommentDatasTime] = useState([]);//작성 댓글 담을변수(시간순)

  const navigate = useNavigate();
  const onLogoutBtnClick = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/main");
  };
  const getPostDatas = async () => {//작성게시글 좋아요순
    try {
      const response = await axios.get("http://localhost:8080/me/posts/likelist", {
        params: {
          email: localStorage.getItem("email"),
        },
      });
      const dataList = response.data;
      console.log(dataList);
      setPostDatas(dataList);
    } catch (error) {
      console.log(error);
    }
  };

  const getCommentDatas = async () => {//작성댓글 좋아요순  //여기서 계속 오류
    try {
      const response = await axios.get("http://localhost:8080/me/comments/likelist", {
        params: {
          email: localStorage.getItem("email"),
        },
      });
      const dataList = response.data;
      console.log(dataList);
      setCommentDatas(dataList);
    } catch (error) {
      console.log(error);
    }

  };
  // const getPostDatas2 = async () => {//작성게시글 최근등록순
  //   try {
  //     const response = await axios.get("http://localhost:8080/me/posts/recent", {
  //       params: {
  //         email: localStorage.getItem("email"),
  //       },
  //     });
  //     const dataList = response.data;
  //     console.log(dataList);
  //     setPostDatasTime(dataList);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const getCommentDatas2 = async () => {//작성댓글 최근등록순
  //   try {
  //     const response = await axios.get("http://localhost:8080/me/comments/recent", {
  //       params: {
  //         email: localStorage.getItem("email"),
  //       },
  //     });
  //     const dataList = response.data;
  //     console.log(dataList);
  //     setCommentDatasTime(dataList);
  //   } catch (error) {
  //     console.log(error);
  //   }

  // };

  useEffect(() => {
    getPostDatas();
    //getCommentDatas();

  }, []);
  return (
    <div>
      <h4>닉네임</h4>
      <div>이메일</div>
      <Button variant="outline-danger" size="sm" onClick={onLogoutBtnClick}>로그아웃</Button>
      <Nav variant="tabs" defaultActiveKey="/home">
        <Nav.Item>
          <Nav.Link eventKey="" onClick={() => {
            setIsPost(true)
          }}>작성 게시물</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1" onClick={() => {
            setIsPost(false)
          }}>작성한 댓글</Nav.Link>
        </Nav.Item>
      </Nav>
      <DropdownButton id="dropdown-item-button" title="정렬">
        <Dropdown.Item as="button">좋아요순</Dropdown.Item>
        <Dropdown.Item as="button">최신업로드순</Dropdown.Item>
      </DropdownButton>
      {
        isPost ? (
          postDatas.map((data) => {
            return (
              <Posts
                key={data.uuid}
                data={data}
                setClickedPost={setClickedPost}
              />
            );
          })
        ) : (

          <div>작성한 댓글</div>
        )
      }

    </div>
  );
}
export default My;
