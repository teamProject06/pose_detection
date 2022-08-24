import React, { useState } from 'react';
import styled from 'styled-components';
import MypagePose from '../components/mypage/MyPagePose';
import { theme } from "../../src/theme";

const MyFeedback = () => {
    // const [isClick, setIsClick] = useState({
    //     'myPageRoutine': false,
    //     'myPagePose': false,
    //   })
    
    //   //const [currentClick, setCurrentClick] = useState(null);
    
    //   const GetClick = (e) => {
    //       let current = document.getElementById(e.target.id);
    
    //         if( e.target.id === "1"){
    //           let othercurrent = document.getElementById("2");
    //           setIsClick({
    //             ...isClick,
    //             myPageRoutine: true,
    //             myPagePose: false
    //           })
    
    //           current.style.backgroundColor = '#061673';
    //           current.style.color = 'white';
    //           othercurrent.style.backgroundColor = '#f6f8fa';
    //           othercurrent.style.color = 'black';
    //         }else if( e.target.id === "2"){
    //           setIsClick({
    //             ...isClick,
    //             myPageRoutine: false,
    //             myPagePose: true
    //           })
    //           let othercurrent = document.getElementById("1");
    
    //           current.style.backgroundColor = '#061673';
    //           current.style.color = 'white';
    //           othercurrent.style.backgroundColor = '#f6f8fa';
    //           othercurrent.style.color = 'black';
    //         }
          
    //   };
          
    
      return (
        <Container>
          <Title>MY PAGE</Title>
          <p className='subTitle'>내 자세 피드백</p>
    
          <button className='menu' id="1" onClick={()=>{}}>My Routine</button>
          <button className='menu' id="2" onClick={()=>{}}>My Pose</button>
          {/* {isClick.myPagePose && <MypagePose />} */}
         
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
    
    // const Boxing = styled.div`
    // border-radius: 20px;
    // background-color: ${theme.colors.pointColor};
    // `;
     

export default MyFeedback;
