import React, { useState, useEffect } from 'react';

function NaverLoginComp() {

	const [data, setData] = useState({ nickname: '', email: '' });

  const { naver } = window;

	const CLIENT_ID = "Y_M_9xvRNo5z1yBIjCjz";
	const CALLBACK_URL = "http://localhost:3000/oauth";

	const initializeNaverLogin = () => {
		const naverLogin = new naver.LoginWithNaverId({
			clientId: CLIENT_ID,
			callbackUrl: CALLBACK_URL,
			isPopup: false,
			loginButton: { color: 'green', type: 3, height: 58 },
			callbackHandle: true,
		});

		// naverLogin이라는 컴포넌트 생성 후 초기화
		naverLogin.init();

    naverLogin.getLoginStatus(async function (status) {
			if (status) {
				const nickname = naverLogin.user.getName();
				const email = naverLogin.user.getEmail();

        if(nickname === null || nickname === undefined) {
          alert("별명은 필수정보입니다. 정보제공을 동의해주세요.");
          naverLogin.reprompt();
          return ;  
        } else if (email === null || email === undefined) {
          alert("이메일은 필수정보입니다. 정보제공을 동의해주세요.");
          naverLogin.reprompt();
          return;
        } else {
					setData({ nickname, email });
        }
			} else {
				console.log("callback 처리 실패");
			}
		});
  }

	useEffect(() => {
		initializeNaverLogin();
	})

	return (
		<>
			<div id="naverIdLogin" />
			<span>{data.nickname}</span> <br/>
			<span>{data.email}</span> <br/>
		</>
	);
}

export default NaverLoginComp;