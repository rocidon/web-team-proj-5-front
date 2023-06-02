import { useEffect } from 'react'

const Login_Api = ({ setGetToken, setUserInfo }) => {
      
  
	const { naver } = window
	const NAVER_CLIENT_ID = "Zg1hIM7JpWjirJgVfEzO"
	const NAVER_CALLBACK_URL = "http://localhost:3000/main"

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
				const userid = naverLogin.user.getEmail()
			}
		})     
	}
   
	    const userAccessToken = () => {
		    window.location.href.includes('access_token') && getToken()
	}
        
      	const getToken = () => {
		const token = window.location.href.split('=')[1].split('&')[0]
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