import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MyRoutine from '../components/routine/MyRoutine';
import OtherRoutine from '../components/routine/OtherRoutine';

const dummy = [
  {
    'nickName': 'user1',
    'date': 'user1',
    'routine': 'user1',
  },
  {
    'nickName': 'user2',
    'date': 'user1',
    'routine': 'user1',
  },
  {
    'nickName': 'user3',
    'date': 'user1',
    'routine': 'user1',
  },
]

const Routine = () => {
  const [isClick, setIsClick] = useState({
    'myRoutine': false,
    'otherRoutine': false,
  }) 

  useEffect(() => { 
    console.log(isClick)
  }, [isClick])

  const clickMyRoytineAdd = () => { 
    console.log(
      'dsda')
    setIsClick({
      ...isClick,
      myRoutine: true,
    })
  }

  const clickOtherRoutine = () => { 
    setIsClick({
      ...isClick,
      otherRoutine: true,
    })
  }

  return (
      <Container>
        <div className='title'>운동 루틴</div>
        <Parent>
            <button type="button" onClick={clickMyRoytineAdd} className="my-routine Div">
                루틴 등록
            </button>
            <button type="button" onClick={clickOtherRoutine} className="other-routine Div">
                회원 루틴
            </button>
            <RoutineContainer>
            {isClick.myRoutine &&<MyRoutine />}
            {isClick.otherRoutine && <OtherRoutine />}
            </RoutineContainer>
          </Parent>
      </Container>
  );
}

const Container = styled.section`
  text-align : center;
  max-width: 500px;
  margin: 0 auto;

.title{
  font-size : 30px;
  text-size-adjust: none;
  font-family: campton, "Apple SD Gothic Neo", NanumBarunGothic, 나눔바른고딕, "Malgun Gothic", "맑은 고딕", dotum, sans-serif;;
  padding: 20% 0 0;
  margin-bottom: 10%;
}
`;

const Parent = styled.div`
display: flex;
height: 80px;

.Div{
  font-family: campton, "Apple SD Gothic Neo", NanumBarunGothic, 나눔바른고딕, "Malgun Gothic", "맑은 고딕", dotum, sans-serif;;
  width: 50%;
  height : 45px;
  color: #1d1d1d;
  font-weight: 600;
  font-size: 15px;
  padding: 15px;
  border-radius: 8px;
  background-color : #c3dbff;
  margin-left: 10px;
  margin-right: 10px;
}
`
const RoutineContainer = styled.article``;

export default Routine