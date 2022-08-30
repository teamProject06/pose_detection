import { React, useState } from 'react'
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";
import $ from "jquery";
import axios from 'axios';
import port from "./../../data/port.json"; //5500
import front from "./../../data/front.json"; //3000


const SignInComponent = () => {
  const navigate = useNavigate();

  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });
  const [cookies, setCookie] = useCookies(["userInfo"]);

  const onClickSignInButton = () => {
    if (signInData.email === "") {
      alert("이메일을 입력해주세요");
      $("#email").focus();
      return;
    }

    if (signInData.password === "") {
      alert("비밀번호를 입력해주세요");
      $("#password").focus();
      return;
    }

    sendSignInData().then((res) => {
      setCookie("userInfo", res.data, { path: "/" });
      alert("로그인이 완료되었습니다. 루틴을 만들어보세요!");
      navigate("/home")
    }).catch((e) => {
      console.log(e.response);
      alert(e.response.data.message);
    })
  }

  const changeSignInData = (e) => {
    setSignInData({
      ...signInData,
      [e.target.name]: e.target.value,
    });
  }

  /*________________connect to server_________________ */
  const sendSignInData = async () => {
    return await axios.post(port.url + "/user/signin", signInData);
  }
  
  const naverLogin= async() =>{
    return await axios.get(port.url + '/oauth/naver').then((res)=>{
      loginNavigate(res);
    }).catch(err => console.log(err, 'naver')) 
  }
  const kakaoLogin= async() =>{
    return await axios.get(port.url + '/oauth/kakao').then((res)=>{
      loginNavigate(res);
    }).catch(err => console.log(err,'kakao'))
  }

    const loginNavigate = (res) =>{
      if (res.data.login) {
        setCookie("userInfo", res.data, { path: "/" });
        navigate("/home");
    } else {
        setCookie("auth", res.data, { path: "/" });
        navigate("/oauth/signUp");
    }
  }

  return (
    <SignInContainer>
      <SignInTitle>Start with FITBACK!</SignInTitle>
      <SignInSubtitle>이메일과 비밀번호를 입력하여 로그인해주세요</SignInSubtitle>
      <SmallPadding>
        <SignInInput type='email' id='email' name='email' value={signInData.email} onChange={changeSignInData} placeholder='이메일 입력 (ex. health@gmail.com)' />
      </SmallPadding>
      <SmallPadding>
        <SignInInput type='password' id='password' name='password' value={signInData.password} onChange={changeSignInData} placeholder='비밀번호 입력' />
      </SmallPadding>
      <SignInButton onClick={onClickSignInButton}>로그인</SignInButton>
      <BigPadding>
        <OtherButton onClick={() => navigate("/signup")}>회원가입</OtherButton>
        <OtherButton onClick={() => navigate("/findpw")}>아이디 및 비밀번호 찾기</OtherButton>
      </BigPadding>
      {/* <a href= {NAVER_URL_CREATE}> */}
        <SocialButton src={'/img/naver_login_button.png'} onClick={naverLogin}/>
      {/* </a> */}
      {/* <a href= {KAKAO_URL_CREATE}> */}
        <SocialButton src={'/img/kakao_login_button.png'} onClick={kakaoLogin} />
      {/* </a> */}
      {/* <a> */}
        <SocialButton src={'/img/google_login_button.png'} />
      {/* </a> */}
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
  font-weight: 800;
  text-size-adjust: none;
  font-family: campton, "Apple SD Gothic Neo", NanumBarunGothic, 나눔바른고딕, "Malgun Gothic", "맑은 고딕", dotum, sans-serif;;
  padding : 0;
`;

const SignInSubtitle = styled.div`
  font-size : 12px;
  text-size-adjust: none;
  font-family: campton, "Apple SD Gothic Neo", NanumBarunGothic, 나눔바른고딕, "Malgun Gothic", "맑은 고딕", dotum, sans-serif;;
  padding: 10px 0 10%;
`;

const SignInInput = styled.input`
  font-family: campton, "Apple SD Gothic Neo", NanumBarunGothic, 나눔바른고딕, "Malgun Gothic", "맑은 고딕", dotum, sans-serif;
  text-size-adjust: none;
  font-size: 12px; 
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
  color: white;
  font-weight: 600;
  font-size: 14px;
  line-height: 25px;
  border: 0.1px solid #c3dbff;
  border-radius: 8px;
  background-color : #1d1d1d;
  margin : 10px 0 10px;
`;

//회원가입 | 아이디 및 비밀번호 찾기
const OtherButton = styled.button`
  font-family: campton, "Apple SD Gothic Neo", NanumBarunGothic, 나눔바른고딕, "Malgun Gothic", "맑은 고딕", dotum, sans-serif;;
  margin : 5px 6% ;
  font-weight: 200;
  font-size: 12px;
  line-height: 10px;
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