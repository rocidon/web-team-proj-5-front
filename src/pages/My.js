import { Nav, DropdownButton, Dropdown } from "react-bootstrap";
import Comment from "../components/Comment";

// 현재 My 접속하면 오류납니다! (<Comment /> component에 props 전달해주지 않아서..)
// 수정할 예정 입니다! 23.05.31. 정재승-

function My({ setIsLoggedIn }) {
  const onLogoutBtnClick = () => {
    localStorage.clear();
    setIsLoggedIn(false);
  };
  return (
    <div>
      <Nav variant="tabs" defaultActiveKey="/home">
        <Nav.Item>
          <Nav.Link eventKey="">작성 게시물</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1">작성한 댓글</Nav.Link>
        </Nav.Item>
      </Nav>
      <DropdownButton id="dropdown-item-button" title="정렬">
        <Dropdown.Item as="button">좋아요순</Dropdown.Item>
        <Dropdown.Item as="button">최신업로드순</Dropdown.Item>
      </DropdownButton>
      <button onClick={onLogoutBtnClick}>로그아웃</button>
    </div>
  );
}
export default My;
