import React from 'react';
import CamComponent from '../components/feedback/CamComponent';
import FeedbackComponent from '../components/feedback/FeedbackComponent';
import styled from 'styled-components'

const Feedback = () => {
  return (
    <FeedbackContainer>
      <CamComponent />
      <FeedbackComponent />
    </FeedbackContainer>
  )
}

const FeedbackContainer = styled.section`
  display: flex;
  max-width: 1080px;
  justify-content: center;
  align-items: center;
`;

export default Feedback