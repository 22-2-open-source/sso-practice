import React, { useState, useEffect } from 'react';

import axios from 'axios';

function KakaoLoginComp() {

  const REST_API_KEY = "7d0e69a45db83bb4bd90561fc7a246bd";
  const REDIRECT_URI = "http://localhost:3000/oauth";
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

	const [data, setData] = useState({ nickname: '', email: '' });

  let KAKAO_CODE;
  let KAKAO_ACCESS_TOKEN;

  function loginWithKakao() {
    window.location.href = KAKAO_AUTH_URL;
  }

  async function getKakaoToken() {
    const location = window.location;
    KAKAO_CODE = location.search.split('=')[1];
    console.log(KAKAO_CODE);

    try {
      const res = await axios.post(`https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${KAKAO_CODE}`, {
        headers: {
          "Content-type": "application/x-www-form-urlencoded;charset=utf-8"
        }
      })

      console.log(res);
      if (res.data.access_token) {
        KAKAO_ACCESS_TOKEN = res.data.access_token;
        console.log(KAKAO_ACCESS_TOKEN);

        window.Kakao.init(REST_API_KEY);
        window.Kakao.Auth.setAccessToken(KAKAO_ACCESS_TOKEN);

        getKakaoProfile();
      } else {
        console.log("fail to fetch access_token");
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function getKakaoProfile() {
    try {
      const res = await window.Kakao.API.request({
        url: "/v2/user/me",
      });

      setData({
        nickname: res.kakao_account.profile.nickname,
        email: res.kakao_account.email,
      });
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (!window.location.search) return;
    getKakaoToken();
  }, []);

  return (
    <>
      <img src="https://k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg" width="222"
        alt="카카오 로그인 버튼" onClick={loginWithKakao}/> <br />
      <span>{data.nickname}</span> <br/>
      <span>{data.email}</span> <br/>
    </>
  );
}

export default KakaoLoginComp;
