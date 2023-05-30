import Detail from "./pages/Detail";
import My from "./pages/My";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Location from "./pages/Location";
import "./css/App.css";
import { Routes, Route } from "react-router-dom";
import { Navbar, Nav, Container } from 'react-bootstrap';

function App() {

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
        <Nav.Link eventKey="link-1">popular</Nav.Link>
        <hr />
        <Nav.Link eventKey="link-2">topics</Nav.Link>
        <hr />
        <Nav.Link href="/location">위치</Nav.Link>
      </Nav>
      <div className="section">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/main" element={<Main />} />
          <Route path="/detail" element={<Detail />} />
          <Route path="/my" element={<My />} />
          <Route path="/login" element={<Login />} />
          <Route path="/location" element={<Location />} />
        </Routes>
      </div>

    </div>
  );
}

export default App;
