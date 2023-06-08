import Detail from "./pages/Detail";
import My from "./pages/My";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Location from "./pages/Location";
import "./css/App.css";
import { Routes, Route } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import Popular from "./pages/Popular";

function App() {
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
  }, []);

  return (
    <div>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="/main">로고</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#search">검색</Nav.Link>
            <Nav.Link href="/login">로그인</Nav.Link>
            <Nav.Link href="/my">마이페이지</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Nav defaultActiveKey="/main" className="flex-column">
        <Nav.Link href="/main">home</Nav.Link>
        <Nav.Link href="/popular" eventKey="link-1">
          popular
        </Nav.Link>
        <hr />
        <Nav.Link eventKey="link-2">topics</Nav.Link>
        <hr />
        <Nav.Link href="/location">위치</Nav.Link>
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
          <Route path="/my" element={<My />} />
          <Route path="/login" element={<Login />} />
          <Route path="/location" element={<Location />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
