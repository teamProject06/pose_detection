import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil';
import { useCookies } from 'react-cookie';
import { routineListState } from '../../atom/atomState'
import AddRoutineItem from './AddRoutineItem';
import EditRoutineItem from './EditRoutineItem';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import port from "./../../data/port.json"; //url

const MyRoutine = () => {
  const naviation = useNavigate()
  const [cookies, setCookie, removeCookie] = useCookies(["userInfo"]);
  const routineList = useRecoilValue(routineListState)
  let myRoutine = {};

  const startRoutine = () => {
    //console.log(routineList,"routineList");
    let date = new Date();
    myRoutine = {
      "routine" : routineList,
      "name" : cookies.userInfo.name,
      "time" : date.getTime(),
    };
   // console.log(myRoutine,"myRoutine");
    return sendMyRoutine().then((res) => {
      alert(res.data.result);
      naviation('/not');
    }).catch((e) => {
      alert(e.response.data.message);
    })
  }

  const sendMyRoutine = async () => {
    return await axios.post(port.url + "/routine", myRoutine, {
      headers: {
        accessToken: cookies.userInfo.accessToken,
      }
    })
  }

  return (
      <SQUARE>
        <Table>
          <tbody>
            {routineList.map((item) => (
              <EditRoutineItem key={item.id} item={item} />
            ))}
          </tbody>
        </Table>
        {routineList.length > 0 
        && <LongChoose type='button' onClick={startRoutine}>이 루틴으로 운동 시작</LongChoose>}
      </SQUARE>
  )
}

const SQUARE = styled.div`
    width: 90%;
    min-width: 90%;
    margin : 0 2.5% 10% 2.5%;
    /* margin-bottom: 20px; */
    /* height: 100vh; */
  /* overflow-y: auto; */
  `

// const SQUARE = styled.div`
//     /* border: 1px solid #dae1e6; */
//     width: 95%;
//     margin : 0 2.5%;
//     padding: 4em 5em;
// `
const Table = styled.table`
    width: 100%;
    margin : 0 auto;
    border-collapse: collapse;
    td{
      font-size: 12px;
      font-weight: 900;
      border-top : 1.3px solid black;//#c3dbff;
      border-bottom : 1.3px solid black;//#c3dbff;
      padding : 16px 0;
      }`
//이 루틴으로 운동시작
const LongChoose = styled.div`
    border-radius: 13px;
    background-color: black; //#c3dbff;
    color : white;
    font-size: 14px;
    width : 100%;
    height: 45px;
    padding : 14px;
    font-weight: 600;
    text-align: center;
    text-decoration: none;
    margin: 5% auto 0;
    `

export default MyRoutine;