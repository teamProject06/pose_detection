import React, { useState, useRef, useEffect } from 'react'
import { useSetRecoilState, useRecoilValue, useRecoilState } from 'recoil';
import {routineListState}  from '../../atom/atomState'
import styled from 'styled-components';
import RoutineItemCreate from './RoutineItemCreate';

const ToRoutin = () => {
    const routineList = useRecoilValue(routineListState)

    useEffect(()=> {
        console.log(routineList)
    }, [routineList])
  return (
    <>
    <RoutineItemCreate />
       {routineList.map(it => {
        return (
            <>
            {it.name} list
            {it.count}
            {it.isActive}
            </>
        )
        })}
        {routineList.length > 0 && <button type='button'>완료</button>}
    </>
  )
}

export default ToRoutin