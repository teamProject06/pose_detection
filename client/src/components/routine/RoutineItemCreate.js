import React, { useState, useEffect } from 'react'
import { routineListState, isRoutineCheckedState } from '../../atom/atomState'
import { useSetRecoilState, useRecoilState } from 'recoil'
import NoInputModal from './NoInputModal';


const RoutineItemCreate = () => {
    const setRoutineList = useSetRecoilState(routineListState) 
    const [isActiveName, setIsActiveName] = useState(false)
    const [inputValue, setInputValue] = useState({
        name: '',
        count: '',
        isActive: true,
    })

    const [isChecked, setIsChecked] = useRecoilState(isRoutineCheckedState)

    useEffect(()=> {
      console.log(inputValue)  
    }, [inputValue]) 



    const addItem = () => {
        if (inputValue.name === '' || inputValue.count === '') {
            setIsChecked({
                ...isChecked,
                isAdd: false
            })
            
            return
        }

          

            setRoutineList((list) => {
                const id = list.length ? list[list.length-1].id + 1 : 0
    
                return [
                    ...list,
                    {
                        id,
                        name: inputValue.name,
                        count: inputValue.count,
                        isActive: false,
                    }
                ]
            })
            setInputValue({
                name: '',
                count: '',
                isActive: true,
            })
            setIsActiveName(false)
       
    }

    const changeRoutineInput = e => {
        if (e.target.name === 'routineName') {
            setInputValue({
                ...inputValue,
                name: e.target.value
            })
        } else if (e.target.name === 'countOrTime') {
            setInputValue({
                ...inputValue,
                count: e.target.value
            })
        }
    }

    const onClickModalClose = () => { 
        if (isChecked.isAdd === false) {
          setIsChecked({
              ...isChecked,
              isAdd: true,
          });
          return;
        }
      }
      
      const onClicktitle = (e) => {
        if (e.target.textContent === '스쿼트') {
            setInputValue({
                ...inputValue,
                name: '스쿼트'
            })
            return
        }
        if (e.target.textContent === '런지') {
            setInputValue({
                ...inputValue,
                name: '런지'
            })
            return
        }
        if (e.target.textContent === '원암덤벨로우') {
            setInputValue({
                ...inputValue,
                name: '원암덤벨로우'
            })
            return
        }
        if (e.target.textContent[0] === '정') {
            setInputValue({
                ...inputValue,
                name: ''
            })
            setIsActiveName(true)
            return
        }
      } 


    return (
        <>
        {isChecked.isAdd === false && <NoInputModal isAdd={onClickModalClose} />}
        <ul className="category-ul" onClick={onClicktitle}>
        <li>스쿼트</li>
        <li>런지</li>
        <li>원암덤벨로우</li>
        <li>
            정적운동
            <small>* 정적운동은 횟수가 아닌 시간을 기록합니다.</small>
               {isActiveName && <input
                    type="text"
                    placeholder="운동이름을 입력해주세요."
                    name="routineName"
                    value={inputValue.name}
                    onChange={changeRoutineInput}
                />}

        </li>
    <input
        type="text"
        placeholder="동작 횟수 / 시간을 입력해주세요"
        name="countOrTime"
        value={inputValue.count}
        onChange={changeRoutineInput}
    />
    <button onClick={addItem}>+</button>
    </ul>
    </>
  )
}

export default RoutineItemCreate