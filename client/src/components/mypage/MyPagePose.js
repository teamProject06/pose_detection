import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useCookies } from "react-cookie";
import $ from 'jquery';
import axios from 'axios';
import port from "../../data/port.json"; //url
import { theme } from '../../theme';

const MyPagePose = () => {

  // DB로부터 자료 받아오기
    const [cookies, setCookie, removeCookie] = useCookies(["userInfo"]);

    const getData = [];

    let tmpTableBody;

  useEffect(()=>{
      getList();
  },[])

  const getList = async(id) => { //data불러와서 myPose에 저장
      const UserName = cookies.userInfo.name; //로그인 계정 이름 

      try {
      await axios.get(port.url+ `/pose/${UserName}/mypage`,).then((res) => {
       // console.log(res.data, '전체 데이터'); // 전체 데이터 불러오기
        getData.push(res.data);
        console.log(getData, 'getData');
        $(".Bodyp").empty();

        if( id === "3" ){ // 스쿼트 선택
          getData[0].map((data, i) => {
            if( data.poseName === "스쿼트" && data.result.bad !== null){
              // 피드백 모두 받아오기
              let badfeedbacks = "";
              data.result.bad.map((bd, idx) => {
                  let part = bd.part;
                  let feedback = bd.feedback;

                  badfeedbacks = badfeedbacks + part + ' : ' + feedback + '<br/><br/>';
            })

            
              tmpTableBody = `
              <div className='parent'>
              <span className='box posetitle'>${data.poseName} [${data.time}]</span><br/><br/>
              <span className='box'>${badfeedbacks}</span>
              <br/><br/>
              </div>
              `;

              $('.Bodyp').append(tmpTableBody);
          }
        })
        }

        getData[0].map((data, i) => {
            // 피드백 모두 받아오기
            let feedbacks = "";
            data.result.bad.map((bd, idx) => {
                let part = bd.part;
                let feedback = bd.feedback;

                feedbacks = feedbacks + part + ' : ' + feedback + '<br/><br/>';
            })

            
            tmpTableBody = `
            <div className='parent'>
            <span className='box posetitle'>${data.poseName} [${data.time}]</span><br/><br/>
            <span className='box'>${feedbacks}</span>
            <br/><br/>
            </div>
            `;

            $('.Bodyp').append(tmpTableBody);
        })

       })
      } catch (e) {
      console.log(e);
      }
  };


  // 상단 동작 체크 버튼
  const GetClick = (e) => {
    console.log(e.target.id)
    let current = document.getElementById(e.target.id);

      if( e.target.id === "3"){
        let othercurrent = document.getElementById("4");
        let othercurrent2 = document.getElementById("5");
    
        current.style.borderBottom = '3px solid #061673';
        othercurrent.style.borderBottomColor = '#f6f8fa';
        othercurrent2.style.borderBottomColor = '#f6f8fa';
        getList(e.target.id);
      }
      if( e.target.id === "4"){
        let othercurrent = document.getElementById("3");
        let othercurrent2 = document.getElementById("5");
    
        current.style.borderBottomColor = '#061673';
        othercurrent.style.borderBottomColor = '#f6f8fa';
        othercurrent2.style.borderBottomColor = '#f6f8fa';
        getList(e.target.id);
      }
      if( e.target.id === "5"){
        let othercurrent = document.getElementById("3");
        let othercurrent2 = document.getElementById("4");
    
        current.style.borderBottomColor = '#061673';
        othercurrent.style.borderBottomColor = '#f6f8fa';
        othercurrent2.style.borderBottomColor = '#f6f8fa';
        getList(e.target.id);
      }
};


  return (
    <Container>

        <button className='pmenu' id="3" onClick={GetClick}>스쿼트</button>
        <button className='pmenu' id="4" onClick={GetClick}>런지</button>
        <button className='pmenu' id="5" onClick={GetClick}>원암로우</button>

        <div className='Bodyp'>
            {/* {getData[0].map((data, idx) =>  {
                return (
                    <>
                      <span className='box'>${data[idx].poseName}</span>
                      {data.result.good.length > 0 && <Feedback1 datas={data.result.good} />}
                      {data.result.bad.length > 0 && <Feedback2 datas={data.result.bad}/>} 
                    </>
                )
            })} */}
        </div>

        
    <main className="main">
        <section className="card-area">

            {/* Card: Beach */}
            <section className="card-section">
                <div className="card">
                    <div className="flip-card">
                        <div className="flip-card__container">
                            <div className="card-front">
                                <div className="card-front__tp card-front__tp--beach">
                                               <h2 className="card-front__heading">
                                                   GOOD
                                               </h2>
                                </div>
                                <div className="card-front__bt">
                                    <p className="card-front__text-view card-front__text-view--beach">
                                        상세보기
                                    </p>
                                </div>
                            </div>
                            <div className="card-back">
                               
                            </div>
                        </div>
                    </div>

                    <div className="inside-page">
                        <div className="inside-page__container">
                            <h3 className="inside-page__heading inside-page__heading--beach">
                                상체 각도
                            </h3>
                            <p className="inside-page__text">
                               상체가 적절하게 굽혀졌습니다.(예시)
                            </p>
                        </div>
                    </div>
                </div>
            </section>

        </section>
      </main>

    </Container>
  
  )
}

