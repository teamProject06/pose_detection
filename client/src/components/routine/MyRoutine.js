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
  return (
    <>
    <RoutineItemCreate />
       {routineList.map(item => (
            <RoutineItem key={item.id} item={item} />
        ))}
        {routineList.length > 0 && <button type='button' onClick={()=> {
          naviation('/routinecam', { replace: true})
        }}>완료</button>}
    </>
  )
}

export default MyRoutine