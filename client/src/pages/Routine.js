import React, { useState } from 'react';
import styled from 'styled-components';
import MyRoutine from '../components/routine/MyRoutine';
import UserRoutine from '../components/routine/UserRoutine';
import Sidebar from '../components/routine/Sidebar';
import AddRoutineItem from '../components/routine/AddRoutineItem';

const Routine = () => {
  
  return (
    <Container>
      <div className='title'>운동 루틴</div>
      <RoutineContainer>
        <Sidebar />
        <Left>
          <MyRoutine />
          <UserRoutine/>
        </Left>
        <Right>
          < AddRoutineItem />
        </Right>
      </RoutineContainer>
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
  margin-bottom: 40%;

  .title{
    font-size : 20px;
    font-weight: 700;
    text-size-adjust: none;
    font-family: campton, "Apple SD Gothic Neo", NanumBarunGothic, 나눔바른고딕, "Malgun Gothic", "맑은 고딕", dotum, sans-serif;;
    margin-bottom: 3%;
  }
  `;

const RoutineContainer = styled.div`
margin-top : 5%;
width : 100%;
height: 100%;
`

// const GlobalStyle = createGlobalStyle`
//       body {
  //         background-color: #c3dbff;
  //       }
  //       `
  
  {/* <Parent>
  <button type="button" onClick={clickMyRoutineAdd} className="my-routine Div">
  루틴 등록
  </button>
  <button type="button" onClick={clickOtherRoutine} className="other-routine Div">
  회원 루틴
  </button>
</Parent> */}

// const Center = styled.div`
//   width : 70%;
//   margin : 0 auto;
//   `

// useEffect(() => {
  //   console.log(isClick)
  // }, [isClick])
  
  // const clickMyRoutineAdd = () => {
    //   setIsClick({
      //     ...isClick,
      //     myRoutine: true,
      //   })
      // }
      
      // const clickOtherRoutine = () => {
        //   setIsClick({
          //     ...isClick,
          //     userRoutine: true,
          //   })
          // }

          // const [isClick, setIsClick] = useState({
          //   'myRoutine': false,
          //   'userRoutine': false,
          // })

export default Routine