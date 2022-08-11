import React, { useState, useRef, useEffect } from 'react'
import { useRecoilValue, useRecoilSnapshot } from 'recoil';
import {routineListState}  from '../../atom/atomState'
import styled from 'styled-components';
import RoutineItemCreate from './RoutineItemCreate';
import RoutineItem from './RoutineItem';

const ToRoutin = () => {
    const routineList = useRecoilValue(routineListState)

    const snapshot = useRecoilSnapshot();
    useEffect(() => {
      console.debug('The following atoms were modified:');
      for (const node of snapshot.getNodes_UNSTABLE({isModified: true})) {
        console.debug(node.key, snapshot.getLoadable(node));
      }
    }, [snapshot]);

    useEffect(()=> {
        console.log(routineList)
    }, [routineList])
  return (
    <>
    <RoutineItemCreate />
       {routineList.map(item => (
            <RoutineItem key={item.id} item={item} />
        ))}
        {routineList.length > 0 && <button type='button'>완료</button>}
    </>
  )
}

export default ToRoutin