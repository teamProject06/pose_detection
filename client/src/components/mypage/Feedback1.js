import React from 'react';
import styled from 'styled-components';

const Feedback1 = () => {
    
  return (
    <Container>
        <div className='parent'>
            <div className='box'>
                <p>상체 피드백 내용</p>
            </div>
        </div>
    </Container>
  )
}

const Container = styled.div`

  .parent{
    display: flex;
    text-align : center;
    width: 60%;
    border: 1px grey solid;
    border-radius: 10px;
    padding: 10px;
    padding-top: 50px;
    padding-bottom: 50px;
    min-width: 500px;
    margin: 0 auto;
    margin-bottom: 15px;
  }

  .box{
    float: left;
    width: 30%;
    margin: 10px;
    margin: 0 auto;
  }

`;

export default Feedback1;
