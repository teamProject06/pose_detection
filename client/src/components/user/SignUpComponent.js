import React from 'react'
import styled from "styled-components";


// const SignUp = ({ signupData, onChangeSignupData, setSignupData }) => {
const SignUpComponent = () => {


  /*________________check input_________________ */


  /*________________connect to server_________________ */
  const onClickSignUpButton = () => {
    alert("No check input, No connect to server yet");
  }
    

  return (
    <SignUpContainer>
      <SignUpTitle>Hi, there! Welcome to ( )</SignUpTitle>
      <SignUpSubtitle>아래의 정보를 작성하면 가입이 완료됩니다.</SignUpSubtitle>
      <SmallPadding>
        <SignUpInput type="email" id="email" placeholder='이메일 (ex. health@gmail.com)' />
      </SmallPadding>
      <SmallPadding>
        <SignUpInput type="password" id="password" placeholder='비밀번호' />
      </SmallPadding>
      <BigPadding>
        <SignUpInput type="password" id="rePassword" placeholder='비밀번호 재확인' />
      </BigPadding>
      <SmallPadding>
        <SignUpInput type="text" id="name" placeholder='이름' />
      </SmallPadding>
      <SignUpButton onClick={() => { onClickSignUpButton(); }}>회원가입</SignUpButton>
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
  font-family: campton, "Apple SD Gothic Neo", NanumBarunGothic, 나눔바른고딕, "Malgun Gothic", "맑은 고딕", dotum, sans-serif;;
  padding: 20% 0 0;
`;

const SignUpSubtitle = styled.div`
  font-size : 12px;
  text-size-adjust: none;
  font-family: campton, "Apple SD Gothic Neo", NanumBarunGothic, 나눔바른고딕, "Malgun Gothic", "맑은 고딕", dotum, sans-serif;;
  padding: 10px 0 10%;
`;

const SignUpInput = styled.input`
  font-family:     
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

const Label = styled.label`
  font-size : 10px;
  font-family: campton, "Apple SD Gothic Neo", NanumBarunGothic, 나눔바른고딕, "Malgun Gothic", "맑은 고딕", dotum, sans-serif;;
`

const SmallPadding = styled.div`
padding:  0 0 10px`
  ;

const BigPadding = styled.div`
padding:  0 0 50px`
  ;


export default SignUpComponent;