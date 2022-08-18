import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-scroll';
import PostureForm from './PostureForm';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaVideo } from "react-icons/fa";
import { FaRulerHorizontal } from "react-icons/fa";
import { FaRulerCombined } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { FaComment } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa";

const Middle = () => {
  const [content, setContent] = useState();

  const handleClickButton = e => {
      const { name } = e.target;
      setContent(name);
  };

  const selectComponent = {
    first: <PostureForm />,
  };

  return (
    <MiddleBlock>

            <div id="1">
              {/* 영상 반복 재생 */}
                <div className="inner bg-1">
                <p className='b1'>
                헬스 3대 동작을 보다 정확하게 분석.<br/><br/>
                내 동작에 대한 명확한 피드백과 가장 올바른 운동의 완성.<br/><br/><br/><br/><br/>
                <Link className="span" to="2" spy={true} smooth={true}><a href="/routine"><button className="button button--winona button--border-thick button--round-l button--text-upper button--size-s button--text-thick" data-text="이용설명"><span>이용설명</span></button></a></Link>
                <Link className="span" to="3" spy={true} smooth={true}><a href="/posecam" ><button className="button button--winona button--border-thick button--round-l button--text-upper button--size-s button--text-thick" data-text="운동하기"><span>운동하기</span></button></a></Link></p>
                  <video loop autoPlay="autoPlay" muted="muted">
                    <source src="./img/run.mp4" type="video/mp4"></source>
                  </video>
                </div>
            </div>


            <div id="2">
                <div id="myCarousel" className="inner bg-3 carousel slide" data-bs-ride="carousel">

                    <div className="carousel-indicators">
                    <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" aria-label="Slide 1" className="active"></button>
                    <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2" className=""></button>
                    <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3" className=""></button>
                    </div>

                    <div className="carousel-inner">

                    <div className="carousel-item innerH">
                        <div className="container">
                        <svg className="" width="100%" height="100%" xmlns="" focusable="false"><rect fill=""></rect></svg>
                        <div className="carousel-caption text-start">
                            <h1> <p className='font'>FITBACK 이용방법</p><br/><br/></h1>
                            <p><FaVideo />&nbsp; 반드시 웹캠을 켜주세요.&nbsp;(녹화를 통해 자세를 분석합니다.)<br/><br/></p>
                            <p><FaRulerHorizontal/>&nbsp; 웹캠과의 거리는 2m 이상 유지해주세요. <br/><br/></p>
                            <p><FaRulerCombined />&nbsp; 캠에 전신이 다 나오게 해주세요.&nbsp;(왼쪽 45도 방면으로 서주세요.)<br/><br/><br/></p>
                        </div>
                        </div>
                    </div>

                    <div className="carousel-item active innerH">
                        <div className="container">
                        <svg className="" width="100%" height="100%" xmlns=""   focusable="false"><rect fill="#b6d8f2"></rect></svg>
                        <div className="carousel-caption text-start ">
                            <h1><p className='font'>자세교정</p><br/><br/></h1>
                            <p>교정하고 싶은 자세를 선택하여 자세 피드백을 받으세요.<br/><br/><br/></p>
                            <p><FaCheck />&nbsp; 교정할 자세를 선택할 수 있어요. <br/><br/></p>
                            <p><FaComment />&nbsp; 나의 자세에 대한 피드백을 받을 수 있어요.<br/><br/><br/></p>
                        </div>
                        </div>
                    </div>

                    <div className="carousel-item innerH">

                        <div className="container">
                        <svg className="" width="100%" height="100%" xmlns=""  focusable="false"><rect fill="#b6d8f2"></rect></svg>
                        <div className="carousel-caption text-start">
                            <h1><p className='font'>운동루틴</p><br/><br/></h1>
                            <p>원하는 운동을 선택하고 나만의 운동 루틴을 기록하세요.<br/><br/><br/></p>
                            <p><FaPlus/>&nbsp;   나만의 운동루틴을 생성할 수 있어요. <br/><br/></p>
                            <p><FaBookOpen />&nbsp; 다른 회원의 운동루틴을 볼 수 있어요. <br/><br/><br/></p>
                        </div>
                        </div>
                    </div>

                    </div>

                    <button className="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>

            <div id="3">
                <div className="inner bg-2">
                    <div className="innerM2">
                    <h1><p className='font'>원하는 운동을 선택하세요.</p><br/><br/></h1>
                    {
                      <div>
                        {selectComponent[content]}
                      </div>
                    }

                    <button className="button button--winona button--border-thick button--round-l button--text-upper button--size-s button--text-thick" data-text="자세교정"
                    onClick={handleClickButton} name={'first'}><span>자세교정</span></button>
                    <a href="/routine/routinecreate" ><button className="button button--winona button--border-thick button--round-l button--text-upper button--size-s button--text-thick" data-text="운동루틴"><span>운동루틴</span></button></a>
                    </div>
                </div>
            </div>
    </MiddleBlock>
  );
};

