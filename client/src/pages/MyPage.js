import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useCookies } from "react-cookie";
import { useNavigate, useLocation, Link } from 'react-router-dom';


const MyPage = () => {

  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["userInfo"]);

  // home 화면으로 가기
  useEffect(() => {
    if (cookies.userInfo === undefined) {
  }else{
  }

console.log("Cookies >> ", cookies.userInfo);
}, [cookies]);
 

  return (
    <Container>
      <Title>MY PAGE</Title>
      <p className='subTitle'>내 계정 정보</p>

      <p className='maincontent'>이메일 : {cookies.userInfo.email}</p>
      <p className='maincontent'>이름 : {cookies.userInfo.name}</p>
      <OtherButton onClick={() => navigate("/findpw")}>비밀번호 변경</OtherButton>
    </Container>
  )
}

const Container = styled.div`
  text-align : center;
  width: 90%;
  min-width: 500px;
  margin: 0 auto;

 
  .subTitle{
  font-size : 14px;
  font-weight: 600;
  color: black;
  text-size-adjust: none;
  font-family: campton, "Apple SD Gothic Neo", NanumBarunGothic, 나눔바른고딕, "Malgun Gothic", "맑은 고딕", dotum, sans-serif;
  margin-bottom: 10%;
  margin-top: 1%;
  }

  .maincontent{
  font-size : 14px;
  font-weight: 600;
  color: black;
  text-size-adjust: none;
  font-family: campton, "Apple SD Gothic Neo", NanumBarunGothic, 나눔바른고딕, "Malgun Gothic", "맑은 고딕", dotum, sans-serif;
  margin-bottom: 1%;
  }

`;

const Title = styled.div`
  font-size : 20px;
  font-weight: 700;
  text-size-adjust: none;
  font-family: campton, "Apple SD Gothic Neo", NanumBarunGothic, 나눔바른고딕, "Malgun Gothic", "맑은 고딕", dotum, sans-serif;;
  margin-bottom: 1%;
  margin-top: 5%;
`;

//비밀번호 찾기 
const OtherButton = styled.button`
  font-family: campton, "Apple SD Gothic Neo", NanumBarunGothic, 나눔바른고딕, "Malgun Gothic", "맑은 고딕", dotum, sans-serif;;
  margin : 5px 6% ;
  font-weight: 200;
  font-size: 12px;
  line-height: 10px;
  border: 2px solid #ffffff;
  margin-bottom: 5%;
`;



export default MyPage;