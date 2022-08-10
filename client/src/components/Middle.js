import React from 'react';
import styled from 'styled-components';

const Middle = () => {
  return (
    <MiddleBlock>

            <div id="1">
              {/* 영상 반복 재생 */}
                <div className="row inner bg-2 hidden">
                  <video loop autoplay="autoplay" muted="muted">
                    <source src="./img/run.mp4" type="video/mp4"></source>
                  </video>
                </div>
            </div>


            <div id="2">
                <div className="row inner bg-2 innerM">
                    <div className="col-lg-4 innerM2">
                        <svg className="bd-placeholder-img rounded-circle" width="140" height="140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 140x140" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#777"></rect><text x="50%" y="50%" fill="#777" dy=".3em">140x140</text></svg>
                        <br/><br/>
                        <h2 className="fw-normal">플랭크<br/><br/></h2>
                        <p>몸의 중심이 되는 코어 근육을 단련시키기 때문에 요통 개선, 강한 코어 구축, 신진대사 향상, 유연성 증가, 자세 교정 등의 효과를 볼 수 있는 유익한 운동입니다.<br/><br/></p>
                        <p><button className="button button--winona button--border-thick button--round-l button--text-upper button--size-s button--text-thick" data-text="시작하기"><span>시작하기</span></button></p>
                    </div>

                    <div className="col-lg-4 innerM2">
                        <svg className="bd-placeholder-img rounded-circle" width="140" height="140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 140x140" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#777"></rect><text x="50%" y="50%" fill="#777" dy=".3em">140x140</text></svg>
                        <br/><br/>
                        <h2 className="fw-normal">다운도그<br/><br/></h2>
                        <p>가슴과 어깨를 젖혀줘 나쁜 자세로 생기는 통증을 완화하고 전신의 유연성을 높이는 운동입니다.<br/><br/></p>
                        <p><button className="button button--winona button--border-thick button--round-l button--text-upper button--size-s button--text-thick" data-text="시작하기"><span>시작하기</span></button></p>
                    </div>

                </div>
            </div>


            <div id="3">
                <div id="myCarousel" className="inner bg-1 carousel slide" data-bs-ride="carousel">

                    <div className="carousel-indicators">
                    <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" aria-label="Slide 1" className="active"></button>
                    <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2" className=""></button>
                    <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3" className=""></button>
                    </div>

                    <div className="carousel-inner">

                    <div className="carousel-item innerH">

                        <div className="container">
                        <svg className="" width="100%" height="100%" xmlns=""   focusable="false"><rect fill=""></rect></svg>
                        <div className="carousel-caption text-start">
                            <h1>스쿼트<br/><br/></h1>
                            <p>가장 기본적인 하체 운동으로 대퇴사두근, 대둔근, 슬굴곡근이 단련되면서 <br/> 허벅지와 엉덩이, 종아리를 포함한 하체 근육을 강화시켜주는 효과가 있습니다.<br/><br/></p>
                            <p><button className="button button--winona button--border-thick button--round-l button--text-upper button--size-s button--text-thick" data-text="운동하기"><span>운동하기</span></button></p>
                        </div>
                        </div>
                    </div>

                    <div className="carousel-item active innerH">
                        <div className="container">
                        <svg className="" width="100%" height="100%" xmlns=""   focusable="false"><rect fill="#b6d8f2"></rect></svg>
                        <div className="carousel-caption text-start ">
                            <h1>런지<br/><br/></h1>
                            <p>균형감각을 향상시키고, 엉덩이와 허벅지의 군살을 제거하며, 탄탄하게 만들어 주는 효과가 있습니다.<br/><br/></p>
                            <p><button className="button button--winona button--border-thick button--round-l button--text-upper button--size-s button--text-thick" data-text="운동하기"><span>운동하기</span></button></p>
                        </div>
                        </div>
                    </div>

                    <div className="carousel-item innerH">

                        <div className="container">
                        <svg className="" width="100%" height="100%" xmlns=""  focusable="false"><rect fill="#b6d8f2"></rect></svg>
                        <div className="carousel-caption text-start">
                            <h1>데드리프트<br/><br/></h1>
                            <p>무거운 중량을 버티는 등, 허리의 안정화와 하체 근육 단련에 효과적입니다. <br/> 근력과 순발력 훈련은 물론, 신진대사 활성화하고 지방 감량에 효과가 있습니다.<br/><br/></p>
                            <p><button className="button button--winona button--border-thick button--round-l button--text-upper button--size-s button--text-thick" data-text="운동하기"><span>운동하기</span></button></p>
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
    background-color: #b6d8f2;
  }
  
  .bg-2 {
    background-color: #ffffff;
    overflow: hidden;
  }

  .innerH{
    height: 300px;
  }

  .innerM{
    margin-left: 10%;
    margin-right: 8%;
  }

  .innerM2{
    margin-right: 1%;
  }

.auto {overflow: auto;}
.visible {overflow: visible;}
.hidden {overflow: hidden;}
.scroll-x {overflow-x: scroll;}
.scroll-y {overflow-y: scroll;}
.scroll {overflow: scroll;}




  
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
  color: inherit;
  vertical-align: middle;
  position: relative;
  z-index: 1;
  -webkit-backface-visibility: hidden;
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
    color: #000000;
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