const Container = styled.div`

margin-top: 5%;

.pmenu {
    display: inline-block;
    width: 6%;
    height: 30px;
    line-height: 22px;
    text-align: center;
    font-size: 14px;
    border-bottom: 3px solid ${theme.colors.grey};
    background-color: white;
    margin-right: 10px;
}


/* 카드 */

/* Headings */

/* Main heading for card's front cover */
.card-front__heading {
  font-size: 1.5rem;
  margin-top: .25rem;
}

/* Main heading for inside page */
.inside-page__heading { 
  padding-bottom: 1rem; 
  width: 100%;
}

/* Mixed */

/* For both inside page's main heading and 'view me' text on card front cover */
.inside-page__heading,
.card-front__text-view {
  font-size: 1.3rem;
  font-weight: 800;
  margin-top: .2rem;
}


.inside-page__heading--beach,
.card-front__text-view--beach { color: #fa7f67; }

/* Front cover */
.card-front__tp { color: #fafbfa; }

/* Back cover */

/* For inside page's body text */
.inside-page__text {
  color: #333;
}

/* Icons ===========================================*/

.card-front__icon {
  fill: #fafbfa;
  font-size: 3vw;
  height: 3.25rem;
  margin-top: -.5rem;
  width: 3.25rem;
}


/* Layout Structure=========================================*/

.main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 60vh;
  width: 100%;
}

/* Container to hold all cards in one place */
.card-area {
  align-items: center;
  display: flex;
  flex-wrap: nowrap;
  height: 100%;
  justify-content: space-evenly;
  padding: 1rem;
}

/* Card ============================================*/

/* Area to hold an individual card */
.card-section {
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  width: 100%;
}

/* A container to hold the flip card and the inside page */
.card {
  background-color: rgba(0,0,0, .05);
  box-shadow: -.1rem 1.7rem 6.6rem -3.2rem rgba(0,0,0,0.5);
  height: 15rem;
  position: relative;
  transition: all 1s ease;
  width: 15rem;
}

/* Flip card - covering both the front and inside front page */

/* An outer container to hold the flip card. This excludes the inside page */
.flip-card {
  height: 15rem;
  perspective: 100rem;
  position: absolute;
  right: 0;
  transition: all 1s ease;
  visibility: hidden;
  width: 15rem;
  z-index: 100;
}

/* The outer container's visibility is set to hidden. This is to make everything within the container NOT set to hidden  */
/* This is done so content in the inside page can be selected */
.flip-card > * {
  visibility: visible;
}

/* An inner container to hold the flip card. This excludes the inside page */
.flip-card__container {
  height: 100%;
  position: absolute;
  right: 0;
  transform-origin: left;
  transform-style: preserve-3d;
  transition: all 1s ease;
  width: 100%;
}

.card-front,
.card-back {
  backface-visibility: hidden;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
}

/* Styling for the front side of the flip card */

/* container for the front side */
.card-front {
  background-color: #fafbfa;
  height: 15rem;
  width: 15rem;
}

/* Front side's top section */
.card-front__tp {
  align-items: center;
  clip-path: polygon(0 0, 100% 0, 100% 90%, 57% 90%, 50% 100%, 43% 90%, 0 90%);
  display: flex;
  flex-direction: column;
  height: 12rem;
  justify-content: center;
  padding: .75rem;
}


.card-front__tp--beach {
  background: linear-gradient(
    to bottom,
    #fb9b88,
    #f86647
  );
}


/* Front card's bottom section */
.card-front__bt {
  align-items: center;
  display: flex;
  justify-content: center;
}

/* Styling for the back side of the flip card */

.card-back {
  background-color: #fafbfa;
  transform: rotateY(180deg);
}

/* Specifically targeting the <video> element */
.video__container {
  clip-path: polygon(0% 0%, 100% 0%, 90% 50%, 100% 100%, 0% 100%);
  height: auto;
  min-height: 100%;
  object-fit: cover;
  width: 100%;
}

/* Inside page */

.inside-page {
  background-color: #fafbfa;
  box-shadow: inset 20rem 0px 5rem -2.5rem rgba(0,0,0,0.25);
  height: 100%;
  padding: 1rem;
  position: absolute;
  right: 0;
  transition: all 1s ease;
  width: 15rem;
  z-index: 1;
}

.inside-page__container {
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  text-align: center; 
  width: 100%;
}

/* Functionality ====================================*/

/* This is to keep the card centered (within its container) when opened */
.card:hover {
  box-shadow:
  -.1rem 1.7rem 6.6rem -3.2rem rgba(0,0,0,0.75);
  width: 30rem;
}

/* When the card is hovered, the flip card container will rotate */
.card:hover .flip-card__container {
  transform: rotateY(-180deg);
}

/* When the card is hovered, the shadow on the inside page will shrink to the left */
.card:hover .inside-page {
  box-shadow: inset 1rem 0px 5rem -2.5rem rgba(0,0,0,0.1);
}

`;


export default MyPagePose;