const MiddleBlock = styled.div`
  .inner {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  overflow-x:hidden; overflow-y: hiiden;
  }
  
  .bg-1 {
    //background-color: #b6d8f2;
    overflow: hidden;
    position: relative;
    color: white;
  }

  .b1{
    position: absolute;
    float: left;
    left: 10%;
  }
  
  .bg-2 {
    //background-color: black;
    background-image: url("/img/background2.jpg");
    background-size: cover;
  }

  .bg-3 {
    background-image: url("/img/background.jpg");
    background-size: cover;
  }

  .innerH{
    height: 300px;
  }

  .innerM2{
    justify-content: center;
    text-align: center;
    color: white;
    font-size: 1.1rem;
  }

  .font{
    font-weight: bold;
    font-size: 1.3rem;
  }




  
  /* 버튼 */
.button {
  float: left;
  min-width: 150px;
  max-width: 250px;
  display: block;
  margin: 1em;
  padding: 1em 2em;
  border: none;
  background: none;
  color: white;
  //vertical-align: middle;
  position: relative;
  z-index: 1;
  //-webkit-backface-visibility: hidden;
  -moz-osx-font-smoothing: grayscale;
}
.button:focus {
  outline: none;
}
.button > span {
  vertical-align: middle;
}

.button--size-s {
    font-size: 14px;
  }
.button--round-l {
    border-radius: 40px;
  }

  .button--text-upper {
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  .button--text-thick {
    font-weight: 600;
  }

  .button--border-thick {
    border: 3px solid;
  }

  .button--winona {
    overflow: hidden;
    padding: 0;
    -webkit-transition: border-color 0.3s, background-color 0.3s;
    transition: border-color 0.3s, background-color 0.3s;
    -webkit-transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
    transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
  }

  .button--winona::after {
    content: attr(data-text);
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
    color:  black;
    -webkit-transform: translate3d(0, 25%, 0);
    transform: translate3d(0, 25%, 0);
  }
  .button--winona > span {
    display: block;
  }
  .button--winona.button--inverted {
    color: #ffffff;
  }
  .button--winona.button--inverted:after {
    color: #ffffff;
  }
  .button--winona::after,
  .button--winona > span {
    padding: 1em 2em;
    -webkit-transition: -webkit-transform 0.3s, opacity 0.3s;
    transition: transform 0.3s, opacity 0.3s;
    -webkit-transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
    transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
  }
  .button--winona:hover {
    border-color: #ffffff;
    background-color: #ffffff;
  }
  .button--winona.button--inverted:hover {
    border-color: #ffffff;
    background-color: #ffffff;
  }
  .button--winona:hover::after {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
  .button--winona:hover > span {
    opacity: 0;
    -webkit-transform: translate3d(0, -25%, 0);
    transform: translate3d(0, -25%, 0);
  }

`;



export default Middle;