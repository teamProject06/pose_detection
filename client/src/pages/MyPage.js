import React from 'react';
import styled from 'styled-components';

const MyPage = () => {
  return (
    <Container>
      <Title>My Page</Title>
      <Parent>
        <Div>운동루틴</Div>
        <Div>결과 및 피드백</Div>
        <Div>시간(초) 및 횟수(회)</Div>
      </Parent>
    </Container>
  )
}

const Container = styled.div`
  display : block;
  text-align : center;
  max-width: 500px;
  margin: 0 auto;
  padding: 50px 10px;
`;

const Title = styled.div`
  font-size : 30px;
  text-size-adjust: none;
  font-family: campton, "Apple SD Gothic Neo", NanumBarunGothic, 나눔바른고딕, "Malgun Gothic", "맑은 고딕", dotum, sans-serif;;
  padding: 20% 0 0;
  margin: 10%;
`;

const Parent = styled.div`
display: flex;
height: 200px;
`

const Div = styled.div`
  font-family: campton, "Apple SD Gothic Neo", NanumBarunGothic, 나눔바른고딕, "Malgun Gothic", "맑은 고딕", dotum, sans-serif;;
  width: 40%;
  height : 45px;
  color: #1d1d1d;
  font-weight: 600;
  font-size: 15px;
  padding: 15px;
  border-radius: 8px;
  background-color : #c3dbff;
  margin-left: 10px;
  margin-right: 10px;
`;


export default MyPage;