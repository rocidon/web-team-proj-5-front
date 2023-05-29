import { Nav, DropdownButton, Dropdown } from "react-bootstrap";
import Comment from "../components/Comment";

function My() {
    return (<div>
        <Nav variant="tabs" defaultActiveKey="/home">
            <Nav.Item>
                <Nav.Link eventKey="">작성 게시물</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-1">작성한 댓글</Nav.Link>
            </Nav.Item>
        </Nav>
        <DropdownButton id="dropdown-item-button" title="정렬" >
            <Dropdown.Item as="button">좋아요순</Dropdown.Item>
            <Dropdown.Item as="button">최신업로드순</Dropdown.Item>
        </DropdownButton>
        {[1, 2, 3].map(() => { return (<Comment />) })}
    </div>)
}
export default My;