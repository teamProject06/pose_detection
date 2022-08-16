import React,{ useState, useEffect } from 'react';
import styled from 'styled-components';
import { useCookies } from "react-cookie";
import $ from 'jquery';
import axios from 'axios';
import port from "./../data/port.json"; //url
//import mypage from "../data/mypage.json";
import MypagePose from '../components/mypage/MyPagePose';
import MyPageRoutine from '../components/mypage/MyPageRoutine';


const MyPage = () => {

  return (
    <Container>
      <Title>MY PAGE</Title>
      <p className='subTitle'>내 운동 정보</p>

      <BOX>
      <p className='subTitle2 line'>나의 루틴</p>
      </BOX>
      <MyPageRoutine/>

      <BOX>
        <p className='subTitle2 line mt'>나의 자세</p>
      </BOX>
      <MypagePose/>

     
    </Container>
  )
}

const Container = styled.div`
  text-align : center;
  width: 90%;
  min-width: 500px;
  margin: 0 auto;

  .subTitle2{
  font-size : 14px;
  font-weight: 600;
  color: white;
  text-size-adjust: none;
  font-family: campton, "Apple SD Gothic Neo", NanumBarunGothic, 나눔바른고딕, "Malgun Gothic", "맑은 고딕", dotum, sans-serif;;
  margin-bottom: 10%;
  margin-top: 1%;
  }
  .subTitle{
  font-size : 14px;
  font-weight: 600;
  color: white;
  text-size-adjust: none;
  font-family: campton, "Apple SD Gothic Neo", NanumBarunGothic, 나눔바른고딕, "Malgun Gothic", "맑은 고딕", dotum, sans-serif;;
  margin-bottom: 3%;
  margin-top: 1%;
  }

  .line{
    /* border-bottom: 2px grey solid;
    border-top: 2px grey solid; */
    background-color: black;
    width: 10%;
    padding-top: 10px;
    padding-bottom: 10px;
    margin: 0 auto;
  }

  .mt{
    margin-top: 7%;
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

const BOX = styled.div`
box-sizing: border-box;
width : 100%;   
margin-bottom: 2%;
`;



export default MyPage;