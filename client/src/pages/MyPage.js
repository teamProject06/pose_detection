import React,{ useState } from 'react';
import styled from 'styled-components';
import { useCookies } from "react-cookie";
import mypage from "../data/mypage.json";


const MyPage = () => {

  const [cookies, setCookie, removeCookie] = useCookies(["userInfo"]);

  const [mypageData, setMypageData] = useState(mypage); //데이터 배열([])로 받아오기

  return (
    <Container>
      <Title>My Page</Title>

      <Parent>
          <Div>운동루틴</Div>
          <Div2>피드백</Div2>
          <Div>시간 및 횟수</Div>
      </Parent>
          {
            mypageData.map((it, index) => (
              <div className='boxing' key={index}>
                <p className='list'>{it.exercise}</p>
                <p className='list2'>{it.feedback}</p>
                <p className='list'>{it.count}</p>
              </div>
              ))
          }
    </Container>
  )
}

const Container = styled.div`
  text-align : center;
  max-width: 500px;
  margin: 0 auto;

  .boxing{
    display: flex;
    height: 80px;
  }

  .list{
    font-family: campton, "Apple SD Gothic Neo", NanumBarunGothic, 나눔바른고딕, "Malgun Gothic", "맑은 고딕", dotum, sans-serif;;
    width: 40%;
    height : 10px;
    font-weight: 500;
    font-size: 15px;
    padding: 15px;
    border-radius: 8px;
  }
  .list2{
    font-family: campton, "Apple SD Gothic Neo", NanumBarunGothic, 나눔바른고딕, "Malgun Gothic", "맑은 고딕", dotum, sans-serif;;
    width: 70%;
    height : 10px;
    font-weight: 500;
    font-size: 15px;
    padding: 15px;
    border-radius: 8px;
  }
`;

const Title = styled.div`
  font-size : 30px;
  text-size-adjust: none;
  font-family: campton, "Apple SD Gothic Neo", NanumBarunGothic, 나눔바른고딕, "Malgun Gothic", "맑은 고딕", dotum, sans-serif;;
  padding: 20% 0 0;
  margin-bottom: 10%;
`;

const Parent = styled.div`
display: flex;
height: 80px;
`

const Div = styled.div`
  font-family: campton, "Apple SD Gothic Neo", NanumBarunGothic, 나눔바른고딕, "Malgun Gothic", "맑은 고딕", dotum, sans-serif;;
  width: 50%;
  height : 45px;
  color: white;
  font-weight: 600;
  font-size: 15px;
  padding: 15px;
  border-radius: 8px;
  background-color : black;
  margin-left: 10px;
  margin-right: 10px;
`;

const Div2 = styled.div`
  font-family: campton, "Apple SD Gothic Neo", NanumBarunGothic, 나눔바른고딕, "Malgun Gothic", "맑은 고딕", dotum, sans-serif;;
  width: 80%;
  height : 45px;
  color: white;
  font-weight: 600;
  font-size: 15px;
  padding: 15px;
  border-radius: 8px;
  background-color : black;
  margin-left: 10px;
  margin-right: 10px;
`;

export default MyPage;