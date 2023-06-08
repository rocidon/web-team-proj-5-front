import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Form, CloseButton } from "react-bootstrap";
function Login({ setIsLoggedIn }) {
  // 정재승 개발 시작라인----------------------------------
  const [loginSignin, setLoginSignin] = useState(true);
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [username, setUsername] = useState("");

  const onEmailChange = ({ target: { value } }) => {
    setEmail(value);
  };
  const onPwChange = ({ target: { value } }) => {
    setPw(value);
  };
  const onPw2Change = ({ target: { value } }) => {
    setPw2(value);
  };
  const onUsernameChange = ({ target: { value } }) => {
    setUsername(value);
  };

  const onToggleClick = () => {
    setLoginSignin((prev) => !prev);
  };

  const onLoginBtnClick = () => {
    const userData = {
      user_email: email,
      user_pw: pw,
    };
    fetch("http://localhost:8080/login", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then(async (json) => {
        if (json.isLogin === "True") {
          //로그인 성공
          console.log("로그인 성공");
          localStorage.setItem("email", email);
          localStorage.setItem("pw", pw);
          const username = await (
            await fetch(`http://localhost:8080/username?email=${email}`)
          ).json();
          localStorage.setItem("username", username[0].username);
          setIsLoggedIn(true);
        } else {
          alert(json.isLogin);
        }
      });
  };
  const onSigninBtnClick = () => {
    const userData = {
      user_email: email,
      user_username: username,
      user_pw: pw,
      user_pw2: pw2,
    };
    fetch("http://localhost:8080/signin", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.isSuccess === "True") {
          //회원가입 성공
          alert("회원가입이 완료되었습니다!");
          localStorage.setItem("email", email);
          localStorage.setItem("pw", pw);
          localStorage.setItem("username", username);
          setIsLoggedIn(true);
        } else {
          alert(json.isSuccess);
        }
      });
  };
  // 정재승 개발 엔드라인----------------------------------
  return (
    <>
      <div>
        <LoginModal />
      </div>
      <div>
        <div>
          <input
            onChange={onEmailChange}
            value={email}
            type="text"
            placeholder="이메일"
          />
          <input
            onChange={onPwChange}
            value={pw}
            type="password"
            placeholder="비밀번호"
          />

          {!loginSignin && (
            <>
              <input
                onChange={onPw2Change}
                value={pw2}
                type="password"
                placeholder="비밀번호 확인"
              />
              <input
                onChange={onUsernameChange}
                value={username}
                type="text"
                placeholder="닉네임"
                maxLength="10"
              />
            </>
          )}
        </div>
        <p onClick={onToggleClick}>
          {loginSignin ? "아이디가 없으신가요?" : "로그인 하실건가요?"}
        </p>
        {loginSignin ? (
          <button onClick={onLoginBtnClick}>로그인</button>
        ) : (
          <button onClick={onSigninBtnClick}>회원가입</button>
        )}
      </div>
    </>
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
            <Button variant="secondary">로그인</Button>
            <Button variant="primary">회원가입</Button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    </>
  );
}
export default Login;
