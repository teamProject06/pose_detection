import React, { useEffect } from 'react'
import { useRecoilValue } from 'recoil';
import {routineListState}  from '../../atom/atomState'
import RoutineItemCreate from './RoutineItemCreate';
import RoutineItem from './RoutineItem';
import { useNavigate } from 'react-router-dom'; 

const MyRoutine = () => {
    const routineList = useRecoilValue(routineListState)
    const naviation = useNavigate()
    
    useEffect(()=> {
        console.log(routineList)
    }, [routineList])
    
    // RoutineItemCreate 루틴을 추가하는 인풋
    // RoutineItem 루틴 리스트를 보여주고 확인 수정 가능하고 버튼이 있다

  return (
    <>
    <RoutineItemCreate />
       {routineList.map(item => (
            <RoutineItem key={item.id} item={item} />
        ))}
        {routineList.length > 0 && <button type='button' onClick={()=> {
          naviation('/routine/routinecam', { replace: true})
        }}>완료</button>}
    </>
  )
}

export default MyRoutine