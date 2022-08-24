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

  //현재 시간 function : 2022년 8월 15일
  const timeString = () => {
    const now = new Date().getTime();
    
    return now;
  }

  const startRoutine = () => {
    console.log(routineList,"routineList");
    myRoutine = {
      "routine" : routineList,
      "name" : cookies.userInfo.name,
      "time" : timeString(),
    };
    console.log(myRoutine,"myRoutine");
    return sendMyRoutine().then((res) => {
      alert(res.data.result);
      naviation('/routine/routinecam', { replace: true });
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
    <>
      <AddRoutineItem />
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
    </>
  )
}

const SQUARE = styled.div`
    width: 95%;
    min-width: 95%;
    margin : 10% 2.5%;
    margin-bottom: 20px;`
const Table = styled.table`
    width: 100%;
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
    width : 90%;
    height: 45px;
    padding : 14px;
    font-weight: 600;
    text-align: center;
    text-decoration: none;
    margin: 5%;`

export default MyRoutine;