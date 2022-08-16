import React,{ useState } from 'react';
import styled from 'styled-components';
import { useCookies } from "react-cookie";
import mypage from "../data/mypage.json";


const MyPage = () => {

  const [cookies, setCookie, removeCookie] = useCookies(["userInfo"]);

  const [mypageData, setMypageData] = useState(mypage); //데이터 배열([])로 받아오기

  return (
    <Container>
      <Title>MY PAGE</Title>
      <p className='subTitle'>내 운동 정보</p>

      <Parent>
          <Div>운동루틴</Div>
          <Div>결과</Div>
          <Div2>상체 피드백</Div2>
          <Div2>상세 피드백</Div2>
      </Parent>
          {
            mypageData.map((it, index) => (
              <div className='boxing' key={index}>
                <p className='list'>{it.exercise}</p>
                <p className='list'>{it.result}</p>
                <p className='list2'>{it.feedback_title}</p>
                <p className='list2'>{it.feedback_detail}</p>
              </div>
              ))
          }
    </Container>
  )
}

const Container = styled.div`
  text-align : center;
  width: 80%;
  min-width: 500px;
  margin: 0 auto;

  .boxing{
    display: flex;
    height: 80px;
  }

  .list{
    font-family: campton, "Apple SD Gothic Neo", NanumBarunGothic, 나눔바른고딕, "Malgun Gothic", "맑은 고딕", dotum, sans-serif;;
  width: 50%;
  height : 45px;
  color: black;
  font-weight: 600;
  font-size: 15px;
  padding: 15px;
  margin-left: 10px;
  margin-right: 10px;
  }
  .list2{
    font-family: campton, "Apple SD Gothic Neo", NanumBarunGothic, 나눔바른고딕, "Malgun Gothic", "맑은 고딕", dotum, sans-serif;;
  width: 80%;
  height : 45px;
  color: black;
  font-weight: 600;
  font-size: 15px;
  padding: 15px;
  margin-left: 10px;
  margin-right: 10px;
  }

  .subTitle{
  font-size : 14px;
  font-weight: 600;
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

const Parent = styled.div`
display: flex;
height: 80px;
`

const Div = styled.div`
  font-family: campton, "Apple SD Gothic Neo", NanumBarunGothic, 나눔바른고딕, "Malgun Gothic", "맑은 고딕", dotum, sans-serif;;
  width: 50%;
  height : 45px;
  color: black;
  font-weight: 600;
  font-size: 15px;
  padding: 15px;
  border-bottom: 3px solid black;
  margin-left: 10px;
  margin-right: 10px;
`;

const Div2 = styled.div`
  font-family: campton, "Apple SD Gothic Neo", NanumBarunGothic, 나눔바른고딕, "Malgun Gothic", "맑은 고딕", dotum, sans-serif;;
  width: 80%;
  height : 45px;
  color: black;
  font-weight: 600;
  font-size: 15px;
  padding: 15px;
  border-bottom: 3px solid black;
  margin-left: 10px;
  margin-right: 10px;
`;

export default MyPage;