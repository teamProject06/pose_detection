import { React, useState } from 'react';
import styled from "styled-components";
import $ from "jquery";
import axios from "axios";
import {useNavigate} from "react-router-dom";

import port from "./../../data/port.json"; //urlData

const FindPwComponent = () => {

  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
    rePassword: "",
  });

  const onClickButton = () => {
    /*________________check input_________________ */
    if (userData.email === "") {
      alert("이메일을 입력해주세요.");
      // emailRef.current.focus();
      $("#email").focus();
      return;
    }

    if (userData.password === "") {
      alert("새 비밀번호를 입력해주세요.");
      $("#password").focus();
      return;
    }

    if (userData.rePassword === "") {
      alert("새 비밀번호 재확인을 입력해주세요.");
      $("#rePassword").focus();
      return;
    }

    if (userData.password !== userData.rePassword) {
      alert("새 비밀번호와 비밀번호 확인이 일치하지 않아요.");
      setUserData({
        ...userData,
        password: "",
        rePassword: ""
      });
      
      $("#password").focus();
      return;
  }
  sendUserData().then((res) => {
    alert(res.data.result); //비밀번호 변경 완료
    navigate("/signin");
  }).catch((e) => {
    alert(e.response.data.fail);
  });
}

const changePWData = (e) => {
  setUserData({
    ...userData,
    [e.target.name] : e.target.value,
  })
}

/*________________connect to server_________________ */
const sendUserData = async () => {
  return await axios.post(port.url + "/user/findpw", userData);
}


  return (
    <Container>
      <Title>비밀번호 변경</Title>
      <Subtitle>가입했던 이메일 입력 후, 변경할 비밀번호를 입력해주세요.</Subtitle>

      <SmallPadding>
        <Label>가입했던 이메일</Label>
        <SignUpInput type="email" id="email" name="email" onChange = {changePWData} defaultValue = {userData.email}  placeholder='이메일 (ex. health@gmail.com)' />
      </SmallPadding>
      <SmallPadding/>
      <SmallPadding/>
      <SmallPadding>
        <Label>변경할 비밀번호</Label>
        <SignUpInput type="password" id="password" name="password" defaultValue = {userData.password} onChange = {changePWData}  placeholder='새 비밀번호' />
      </SmallPadding>

      <BigPadding>
        <SignUpInput type="password" id="rePassword" name="rePassword" defaultValue = {userData.rePassword} onChange = {changePWData}  placeholder='새 비밀번호 확인' />
      </BigPadding>

      <Button onClick={onClickButton}>변경하기</Button>
    </Container>
  )
}


/*__________________css___________________ */
const Container = styled.div`
  display : block;
  text-align : center;
  max-width: 500px;
  margin: 0 auto;
  padding: 50px 10px;
`;

const Title = styled.div`
  font-size : 20px;
  text-size-adjust: none;
  font-family: campton, "Apple SD Gothic Neo", NanumBarunGothic, 나눔바른고딕, "Malgun Gothic", "맑은 고딕", dotum, sans-serif;
  padding: 0;
`;

const Subtitle = styled.div`
  font-size : 12px;
  text-size-adjust: none;
  font-family: campton, "Apple SD Gothic Neo", NanumBarunGothic, 나눔바른고딕, "Malgun Gothic", "맑은 고딕", dotum, sans-serif;
  padding: 10px 0 10%;
`;

const SignUpInput = styled.input`
  text-size-adjust: none;
  font-size: 13px; 
  font-weight: 800;
  border: 1px solid #d4d4d4;
  border-radius: 5px;
  width: 300px; 
  height: 45px;
  padding: 14px; 
  margin: 20;
  color: #1a1a1a;
  outline: none;
`;

const Button = styled.button`
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
  font-weight: 700;
  font-size : 13px;
  color : #1d1d1d;
  font-family: campton, "Apple SD Gothic Neo", NanumBarunGothic, 나눔바른고딕, "Malgun Gothic", "맑은 고딕", dotum, sans-serif;
`

const SmallPadding = styled.div`
padding:  0 0 10px`
  ;

const BigPadding = styled.div`
padding:  0 0 50px`
  ;


export default FindPwComponent;
