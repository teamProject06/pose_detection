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

    const getData = [];

    let tmpTableBody;

  useEffect(()=>{
      getList();
  },[])

  const getList = async() => { //data불러와서 myPose에 저장
      const UserName = cookies.userInfo.name; //로그인 계정 이름 
      $(".Bodyp").empty();

      try {
      await axios.get(port.url+ `/pose/${UserName}/mypage`,).then((res) => {
       // console.log(res.data, '전체 데이터'); // 전체 데이터 불러오기
        getData.push(res.data);
        console.log(getData, 'getData');

        getData.map((data, i) => {
            console.log("동작명:", data.poseName);
            console.log("good피드백: ", data.result.good);
            console.log("bad피드백: ", data.result.bad);

            tmpTableBody = `
            <span className='box'>${data.poseName}</span>

            <Feedback1 datas={${data.result.good}} />
            <Feedback2 datas={${data.result.bad}} />
            `;

            $('.Bodyp').append(tmpTableBody);
        })

       })
      } catch (e) {
      console.log(e);
      }

  }

//  useEffect(()=> {
//  console.log(getData, 'getData')
// }, [getData])




  return (
    <Container>
        <div className='head'>
            <p className='box'>동작</p>
            <p className='box'>GOOD</p>
            <p className='box'>BAD</p>
        </div>

        <div className='parent Bodyp'>
            {getData.map((data, idx) =>  {
                return (
                    <>
                      <span className='box'>${data[idx].poseName}</span>
                      {data.result.good.length > 0 && <Feedback1 datas={data.result.good} />}
                      {data.result.bad.length > 0 && <Feedback2 datas={data.result.bad}/>}
                    </>
                )
            })}
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
