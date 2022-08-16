import React, { useState } from 'react';
import styled from 'styled-components';
import { useCookies } from "react-cookie";
import Feedback1 from './Feedback1';
import Feedback2 from './Feedback2';
import $ from 'jquery';
import axios from 'axios';
import port from "../../data/port.json"; //url

const MyPagePose = () => {

    const [cookies, setCookie, removeCookie] = useCookies(["userInfo"]);

    const [content, setContent] = useState();

  const handleClickButton = e => {
      const { name } = e.target;
      setContent(name);
  };

  const selectComponent = {
    first: <Feedback1 />,
    second: <Feedback2 />
  };

  return (
    <Container>
        {
            <div>
                    {selectComponent[content]}
            </div>
        }
        <div className='head'>
            <p className='box'>POSE</p>
            <p className='box'>SCORE</p>
            <p className='box'>FITBACK</p>
        </div>
        <div className='parent'>
            <span className='box'>스쿼트</span>
            <span className='box'>GOOD</span>
            <span className='box'>
                <div id="btnGroup">
                    <button id="btn1" onClick={handleClickButton} name={'first'}>상체 피드백</button>
                    <button id="btn2" onClick={handleClickButton} name={'second'}>상세 피드백</button>
                </div>
            </span>
        </div>
        
        <div className='parent'>
            <span className='box'>런지</span>
            <span className='box'>BAD</span>
            <span className='box'>
                <div id="btnGroup">
                    <button id="btn1" onClick={handleClickButton} name={'first'}>상체 피드백</button>
                    <button id="btn2" onClick={handleClickButton} name={'second'}>상세 피드백</button>
                </div>
            </span>
        </div>
    </Container>
  )
}

const Container = styled.div`

.head{
    display: flex;
    text-align : center;
  width: 60%;
  padding: 10px;
  padding-bottom: 20px;
  min-width: 500px;
  margin: 0 auto;
  margin-bottom: 2px;
  font-size : 14px;
  font-weight: 600;
  //border-bottom: 1px grey solid;
}

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

/* span:nth-child(n+2) {
    position: relative;
    margin-left: 5px;
    padding-left: 10px;
}

span:nth-child(n+2)::after {
    position: absolute;
    left: 0;
    top: 0;
    content: "";
    width: 1px;
    height: 30px;
    background-color: grey;
} */

#btnGroup button{
    border: 1px solid grey;
    background-color: rgba(0,0,0,0);
    color: black;
    padding: 10px;
    margin-top: -10px;
}
#btnGroup button:hover{
    color: white;
    background-color: black;
}
#btn1{
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    margin-right: -1px;
}
#btn2{
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
}



`;


export default MyPagePose;
