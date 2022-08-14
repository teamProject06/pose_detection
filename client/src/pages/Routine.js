import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MyRoutine from '../components/routine/MyRoutine';
import UserRoutine from '../components/routine/UserRoutine';


const Routine = () => {
  const [isClick, setIsClick] = useState({
    'myRoutine': false,
    'userRoutine': false,
  })

  useEffect(() => {
    console.log(isClick)
  }, [isClick])

  const clickMyRoutineAdd = () => {
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
      userRoutine: true,
    })
  }

  return (
    <Container>
      <div className='title'>운동 루틴</div>
      <Parent>
        <button type="button" onClick={clickMyRoutineAdd} className="my-routine Div">
          루틴 등록
        </button>
        <button type="button" onClick={clickOtherRoutine} className="other-routine Div">
          회원 루틴
        </button>
        </Parent>
        <Parent>
        <RoutineContainer>
          <Left>{isClick.myRoutine && <MyRoutine />}</Left>
          <Right>{isClick.userRoutine && <UserRoutine />}</Right>
        </RoutineContainer>
      </Parent>
    </Container>
  );
}

const Left = styled.div`
  width : 50%;
  float :left
`
const Right = styled.div`
  width : 50%;
  float :right
`

const Container = styled.section`
  text-align : center;
  max-width: 80%;
  height: 100%;
  margin: 0 10%;
.title{
  font-size : 20px;
  text-size-adjust: none;
  font-family: campton, "Apple SD Gothic Neo", NanumBarunGothic, 나눔바른고딕, "Malgun Gothic", "맑은 고딕", dotum, sans-serif;;
  margin-bottom: 3%;
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
  font-weight: 500;
  font-size: 15px;
  padding: 15px;
  border-radius: 8px;
  background-color : #c3dbff;
  margin-left: 10px;
  margin-right: 10px;
}
`
const RoutineContainer = styled.div`
width : 100%;
height: 300px;`

// const GlobalStyle = createGlobalStyle`
//       body {
//         background-color: #c3dbff;
//       }
//       `

export default Routine