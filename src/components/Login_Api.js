import { useEffect } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";

const Login_Api = ({ setSocialsignin, setEmail, setIsLoggedIn }) => {
  // 소셜 로그인이랑 이메일 값 넘기기

  const { naver } = window;
  const NAVER_CLIENT_ID = "Zg1hIM7JpWjirJgVfEzO";
  const NAVER_CALLBACK_URL = "http://localhost:3000/main";
  let count = 0; //소셜로 받은 정보가 기존 데이터에 존재 여부를 판별하기 위해

  const initializeNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: NAVER_CLIENT_ID,
      callbackUrl: NAVER_CALLBACK_URL,
      isPopup: false,
      loginButton: { color: "green", type: 3, height: 58 },
      callbackHandle: true,
    });
    naverLogin.init();
    naverLogin.getLoginStatus(async function (status) {
      if (status) {
        const userid = naverLogin.user.getEmail(); //네이버로부터 사용자의 이메일을 받아옴
        localStorage.setItem("email", userid);
        count = await sendDataToBackend(userid); //이메일과 일치하는 계정정보여부를 판별
        setSocialsignin(count); //count값을 State값에 할당하여 변경을 실시함.
        setEmail(userid); //이메일도 넘김
        if (count == 1) {
          await socialLogin(userid);
        }
        //console.log(count)
      }
    });
  };

  const sendDataToBackend = async (data) => {
    //네이버로 부터 전달 받은 데이터 서버로 전송
    try {
      const response = await axios.post("http://localhost:8080/countData", {
        params: { user_email: data },
      }); //서버로 전달
      const result = response.data[0].result; //받은 결과 값
      //console.log(result)
      return result; //결과 값 반환
    } catch (error) {
      console.error(error);
    }
  };
  const socialLogin = async (getEmail) => {
    const userData = {
      user_email: getEmail,
      user_pw: "Asdqwe12!",
    };
    await fetch("http://localhost:8080/login", {
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
          localStorage.setItem("email", getEmail);
          localStorage.setItem("pw", "Asdqwe12!");
          const username = await (
            await fetch(`http://localhost:8080/username?email=${getEmail}`)
          ).json();
          localStorage.setItem("username", username[0].username);
          setIsLoggedIn(true);
        } else {
          //네이버로그인 에러
        }
      });
  };

  useEffect(() => {
    initializeNaverLogin();
    //userAccessToken()
  }, []);

  const handleNaverLogin = () => {
    if (
      document &&
      document?.querySelector("#naverIdLogin")?.firstChild &&
      window !== undefined
    ) {
      const loginBtn = document.getElementById("naverIdLogin")?.firstChild;
      loginBtn.click();
    }
  };

  return (
    <>
      <div
        id="naverIdLogin"
        style={{ position: "absolute", top: "-100000px" }}
      />
      <Button onClick={handleNaverLogin} variant="success">
        네이버 로그인
      </Button>
    </>
  );
};

export default Login_Api;
