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

    let datebody;
    let badBody;
    let goodBody;
    let id = 0;

  //현재 시간 function
  const timeString = () => {
    const now = new Date().getTime();
    return now;
  }

  // 상단 동작 체크 버튼
  const GetClick = (e) => {
    //console.log(e.target.id)
    let current = document.getElementById(e.target.id);

      if( e.target.id === "3"){
        id = e.target.id;
        let othercurrent = document.getElementById("4");
        let othercurrent2 = document.getElementById("5");
    
        current.style.borderBottom = '3px solid #061673';
        othercurrent.style.borderBottomColor = '#f6f8fa';
        othercurrent2.style.borderBottomColor = '#f6f8fa';
        getList();
      }
      if( e.target.id === "4"){
        id = e.target.id;
        let othercurrent = document.getElementById("3");
        let othercurrent2 = document.getElementById("5");
    
        current.style.borderBottomColor = '#061673';
        othercurrent.style.borderBottomColor = '#f6f8fa';
        othercurrent2.style.borderBottomColor = '#f6f8fa';
        getList();
      }
      if( e.target.id === "5"){
        id = e.target.id;
        let othercurrent = document.getElementById("3");
        let othercurrent2 = document.getElementById("4");
    
        current.style.borderBottomColor = '#061673';
        othercurrent.style.borderBottomColor = '#f6f8fa';
        othercurrent2.style.borderBottomColor = '#f6f8fa';
        getList();
      }
};

 //DB 데이터 가져오기
  const getList = async() => { //data불러와서 myPose에 저장
      const UserName = cookies.userInfo.name; //로그인 계정 이름 

      try {
      await axios.get(port.url+ `/pose/${UserName}/mypage`,).then((res) => {
       // console.log(res.data, '전체 데이터'); // 전체 데이터 불러오기
        getData.push(res.data);
        console.log(getData, 'getData');
        $(".BodyDate").empty();
        $(".Bodyb").empty();
        $(".Bodyg").empty();
        //console.log("id:", id);
        //console.log("id비교:", id==3);
        // console.log("index0 : ", getData[0]);

        if(id==3){ // 스쿼트 선택
          getData[0].map((data, i) => {
              if( data.poseName === "스쿼트" && data.result.Bad !== null){
                console.log("poseName:", data.poseName);
                console.log("result: ", data.result);
                console.log("result: ", data.result.Bad);

                // 피드백 모두 받아오기
                let badfeedbacks = "";
                data.result.Bad.map((bd, idx) => {
                    let part = bd.part;
                    let feedback = bd.feedback;

                    badfeedbacks = badfeedbacks + part+'<br/><br/>'+feedback+'<br/><br/><br/>';
              })

              //날짜
              const time = new Date(Number(data.time)).toLocaleDateString();
              console.log("time: ", time);

              datebody = `
               <h2>최근 교정 ${time}</h2><br/>
              `;
              $('.BodyDate').append(datebody);
              
                badBody = `
                <p>${badfeedbacks}</p>
                `;

                $('.Bodyb').append(badBody);
            
            }

            if(data.poseName === "스쿼트" && data.result.Good !== null){
               // 피드백 모두 받아오기
               let badfeedbacks = "";
               data.result.Good.map((bd, idx) => {
                   let part = bd.part;
                   let feedback = bd.feedback;

                   badfeedbacks = badfeedbacks + part+'<br/><br/>'+feedback+'<br/><br/><br/>';
                })

                 //날짜
                 const time = new Date(Number(data.time)).toLocaleDateString();
                 console.log("time: ", time);
             
               goodBody = `
               <p>${badfeedbacks}</p>
               `;

               $('.Bodyg').append(goodBody);
            }

          })
        } else if(id==4){ // 런지 선택
          getData[0].map((data, i) => {
              if( data.poseName === "런지" && data.result.Bad !== null){
                console.log("poseName:", data.poseName);
                console.log("result: ", data.result);
                console.log("result: ", data.result.Bad);

                // 피드백 모두 받아오기
                let badfeedbacks = "";
                data.result.Bad.map((bd, idx) => {
                    let part = bd.part;
                    let feedback = bd.feedback;

                    badfeedbacks = badfeedbacks + part+'<br/><br/>'+feedback+'<br/><br/><br/>';
              })

              //날짜
              const time = new Date(Number(data.time)).toLocaleDateString();
              console.log("time: ", time);

              datebody = `
               <h2>최근 교정 ${time}</h2><br/>
              `;
              $('.BodyDate').append(datebody);
              
                badBody = `
                <p>${badfeedbacks}</p>
                `;

                $('.Bodyb').append(badBody);
            
            }

            if(data.poseName === "런지" && data.result.Good !== null){
               // 피드백 모두 받아오기
               let badfeedbacks = "";
               data.result.Good.map((bd, idx) => {
                   let part = bd.part;
                   let feedback = bd.feedback;

                   badfeedbacks = badfeedbacks + part+'<br/><br/>'+feedback+'<br/><br/><br/>';
                })

                 //날짜
                 const time = new Date(Number(data.time)).toLocaleDateString();
                 console.log("time: ", time);
             
               goodBody = `
               <p>${badfeedbacks}</p>
               `;

               $('.Bodyg').append(goodBody);
            }

          })
        }else  if(id==5){ // 원암 선택
          getData[0].map((data, i) => {
              if( data.poseName === "원암덤벨로우" && data.result.Bad !== null){
                console.log("poseName:", data.poseName);
                console.log("result: ", data.result);
                console.log("result: ", data.result.Bad);

                // 피드백 모두 받아오기
                let badfeedbacks = "";
                data.result.Bad.map((bd, idx) => {
                    let part = bd.part;
                    let feedback = bd.feedback;

                    badfeedbacks = badfeedbacks + part+'<br/><br/>'+feedback+'<br/><br/><br/>';
              })

              //날짜
              const time = new Date(Number(data.time)).toLocaleDateString();
              console.log("time: ", time);

              datebody = `
               <h2>최근 교정 ${time}</h2><br/>
              `;
              $('.BodyDate').append(datebody);
              
                badBody = `
                <p>${badfeedbacks}</p>
                `;

                $('.Bodyb').append(badBody);
            
            }

            if(data.poseName === "원암덤벨로우" && data.result.Good !== null){
               // 피드백 모두 받아오기
               let badfeedbacks = "";
               data.result.Good.map((bd, idx) => {
                   let part = bd.part;
                   let feedback = bd.feedback;

                   badfeedbacks = badfeedbacks + part+'<br/><br/>'+feedback+'<br/><br/><br/>';
                })

                 //날짜
                 const time = new Date(Number(data.time)).toLocaleDateString();
                 console.log("time: ", time);
             
               goodBody = `
               <p>${badfeedbacks}</p>
               `;

               $('.Bodyg').append(goodBody);
            }

          })
        }

       })
      } catch (e) {
      console.log(e);
      }
  };




  return (
    <Container>

        <button className='pmenu' id="3" onClick={GetClick}>스쿼트</button>
        <button className='pmenu' id="4" onClick={GetClick}>런지</button>
        <button className='pmenu' id="5" onClick={GetClick}>원암로우</button>
        

        <div className='BodyDate pmargin'></div>
        <div className="container">
              <div className="box">
                <div className="box__img">
                  <div className='box_good box_good_font'>GOOD</div>
                </div>

                <div className="box__details">
                  <div className='Bodyg'></div>
                </div>
              </div>
              
              <div className="box">
                <div className="box__img">
                  <div className='box_bad box_good_font'>BAD</div>
                </div>

                <div className="box__details">
                  <div className='Bodyb'></div>
                </div>
              </div>
          </div>

    </Container>
  
  )
}

