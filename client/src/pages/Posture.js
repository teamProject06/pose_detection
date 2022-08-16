import React from 'react';
import styled from 'styled-components';
import PostureForm from '../components/PostureForm';

const Posture = () => {

  return (
    <Container>
      <Title>자세 교정</Title>
      <p className='subTitle'>원하는 운동을 선택하세요.</p>
      <p className='subTitle'>운동 클릭 시, 자세 교정이 시작됩니다.</p>
      {
        <div>
            <PostureForm />
        </div>
       }
    </Container>
  )
}

const Container = styled.div`
  text-align : center;
  width: 80%;
  height: 80%;
  min-width: 500px;
  margin: 0 auto;

  .subTitle{
  font-size : 14px;
  font-weight: 600;
  color: black;
  text-size-adjust: none;
  font-family: campton, "Apple SD Gothic Neo", NanumBarunGothic, 나눔바른고딕, "Malgun Gothic", "맑은 고딕", dotum, sans-serif;;
  margin-bottom: 2%;
  margin-top: 1%;
  }
`;

const Title = styled.div`
  font-size : 20px;
  font-weight: 700;
  color: black;
  text-size-adjust: none;
  font-family: campton, "Apple SD Gothic Neo", NanumBarunGothic, 나눔바른고딕, "Malgun Gothic", "맑은 고딕", dotum, sans-serif;;
  margin-bottom: 5%;
  margin-top: 5%;
`;

export default Posture;
