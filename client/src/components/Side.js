import React from 'react';
import { Link } from 'react-scroll';
import styled from 'styled-components';

const Side = () => {
    return (
      <SideBlock>
        <div>
          <Link to="1" spy={true} smooth={true}>
            <span>자세교정</span>
          </Link>
          <br />
          <Link to="2" spy={true} smooth={true}>
            <span>운동루틴</span>
          </Link>
        </div>
      </SideBlock>
    );
  };


const SideBlock = styled.div`
  width: 20%;
  position: fixed;
  margin-top: 100px;
  margin-left: 3%;
  justify-content: center;
  align-items: center;
  
  div {
    display: flex;
    flex-direction: column;
  }

  span {
    cursor: pointer;
  }

  span:hover{
    color: grey;
  }
`;

export default Side;