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
    <TmpRoutine>
       {routineList.map(item => (
            <EditRoutineItem key={item.id} item={item} />
        ))}
        {routineList.length > 0 && <LongChoose type='button' onClick={()=> {
          naviation('/routine/routinecam', { replace: true})
        }}>완료</LongChoose>}</TmpRoutine>
    </>
  )
}

const TmpRoutine = styled.div`
    justify-content: center;
    display: flex;
    border: 1px solid #dae1e6;
    height: 150px;
    width: 95%;
    margin : 0% 2.5%;`
    
const LongChoose = styled.div`
    border-radius: 13px;
    background-color: #c3dbff;
    font-size: 13px;
    height: 30px;
    padding : 2%;
    font-weight: 1000;
    text-align: center;
    text-decoration: none;
    /* position: relative; */
    margin: 20px;
    border-radius: 1px;
`
export default MyRoutine