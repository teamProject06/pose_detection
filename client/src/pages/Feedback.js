import React from 'react';
import CamComponent from '../components/feedback/CamComponent';
import FeedbackComponent from '../components/feedback/FeedbackComponent';
import styled from 'styled-components'

const Feedback = () => {
  return (
    <Container>
    <H2>Feedback</H2>
    <FeedbackContainer>
      <CamComponent />
      <FeedbackComponent />
    </FeedbackContainer>
    </Container>
  )
}

const Container = styled.section`
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  margin: 2em 4rem 0;
  border-radius: 15px;
  padding: 2em 2.5em 2em;

`

const FeedbackContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const H2 = styled.h2`
  display: inline-block;
  margin-bottom: 1em;
  padding-bottom: .4em;
  font-size: 22px;
  font-weight: 600;
  border-bottom: 1px solid black;
`;

export default Feedback