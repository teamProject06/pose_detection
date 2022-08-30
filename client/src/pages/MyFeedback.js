import React, { useState } from 'react';
import styled from 'styled-components';
import MypagePose from '../components/mypage/MyPagePose';
import { theme } from "../../src/theme";

const MyFeedback = () => {
   
      return (
        <Container>
          <Title>MY FITBACK</Title>
          <p className='subTitle'>내 자세교정에 대한 지난 피드백을 확인할 수 있습니다.</p>
          <MypagePose/>
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
    
    `;
    
    const Title = styled.div`
      font-size : 20px;
      font-weight: 700;
      text-size-adjust: none;
      font-family: campton, "Apple SD Gothic Neo", NanumBarunGothic, 나눔바른고딕, "Malgun Gothic", "맑은 고딕", dotum, sans-serif;;
      margin-bottom: 1%;
      margin-top: 5%;
    `;
    
     

export default MyFeedback;
