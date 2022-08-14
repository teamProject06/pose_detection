import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { routineListState, isRoutineCheckedState } from '../../atom/atomState'
import { useSetRecoilState, useRecoilState } from 'recoil'
import NoInputModal from './NoInputModal';

const AddRoutineItem = () => {
    const setRoutineList = useSetRecoilState(routineListState)
    const [isActiveName, setIsActiveName] = useState(true)
    const [inputValue, setInputValue] = useState({
        name: '',
        count: '',
        isActive: true,
    })

    const [isChecked, setIsChecked] = useRecoilState(isRoutineCheckedState)

    useEffect(() => {
        console.log(inputValue)
    }, [inputValue])


    //모달창
    const onClickModalClose = () => {
        if (isChecked.isAdd === false) {
            setIsChecked({
                ...isChecked,
                isAdd: true,
            });
            return;
        }
    }

    /*_____________________set excercise name_________________________ */
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
            setIsActiveName(false)
            return
        }
    }

    //dealing with input value
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

    /*_____________________add routine list_______________________ */
    const addItem = () => {
        if (inputValue.name === '' || inputValue.count === '') {
            setIsChecked({
                ...isChecked,
                isAdd: false
            })

            return
        }
        setRoutineList((list) => {
            const id = list.length ? list[list.length - 1].id + 1 : 0

            return [
                ...list,
                {
                    id,
                    name: inputValue.name,
                    count: inputValue.count,
                    isActive: isActiveName,
                }
            ]
        })
        setInputValue({
            name: '',
            count: '',
            isActive: true,
        })
        setIsActiveName(true)
    }


    return (
        <SQUARE>
            {/* <Label>동적운동 혹은 정적운동을 루틴에 등록해보세요</Label> */}
            {isChecked.isAdd === false && <NoInputModal isAdd={onClickModalClose} />}
            <ul className="category-ul" onClick={onClicktitle}>
                <ShortChoose>active excercise</ShortChoose>
                <Label>루틴에 넣을 운동으로 다음 동적운동을 선택해보세요.</Label>
                <ActiveExcercise>스쿼트</ActiveExcercise>
                <ActiveExcercise>런지</ActiveExcercise>
                <ActiveExcercise>원암덤벨로우</ActiveExcercise>
                <li>
                    <ShortChoose>inactive excercise</ShortChoose>
                    <Label>정적운동 이름을 아래에 직접 입력해주세요. (정적운동으로 나무자세, 플랭크를 추천합니다.)</Label>
                    {/* {!isActiveName && <InActiveInput */}
                    <InActiveInput
                        type="text"
                        placeholder="운동이름을 입력해주세요."
                        name="routineName"
                        value={inputValue.name}
                        onChange={changeRoutineInput}
                    />
                </li>
                <ShortChoose>How much</ShortChoose>
                <Label>동적운동은 횟수를, 정적운동은 시간(초)을 기록합니다.</Label>
                <InActiveInput
                    type="text"
                    placeholder="동작 횟수 / 시간을 입력해주세요."
                    name="countOrTime"
                    value={inputValue.count}
                    onChange={changeRoutineInput}
                />
                <LongChoose onClick={addItem}>Add</LongChoose>
            </ul>
        </SQUARE>
    )
}

//가로 짧은 버튼 - 동적운동, 정적운동, 시간 또는 횟수
const ShortChoose = styled.div`
    float: left;
    color :#c3dbff;
    font-size: 18px;
    width: 90%;
    height: 10px;
    margin : 20px 5%;
    margin-top: 30px;
    font-weight: 900;
    text-align: left;
`
//가로 긴 버튼
const LongChoose = styled.div`
    border: 1px solid rgba(27,31,36,0.04);
    border-radius: 8px;
    color : #24292f;//#c3dbff
    background-color: #f6f8fa;
    width : 80%;
    height: 40px;
    padding : 10px;
    font-size: 14px;
    font-weight: 500;
    text-align: center;
    text-decoration: none;
    margin: 5% 10% ;
`
//라벨
const Label = styled.div`
  text-align: left;
  font-size : 12px;
  margin : 0% 5%;
  font-family: campton, "Apple SD Gothic Neo", NanumBarunGothic, 나눔바른고딕, "Malgun Gothic", "맑은 고딕", dotum, sans-serif;
`
//큰 틀
const SQUARE = styled.div`
    border: 1px solid #dae1e6;
    height: 500px;
    width: 95%;
    margin : 0% 2.5%;
    margin-bottom: 5%;
`
//스쿼트 런지 원암덤벨로우
const ActiveExcercise = styled.button`
    border-bottom: 2px solid grey;
    border-radius: 1px;
    padding-bottom: 20px;
    font-size: 13px;
    height: 20px;
    font-weight: 700;
    text-align: center;
    text-decoration: none;
    margin: 20px 10px;
`;

//정적운동 이름 입력
const InActiveInput = styled.input`
font-family: campton, "Apple SD Gothic Neo", NanumBarunGothic, 나눔바른고딕, "Malgun Gothic", "맑은 고딕", dotum, sans-serif;
font-size: 13px; 
font-weight: 500;
border: 1px solid #d4d4d4;
border-radius: 8px;
width: 60%; 
height: 30px;
padding: 15px; 
margin: 15px 20%;
color: #1a1a1a;
outline: none;
`;

export default AddRoutineItem