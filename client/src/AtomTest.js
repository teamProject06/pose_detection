// import React, { useState, useRef, useEffect } from 'react'
// import { useSetRecoilState, useRecoilState, useRecoilValue } from 'recoil';
// import { routineState, onOffComponentState } from './atom/atomState';

// const AtomTest = () => {
//     // 상태관리 필요할때
//     const [routine, setRoutine] = useRecoilState(routineState);
//     const [isOn, setIsOn] = useRecoilState(onOffComponentState)


//     // 변한 값이 필요할때 
//     const isOnValue = useRecoilValue(onOffComponentState)
//     const routineValue = useRecoilValue(routineState)

//     // // 각각 하나씩 객체 등록할때는 () ref 변수를 여러개 등록헤야한다
//     // const ref1 = useRef();
//     // const ref2 = useRef();
//     // const ref3 = useRef();

//     // 여러개 ref 쓸때 ([]) 객체 배열 순서를 정해서 사용가능
//     const inputRef = useRef([]);
//     const [inputRoutine, setInputRoutine] = useState({
//         name: '',
//         count: '',
//         num: '',
//     })

//     useEffect(()=> {
//         console.log(routineValue, 'routine')
//         console.log(isOn, 'isOn')
//       //  console.log(inputRoutine, 'r')
//     }, [routineValue, isOn, inputRoutine])

//     const onChangeInput = (e) => {
//         setInputRoutine({
//             ...inputRoutine,
//             [e.target.name] : e.target.value
//         })
//     }

//     const onClickButton = () => {
//         if (inputRef.current[0].value === '') {
//             inputRef.current[0].focus()
//             return;
//         }
        
//         if (inputRef.current[1].value === '') {
//             inputRef.current[1].focus()
//             return;
//         }

//         if (inputRef.current[2].value === '') {
//             inputRef.current[2].focus()
//             return;
//         }

//         setRoutine([inputRoutine, ...routine]);

//         // 인풋 값 초기화
//         inputRef.current[0].value = '';
//         inputRef.current[1].value = '';
//         inputRef.current[2].value = '';

//         // 기본값  false
        
//     }
    
//     const onClickOnOff = () => {
//         setIsOn(!isOn)
//     }

//   return (
//     <div>
//         atomTest
//         <input type="text" name='name' defaultValue={inputRoutine.name} ref={el => {inputRef.current[0] = el}} onChange={onChangeInput}/>
//         <input type="text" name='count' defaultValue={inputRoutine.count} ref={el => {inputRef.current[1] = el}} onChange={onChangeInput}/>
//         <input type="text" name='num' defaultValue={inputRoutine.num} ref={el => {inputRef.current[2] = el}} onChange={onChangeInput}/>
//         <button onClick={onClickButton}>확인</button> 
//         <button onClick={onClickOnOff}>On/Off</button> 
//     </div>
//   )
// }

// export default AtomTest