const Container = styled.div`

margin-top: 5%;

.pmenu {
    display: inline-block;
    width: 8%;
    min-width: 68px;
    height: 30px;
    line-height: 22px;
    text-align: center;
    font-size: 14px;
    border-bottom: 3px solid ${theme.colors.grey};
    background-color: white;
    margin-right: 10px;
}

.pmargin{
  margin-top: 3%;
}


// 카드
.container{
  margin: 0;
  padding: 0;   
  display: flex;
  margin-top: 1%;
  margin-left: 28%;
}

.box {
  position: relative;
  width: 300px;
  height: 420px;
  background: #262626;
  //margin: 0 auto;
  margin-right: 10px;
  overflow: hidden;
}

.box__img {
  position: absolute;
  top:0;
  left:0;
  transition: transform .5s linear;
}

.box_good{
  width: 300px;
  height: 420px;
  background-color: #9fc5e8;
}

.box_good_font{
  font-size : 25px;
  font-weight: 600;
  color: black;
  text-size-adjust: none;
  font-family: campton, "Apple SD Gothic Neo", NanumBarunGothic, 나눔바른고딕, "Malgun Gothic", "맑은 고딕", dotum, sans-serif;
}

.box_bad{
  width: 300px;
  height: 420px;
  background-color: #ff877e;
}


.box__details{
  color: #fff;
  padding: 10px 25px;
  margin-top: 50px;
}

.box__details h2 {
  text-align: center;
  color: #ccc;
}

.box:hover .box__img {
  transform: translateX(-100%);  
}

`;


export default MyPagePose;