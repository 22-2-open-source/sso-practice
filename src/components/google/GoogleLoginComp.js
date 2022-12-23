import React, { useState, useEffect } from 'react';

import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';

function GoogleLoginComp() {

  const CLIENT_ID = "785768043589-ae23evrjss0j3ur3m6blr00ks59rpr5c.apps.googleusercontent.com";
  const CLIENT_SECRET = "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";

	const [data, setData] = useState({ nickname: '', email: '' });

  const onSuccess = (res) => {
    console.log(res.profileObj);
    setData({
      nickname: res.profileObj.name,
      email: res.profileObj.email,
    });
  };

  const onFailure = (err) => {
    console.log('failed', err);
  };

  useEffect(() => {
    const initClient = () => {
      // gapi.client.init({
      gapi.auth2.init({
        clientId: CLIENT_ID,
        scope: ''
      });
    };
    gapi.load('client:auth2', initClient);
  });

  return (
    <div>
      <GoogleLogin
        clientId={CLIENT_ID}
        buttonText="Sign in with Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
      />
      <br />
      <span>{data.nickname}</span> <br/>
      <span>{data.email}</span> <br/>
    </div>
  );
}

export default GoogleLoginComp;