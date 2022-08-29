import React from 'react';
import RoutineCalendar from '../components/RoutineCalendar';
import styled from 'styled-components';

const MyCalendar = () => {
  return (
    <Container>
      <h1>루틴 캘린더</h1>
      <RoutineCalendar />
    </Container>
  )
}

const Container = styled.section`
  margin-top: 3em;
  h1 {
    text-align: center;
    font-size: 20px;
  }
`;

export default MyCalendar
