import React, { useEffect } from 'react'
import { useRecoilValue } from 'recoil';
import {routineListState}  from '../../atom/atomState'
import AddRoutineItem from './AddRoutineItem';
import EditRoutineItem from './EditRoutineItem';
import { useNavigate } from 'react-router-dom'; 
import styled from 'styled-components';

const MyRoutine = () => {
    const routineList = useRecoilValue(routineListState)
    const naviation = useNavigate()
    
    useEffect(()=> {
        console.log(routineList)
    }, [routineList])
    
    // AddRoutineItem 루틴을 추가하는 인풋
    // EditRoutineItem 루틴 리스트를 보여주고 확인 수정 가능하고 버튼이 있다

  return (
    <>
    <AddRoutineItem />
    <SQUARE>
      <Table>
        <tbody>
       {routineList.map((item) => (
            <EditRoutineItem key={item.id} item={item}/>
        ))}
        </tbody>
        </Table>
        {routineList.length > 0 && <LongChoose type='button' onClick={()=> {
          naviation('/routine/routinecam', { replace: true})
        }}>이 루틴으로 운동 시작</LongChoose>}
        </SQUARE>
    </>
  )
}

const Table = styled.table`
width: 100%;
border-collapse: collapse;
td{
  font-size: 12px;
  font-weight: 900;
  border-top : 1.3px solid #c3dbff;
  border-bottom : 1.3px solid #c3dbff;
  padding : 16px 0;
}`

const SQUARE = styled.div`
    height: 150px;
    width: 95%;
    margin : 0% 2.5%;
    margin-bottom: 5%;`
    
    const LongChoose = styled.div`
    border-radius: 13px;
    background-color: #c3dbff;
    /* color : white; */
    font-size: 14px;
    width : 90%;
    height: 45px;
    padding : 14px;
    font-weight: 600;
    text-align: center;
    text-decoration: none;
    margin: 5% ;`
export default MyRoutine;