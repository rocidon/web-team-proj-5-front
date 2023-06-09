import { useEffect } from 'react'
import axios from 'axios'

const Login_Api = ({ setGetToken, setUserInfo }) => {
      
  
	const { naver } = window
	const NAVER_CLIENT_ID = "Zg1hIM7JpWjirJgVfEzO"
	const NAVER_CALLBACK_URL = "http://localhost:3000/main"
	let count = 0; //소셜로 받은 정보가 기존 데이터에 존재 여부를 판별하기 위해

	const initializeNaverLogin = () => {
		const naverLogin = new naver.LoginWithNaverId({
			clientId: NAVER_CLIENT_ID,
			callbackUrl: NAVER_CALLBACK_URL,          
			isPopup: false,
			loginButton: { color: 'green', type: 3, height: 58 },
			callbackHandle: true,
		})
		naverLogin.init()
      naverLogin.getLoginStatus(async function (status) {
			if (status) {
				const userid = naverLogin.user.getEmail() //네이버로부터 사용자의 이메일을 받아옴
				//localStorage.setItem('email', userid)
				count = await sendDataToBackend(userid) //이메일과 일치하는 계정정보여부를 판별
			}
		})     
	}
   
	    const userAccessToken = () => {
		    window.location.href.includes('access_token') && getToken()
	}
        
      	const getToken = () => {
		const token = window.location.href.split('=')[1].split('&')[0]
		localStorage.setItem('access_token', token)
		setGetToken(token)
		console.log(token);
	}

	const sendDataToBackend = async (data) => { //네이버로 부터 전달 받은 데이터 서버로 전송
		try{
			const response = await axios.post('/countData', {data})//서버로 전달
			const result = response.data.result; //받은 결과 값
			return result; //결과 값 반환
		}
		catch(error){
			console.error(error);
		}
	}
	useEffect(() => {
		initializeNaverLogin()
		userAccessToken()		
	}, [])



	return (
		<>
			<div id="naverIdLogin" />
		</>
	)
	
}

export default Login_Api;