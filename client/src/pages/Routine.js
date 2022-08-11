import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MyRoutine from '../components/routine/MyRoutine';
import OtherRoutine from '../components/routine/OtherRoutine';
import ToRoutin from '../components/routine/ToRoutin';

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
          <button type="button" onClick={clickMyRoytineAdd} className="my-routine">
              루틴 등록
          </button>
          <button type="button" onClick={clickOtherRoutine} className="other-routine">
              회원 루틴
          </button>
          <RoutineContainer>
          {/* {isClick.myRoutine &&<MyRoutine />} */}
          {isClick.myRoutine &&<ToRoutin />}
          {isClick.otherRoutine && <OtherRoutine />}
          </RoutineContainer>
      </Container>
  );
}

const Container = styled.section`

`;

const RoutineContainer = styled.article``;

export default Routine