import React from 'react';
import styled from 'styled-components';

const Feedback1 = (props) => {
  {
    props.map((it, i) =>{
      return (
        <Container>
            <div className='parent'>
                <div className='box'>
                    <p>{it[i].part} : {it[i].feedback}</p>
                </div>
            </div>
        </Container>
      )
    })
  } 
}

const Container = styled.div`


  .parent{
    display: flex;
    text-align : center;
    width: 80px;
    border: 1px grey solid;
    border-radius: 10px;
    padding: 10px;
    padding-bottom: 50px;
    min-width: 500px;
    margin-bottom: 15px;
  }

  .box{
    float: left;
    width: 100%;
    margin: 10px;
    margin: 0 auto;
  }

`;

export default Feedback1;
