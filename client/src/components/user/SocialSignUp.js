import React, { useState, useRef, useEffect } from 'react';
import { useCookies } from "react-cookie";
import styled from "styled-components";
import $ from "jquery";
import axios from "axios";
import {useNavigate} from "react-router-dom";

import port from "./../../data/port.json"; //urlData

const SocialSignUp = () => {
  const navigate = useNavigate();

  const [cookiesAuth, setCookieAuth, removeCookieAuth] = useCookies(["auth"]);

  const emailRef = useRef();

  const [signUpData, setSignUpData] = useState({
    email: "",
    password: "",
    rePassword: "",
    name: ""
  });

  const changeSignUpData = (e) => {
    setSignUpData({
        ...signUpData,
        [e.target.name]: e.target.value
    })
}

useEffect(() => {
    console.log(cookiesAuth.auth);

    setSignUpData({
        ...signUpData,
        email: cookiesAuth.auth.kakao_account.email,
        name: cookiesAuth.auth.kakao_account.profile.nickname
    });
}, []);

  const onClickSignUpButton = () => {

    /*________________check input_________________ */

    if (signUpData.password === "") {
      alert("비밀번호를 입력해주세요.");
      $("#password").focus();
      return;
    }

    if (signUpData.rePassword === "") {
      alert("비밀번호 재확인을 입력해주세요.");
      $("#rePassword").focus();
      return;
    }



    if (signUpData.password !== signUpData.rePassword) {
      alert("비밀번호와 비밀번호 확인이 일치하지 않아요.");
      setSignUpData({
        ...signUpData,
        password: "",
        rePassword: ""
      });
      
      $("#password").focus();
      return;
  }
  sendSignUpData().then((res) => {
    alert(res.data.result); //회원가입 완료
    navigate("/signin");
  }).catch((e) => {
    alert(e.response.data.fail);
  });
}

  /*________________connect to server_________________ */
  const sendSignUpData = async () => {
    return await axios.post(port.url + "/auth/kakao", signUpData);
  }

  return (
    <SignUpContainer>
      <SignUpTitle>KaKao 로그인</SignUpTitle>
      <SignUpSubtitle>카카오계정으로 가입합니다.</SignUpSubtitle>
      <SmallPadding>
        <Label>Email and Password</Label>
        <SignUpInput type="email"  disabled ref={emailRef} value={signUpData.email} id="email" name="email" onChange = {changeSignUpData} defaultValue = {signUpData.email}  placeholder='이메일 (ex. health@gmail.com)' />
      </SmallPadding>
      <SmallPadding>
        <SignUpInput type="password" id="password" name="password" defaultValue = {signUpData.password} onChange = {changeSignUpData}  placeholder='비밀번호' />
      </SmallPadding>
      <BigPadding>
        <SignUpInput type="password" id="rePassword" name="rePassword" defaultValue = {signUpData.rePassword} onChange = {changeSignUpData}  placeholder='비밀번호 재확인' />
      </BigPadding>
      <SmallPadding>
        <Label>Name</Label>
        <SignUpInput type="text" id="name" name="name" defaultValue={signUpData.name} disabled value={signUpData.name} onChange = {changeSignUpData} placeholder='이름' />
      </SmallPadding>
      <SignUpButton onClick={onClickSignUpButton}>회원가입</SignUpButton>
    </SignUpContainer>
  )
}

/*__________________css___________________ */
const SignUpContainer = styled.div`
  display : block;
  text-align : center;
  max-width: 500px;
  margin: 0 auto;
  padding: 50px 10px;
`;

const SignUpTitle = styled.div`
  font-size : 20px;
  text-size-adjust: none;
  font-family: campton, "Apple SD Gothic Neo", NanumBarunGothic, 나눔바른고딕, "Malgun Gothic", "맑은 고딕", dotum, sans-serif;
  padding: 20% 0 0;
`;

const SignUpSubtitle = styled.div`
  font-size : 12px;
  text-size-adjust: none;
  font-family: campton, "Apple SD Gothic Neo", NanumBarunGothic, 나눔바른고딕, "Malgun Gothic", "맑은 고딕", dotum, sans-serif;
  padding: 10px 0 10%;
`;

const SignUpInput = styled.input`
  text-size-adjust: none;
  font-size: 13px; 
  font-weight: 500;
  border: 1px solid #d4d4d4;
  border-radius: 5px;
  width: 300px; 
  height: 45px;
  padding: 14px; 
  margin: 20;
  color: #1a1a1a;
  outline: none;
`;

const SignUpButton = styled.button`
  width : 300px;
  height : 45px;
  color: #1d1d1d;
  font-weight: 600;
  font-size: 14px;
  line-height: 25px;
  border: 0.1px solid #c3dbff;
  border-radius: 8px;
  background-color : #c3dbff;
  margin : 10px 0 10px;
`;

const Label = styled.div`
  padding : 0 100px 5px;
  text-align : left;
  font-size : 13px;
  color : #c3dbff;
  font-family: campton, "Apple SD Gothic Neo", NanumBarunGothic, 나눔바른고딕, "Malgun Gothic", "맑은 고딕", dotum, sans-serif;
`

const SmallPadding = styled.div`
padding:  0 0 10px`
  ;

const BigPadding = styled.div`
padding:  0 0 50px`
  ;


export default SocialSignUp;