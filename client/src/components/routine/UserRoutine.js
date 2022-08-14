import React from 'react'
import styled from "styled-components";

const UserRoutine = () => {
  return (
    <SQUARE>UserRoutine</SQUARE>
  )
}

const SQUARE = styled.div`
    justify-content: center;
    display: flex;
    border: 1px solid #dae1e6;
    height: 400px;
    width: 95%;
    margin : 0% 2.5%;
`

export default UserRoutine;

/*

여기다가 OtherRoutine이 백준 사이트처럼 뿌려지는 거지
  이름 | 루틴 횟수 - 루틴 횟수 - 루틴 횟수 | 날짜
  이름 | 루틴 루틴 루틴 | 날짜
> 루틴 횟수 - 루틴 횟수 - 루틴 횟수

*/