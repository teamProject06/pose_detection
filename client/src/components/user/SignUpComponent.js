import { React, useEffect, useState } from 'react';
import styled from "styled-components";
import $ from "jquery";
import axios from "axios";
import {useNavigate} from "react-router-dom";

import port from "../../data/port.json"; //urlData

const SignUpComponent = () => {
  const navigate = useNavigate();

  const [signUpData, setSignUpData] = useState({
    email: "",
    password: "",
    rePassword: "",
    name: ""
  });

  const onClickSignUpButton = () => {

    /*________________check input_________________ */
    if (signUpData.email === "") {
      alert("이메일을 입력해주세요.");
      $("#email").focus();
      return;
    }

    if (!emailFormCheck(signUpData.email)) {
      alert("이메일 형식에 맞게 입력해주세요.\n(ex. health@gmail.com)");
      setSignUpData({
        email: "",
        ...signUpData,
      });
      $("#email").focus();
      return;
    }

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

    if (signUpData.name === "") {
      alert("이름을 입력해주세요");
      $("#name").focus();
      return;
    }

    if (signUpData.password.length < 5) {
      alert("비밀번호는 5글자 이상으로 설정해 주세요.");
      setSignUpData({
        ...signUpData,
        password: "",
        rePassword: ""
      });
      
      $("#password").focus();
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

  const changeSignUpData = (e) => {
    setSignUpData({
      ...signUpData,
      [e.target.name] : e.target.value,
    })
  }

  const emailFormCheck = (email) => { //이메일 형식 검사
    var reg = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    return reg.test(email);
}

  /*________________connect to server_________________ */
  const sendSignUpData = async () => {
    return await axios.post(port.url + "/user/signup", signUpData);
  }

  return (
    <SignUpContainer>
      <SignUpTitle>Hi, there! Welcome to FITBACK</SignUpTitle>
      <SignUpSubtitle>아래의 정보를 작성하면 가입이 완료됩니다.</SignUpSubtitle>
      <SmallPadding>
        <Label>Email and Password</Label>
        <SignUpInput type="email" id="email" name="email" onChange = {changeSignUpData} defaultValue = {signUpData.email}  placeholder='이메일 (ex. health@gmail.com)' />
      </SmallPadding>
      <SmallPadding>
        <SignUpInput type="password" id="password" name="password" minLength={5} defaultValue = {signUpData.password} onChange = {changeSignUpData}  placeholder='비밀번호' />
      </SmallPadding>
      <BigPadding>
        <SignUpInput type="password" id="rePassword" name="rePassword" defaultValue = {signUpData.rePassword} onChange = {changeSignUpData}  placeholder='비밀번호 재확인' />
        <LengthPwLabel>비밀번호는 최소 5자이상이여야 합니다.</LengthPwLabel>
      </BigPadding>
      <SmallPadding>
        <Label>Name</Label>
        <SignUpInput type="text" id="name" name="name" defaultValue={signUpData.name} onChange = {changeSignUpData} placeholder='이름' />
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
  font-weight: 800;
  text-size-adjust: none;
  font-family: campton, "Apple SD Gothic Neo", NanumBarunGothic, 나눔바른고딕, "Malgun Gothic", "맑은 고딕", dotum, sans-serif;
  padding: 0;
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
  color: white;
  font-weight: 600;
  font-size: 14px;
  line-height: 25px;
  border: 0.1px solid #1d1d1d;
  border-radius: 8px;
  background-color : #1d1d1d;
  margin : 10px 0 10px;
`;

const Label = styled.div`
  padding : 0 100px 5px;
  text-align : left;
  font-size : 13px;
  font-weight: 700;
  color : #1d1d1d;
  font-family: campton, "Apple SD Gothic Neo", NanumBarunGothic, 나눔바른고딕, "Malgun Gothic", "맑은 고딕", dotum, sans-serif;
`
const LengthPwLabel = styled.div`
  padding : 0 100px 5px;
  text-align : right;
  font-size : 12px;
  color : grey;
  margin : 10px 0;
  font-family: campton, "Apple SD Gothic Neo", NanumBarunGothic, 나눔바른고딕, "Malgun Gothic", "맑은 고딕", dotum, sans-serif;
`

const SmallPadding = styled.div`
padding:  0 0 10px`
  ;

const BigPadding = styled.div`
padding:  0 0 50px`
  ;


export default SignUpComponent;