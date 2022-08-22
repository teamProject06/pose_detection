import React, {useEffect, useState} from 'react';
import CamComponent from '../components/feedback/CamComponent';
import FeedbackComponent from '../components/feedback/FeedbackComponent';
import styled from 'styled-components'
import Loader from '../components/Loader';

const Feedback = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(()=> {
      return setIsLoading(false)
    }, 2500)
  }, [])

  return (
    <>
    {isLoading && <Loader />}
    {!isLoading &&<Container>
    <H2>Feedback</H2>
    <FeedbackContainer>
      <CamComponent />
      <FeedbackComponent />
    </FeedbackContainer>
    </Container>}
    </>
  )
}

const Container = styled.section`
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  margin: 2em 4rem 0;
  border-radius: 15px;
  padding: 3em 4em ;
  margin-bottom: 150px;
`

const FeedbackContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
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