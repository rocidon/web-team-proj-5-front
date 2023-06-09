import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Form, CloseButton } from "react-bootstrap";
import Login_Api from "../components/Login_Api";

function Login() {
  const [modal, setModal] = useState(true); //X 누르면 로그인창 닫기위한 버튼
  const navigate = useNavigate(); //main페이지로 이동
  const socialLoginClick = () => {
    Login_Api();
  };
  return (
    <div>
      {modal == true ? (
        <LoginModal
          modal={modal}
          setModal={setModal}
          navigate={navigate}
          socialLoginClick={socialLoginClick}
        />
      ) : null}
    </div>
  );
}
function LoginModal(props) {
  return (
    <>
      <div
        className="modal show"
        style={{ display: "block", position: "initial" }}
      >
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>로그인</Modal.Title>
            <CloseButton
              onClick={() => {
                props.setModal(false);
                props.navigate("/main");
              }}
            />
          </Modal.Header>

          <Modal.Body>
            <Form.Label htmlFor="inputPassword5">ID</Form.Label>
            <Form.Control
              type="id"
              id="inputid5"
              aria-describedby="idHelpBlock"
            />

            <Form.Label htmlFor="inputPassword5">Password</Form.Label>
            <Form.Control
              type="password"
              id="inputPassword5"
              aria-describedby="passwordHelpBlock"
            />
            <Form.Text id="passwordHelpBlock" muted></Form.Text>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={props.socialLoginClick}>네이버</Button>
            <Button variant="secondary">로그인</Button>
            <Button variant="primary">회원가입</Button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    </>
  );
}
export default Login;
