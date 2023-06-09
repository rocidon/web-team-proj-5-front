import Detail from "./pages/Detail";
import My from "./pages/My";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Location from "./pages/Location";
import "./css/App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import Popular from "./pages/Popular";

function App() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // /posts에서 fetch한 json을 저장하는 Array
  const [datas, setDatas] = useState([]);
  // fetch가 완료 되었는지 나타내는 boolean
  const [isLoading, setIsLoading] = useState(true);
  // props 전달해 줄 클릭한 포스트
  const [clickedPost, setClickedPost] = useState("");

  const getDatas = async () => {
    const dataJson = await (
      await fetch("http://localhost:8080/posts/all")
    ).json();
    //console.log(dataJson);
    setDatas(dataJson);
    setIsLoading(false);
  };
  useEffect(() => {
    getDatas();
    if (
      localStorage.getItem("email") &&
      localStorage.getItem("pw") &&
      localStorage.getItem("username")
    ) {
      const userData = {
        user_email: localStorage.getItem("email"),
        user_pw: localStorage.getItem("pw"),
      };
      fetch("http://localhost:8080/login", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(userData),
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.isLogin === "True") {
            //로그인 성공
            console.log("로그인 성공");
            setIsLoggedIn(true);
          } else {
            alert(json.isLogin);
          }
        });
    }
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <Navbar bg="primary" variant="dark">
            <Container>
              <Navbar.Brand
                onClick={() => {
                  navigate("/main");
                }}
              >
                로고
              </Navbar.Brand>
              <Nav className="me-auto">
                <Nav.Link
                  onClick={() => {
                    navigate("/search");
                  }}
                >
                  검색
                </Nav.Link>
                <Nav.Link
                  onClick={() => {
                    navigate("/my");
                  }}
                >
                  마이페이지
                </Nav.Link>
              </Nav>
            </Container>
          </Navbar>
          <Nav defaultActiveKey="/main" className="flex-column">
            <Nav.Link
              onClick={() => {
                navigate("/main");
              }}
            >
              topics
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/popular");
              }}
              eventKey="link-1"
            >
              popular
            </Nav.Link>
            <hr />
            <Nav.Link
              onClick={() => {
                navigate("/location");
              }}
            >
              Location
            </Nav.Link>
          </Nav>
          <div className="section">
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    datas={datas}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                    setClickedPost={setClickedPost}
                    getDatas={getDatas}
                  />
                }
              />
              <Route
                path="/main"
                element={
                  <Main
                    datas={datas}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                    setClickedPost={setClickedPost}
                    getDatas={getDatas}
                  />
                }
              />
              <Route
                path={`/detail`}
                element={
                  <Detail
                    clickedPost={clickedPost}
                    setIsLoading={setIsLoading}
                    getDatas={getDatas}
                  />
                }
              />
              <Route
                path="/popular"
                element={<Popular setClickedPost={setClickedPost} />}
              />
              <Route
                path="/my"
                element={<My setIsLoggedIn={setIsLoggedIn} />}
              />
              <Route path="/location" element={<Location />} />
            </Routes>
          </div>
        </div>
      ) : (
        <Login setIsLoggedIn={setIsLoggedIn} />
      )}
    </div>
  );
}

export default App;
