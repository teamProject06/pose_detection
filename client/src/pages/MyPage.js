import React,{ useState, useEffect } from 'react';
import styled from 'styled-components';
import { useCookies } from "react-cookie";
import $ from 'jquery';
import axios from 'axios';
import port from "./../data/port.json"; //url
//import mypage from "../data/mypage.json";
import MypagePose from '../components/mypage/MyPagePose';
import MyPageRoutine from '../components/mypage/MyPageRoutine';
import { theme } from "../../src/theme";


const MyPage = () => {
  const [isClick, setIsClick] = useState({
    'myPageRoutine': false,
    'myPagePose': false,
  })

  const [currentClick, setCurrentClick] = React.useState(null);

  const GetClick = (e) => {
      setCurrentClick(e.target.id);

      if (currentClick !== null) {
        let current = document.getElementById(currentClick);

        if( currentClick === "1"){
          let othercurrent = document.getElementById("2");
          setIsClick({
            ...isClick,
            myPageRoutine: true,
            myPagePose: false
          })

          current.style.backgroundColor = '#061673';
          current.style.color = 'white';
          othercurrent.style.backgroundColor = '#f6f8fa';
          othercurrent.style.color = 'black';
        }else if( currentClick === "2"){
          setIsClick({
            ...isClick,
            myPageRoutine: false,
            myPagePose: true
          })
          let othercurrent = document.getElementById("1");

          current.style.backgroundColor = '#061673';
          current.style.color = 'white';
          othercurrent.style.backgroundColor = '#f6f8fa';
          othercurrent.style.color = 'black';
        }
      }
  };
      

  return (
    <Container>
      <Title>MY PAGE</Title>
      <p className='subTitle'>내 운동 정보</p>

      <button className='menu' id="1" onClick={GetClick}>나의 루틴</button>
      <button className='menu' id="2" onClick={GetClick}>나의 자세</button>
      {isClick.myPageRoutine && <MyPageRoutine />}
      {isClick.myPagePose && <MypagePose />}
     
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
  font-family: campton, "Apple SD Gothic Neo", NanumBarunGothic, 나눔바른고딕, "Malgun Gothic", "맑은 고딕", dotum, sans-serif;;
  margin-bottom: 10%;
  margin-top: 1%;
  }

  .menu {
    display: inline-block;
    width: 40%;
    height: 55px;
    line-height: 60px;
    text-align: center;
    font-size: 19px;
    border-radius: 20px 20px 0px 0px;
    background-color: ${theme.colors.grey};
    color: ${theme.colors.black};
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




export default MyPage;