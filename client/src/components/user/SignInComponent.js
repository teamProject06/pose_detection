import React from 'react'
import styled from "styled-components";

const SignInComponent = () => {

  const onClickSignInpButton = () => {

    /*________________check input_________________ */

    
    /*________________connect to server_________________ */
    alert("No check input, No connect to server yet");
  }

  return (
    <SignInContainer>
      <SignInTitle>Start with ()!</SignInTitle>
      <SignInSubtitle>이메일과 비밀번호를 입력하여 로그인해주세요</SignInSubtitle>
      <SmallPadding>
        <SignInInput type='email' id='email' placeholder='이메일 입력' />
      </SmallPadding>
      <SmallPadding>
        <SignInInput type='password' id='password'  placeholder='비밀번호 입력' />
      </SmallPadding>
      <SignInButton onClick = {() => {onClickSignInpButton();}}>로그인</SignInButton>
      <BigPadding>
        <OtherButton href='/signup'>회원가입</OtherButton>
        <OtherButton>아이디 및 비밀번호 찾기</OtherButton>
      </BigPadding>
      <a>
        <SocialButton src={'/img/naver_login_button.png'} />
      </a>
      <a>
        <SocialButton src={'/img/kakao_login_button.png'} />
      </a>
      <a>
        <SocialButton src={'/img/google_login_button.png'} />
      </a>
    </SignInContainer>
  )
}

/*__________________css___________________ */
const SignInContainer = styled.div`
  display : block;
  text-align : center;
  max-width: 500px;
  margin: 0 auto;
  padding: 50px 10px;
`;

const SignInTitle = styled.div`
  font-size : 20px;
  text-size-adjust: none;
  font-family: campton, "Apple SD Gothic Neo", NanumBarunGothic, 나눔바른고딕, "Malgun Gothic", "맑은 고딕", dotum, sans-serif;;
  padding: 20% 0 0;
`;

const SignInSubtitle = styled.div`
  font-size : 12px;
  text-size-adjust: none;
  font-family: campton, "Apple SD Gothic Neo", NanumBarunGothic, 나눔바른고딕, "Malgun Gothic", "맑은 고딕", dotum, sans-serif;;
  padding: 10px 0 10%;
`;

const SignInInput = styled.input`
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

const SignInButton = styled.button`
  font-family: campton, "Apple SD Gothic Neo", NanumBarunGothic, 나눔바른고딕, "Malgun Gothic", "맑은 고딕", dotum, sans-serif;;
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

//회원가입 | 아이디 및 비밀번호 찾기
const OtherButton = styled.a`
  font-family: campton, "Apple SD Gothic Neo", NanumBarunGothic, 나눔바른고딕, "Malgun Gothic", "맑은 고딕", dotum, sans-serif;;
  margin : 10px 6% ;
  font-weight: 200;
  font-size: 12px;
  line-height: 25px;
  border: 2px solid #ffffff;
`;

const SocialButton = styled.img`
  width : 300px;
  height : 45px;
  margin :10px 0 0;
`;

//아래 10px
const SmallPadding = styled.div`
padding:  0 0 10px`
  ;

//아래 50px
const BigPadding = styled.div`
padding:  0 0 50px`
  ;


export default SignInComponent;