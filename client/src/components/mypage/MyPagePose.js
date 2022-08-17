import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useCookies } from "react-cookie";
import Feedback1 from './Feedback1';
import Feedback2 from './Feedback2';
import $ from 'jquery';
import axios from 'axios';
import port from "../../data/port.json"; //url

const MyPagePose = () => {

    const [cookies, setCookie, removeCookie] = useCookies(["userInfo"]);

    const [getData, setGetData] = useState([]);

    let tmpTableBody;
  

  // poses 데이터 불러오기
  let myPose =[];
  let tmpPose = [];
  let poses = "";
  let PoseName = "";
  let score = "";
  let ppose = "";
  let click = false;

  useEffect(()=>{
      getList();
  },[])

  const getList = async() => { //data불러와서 myPose에 저장
      const UserName = cookies.userInfo.name; //로그인 계정 이름 

      try {
      await axios.get(port.url+ `/pose/${UserName}/mypage`,).then((res) => {
        console.log(res.data, 'frrs'); // 전체 데이터 불러오기
        setGetData([res.data]);

        $(".Bodyp").empty();

        getData.map((data, i) => {
            console.log("동작명:", data.poseName);
            console.log("good피드백: ", data[i].result.good);
            console.log("bad피드백: ", data[i].result.bad);
            console.log("bad part: ", data[i].result.bad.part);

            tmpTableBody = `
            <span className='box'>${data.poseName}</span>
            <Feedback1 name={${data[i].result.good}} />
            <Feedback2 name={${data[i].result.bad}} />
            `;

            $('.Bodyp').append(tmpTableBody);
        })

          //myPose = [];
          //tmpPose = res.data;
          //console.log(tmpPose, 'tmpPose'); // 전체 데이터 불러오기

          
    //       for (var i in tmpPose) {
    //           if(UserName === tmpPose[i].name){
    //               //let results = tmpPose[i].result; 
    //               //console.log("tmpPose[i].result :", results);
    //               //console.log("tmpPose[0].result.bad :", tmpPose[i].result.bad.length !== 0);

    //               if(tmpPose[i].result.bad.length !== 0){  // 평가가 bad이면
    //                 score = "bad";
    //                 for (var j in tmpPose[i].result.bad){
    //                     poses = [];
    //                     ppose = "";
    //                     PoseName = "";
    //                     let ppart = tmpPose[i].result.bad[j].part;
    //                     let pfeedback = tmpPose[i].result.bad[j].feedback;
    //                     let pname = tmpPose[i].poseName;
                
    //                     ppose = ppart +' : '+ pfeedback;
    //                     PoseName = pname;

    //                     poses.push({
    //                         "fb": ppose
    //                     });
    //                 }
    //                 console.log(myPose);
    //               }else if(tmpPose[i].result.good.length !== 0){
    //                 score = "bad";
    //                 for (var j in tmpPose[i].result.good){
    //                     poses ="";
    //                     PoseName = "";
    //                     let ppart = tmpPose[i].result.good[j].part;
    //                     let pfeedback = tmpPose[i].result.good[j].feedback;
    //                     let pname = tmpPose[i].poseName;

    //                     poses = ppart +' : '+ pfeedback;
    //                     PoseName = pname;
    //                 }
    //               }

    //               myPose.push({
    //                 "pose": poses,
    //                 "name": PoseName,
    //                 "score": score
    //             })
    //           }
    //       }
    //       myPose.map((it, index) => {
    //           tmpTableBody = `
    //           <span className='box'>${it.name}</span>
    //           <span className='box'>${it.score}</span>
    //           <span className='box'>${it.pose}</span>
    //           `;
    //           $('.Bodyp').append(tmpTableBody);
    //       })
       })
      } catch (e) {
      console.log(e);
      }

  }

  useEffect(()=> {
    console.log(getData, 'getData')
    console.log(getData[0], 'getData time')
  }, [getData])



  return (
    <Container>
        <div className='head'>
            <p className='box'>동작</p>
            <p className='box'>GOOD</p>
            <p className='box'>BAD</p>
        </div>

        <div className='parent'>
            <div className='bodyp'></div>
        </div>
    </Container>
  
  )
}

const Container = styled.div`

.head{
    display: flex;
    text-align : center;
  width: 100%;
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
  width: 100%;
  //border: 1px grey solid;
  //border-radius: 10px;
  padding: 10px;
  padding-top: 50px;
  padding-bottom: 50px;
  min-width: 500px;
  margin: 0 auto;
  margin-bottom: 15px;
  //box-shadow:0 3px 3px rgba(0, 0, 0, 0.7);
  }

  .box{
    float: left;
    width: 50%;
    margin: 5px;
    margin: 0 auto;
  }

  .btngroup button{
    border:  1px solid black;
    padding: 6px;
  }

  .btngroup button:hover{
    color: white;
    background-color: black;
  }

  .btn1{
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    margin-right: -1px;
  }

  .btn2{
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    //margin-right: -1px;
  }


`;


export default MyPagePose;
