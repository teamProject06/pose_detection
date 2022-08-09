import React, { useState, useRef, useEffect } from 'react'
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import NoAddModal from './NoAddModal';
import ModalCheck from './ModalCheck';
import { routineState } from '../../atom/atomState';


const MyRoutine = () => {
  const [routineList, setRoutineList] = useRecoilState(routineState)
  const [addRoutine, setAddRoutine] = useState(1)
  const [userRoutine, setUserRoutine] = useState({
      name: '',
      count: '',
      time: '',
      id: 0,
      active: true,
  });
  const inputRef = useRef([]);
  const [isChecked, setIsChecked] = useState({
    routine: false,
    isAdd: true,
    modal: false,
    NoActive: false,
    edit: false,
    editId: 0,
  })

  useEffect(() => {
      console.log(userRoutine, 'rout');
    console.log(routineList, 'routineList');
    if (isChecked.edit) { 
      const filterList = routineList.filter((it) => it.id === isChecked.editId);
      setUserRoutine({
          name: filterList.name,
          count: filterList.count,
          time: filterList.time,
          id: filterList.id,
          active: filterList.active,
      });
      setRoutineList([...routineList.filter(it=> it.id !== isChecked.editId)])
    }
  }, [userRoutine, routineList]);


  const clickRoutineButton = (e) => {
    if (e.target.textContent === '추가') {
      if (isChecked.routine) {
        setAddRoutine(addRoutine + 1);
        setIsChecked({
          ...isChecked,
          routine: false,
        });
      } else {
        setIsChecked({
          ...isChecked,
          isAdd: false,
        });
      }
    } else if (e.target.textContent === '완료') {
      setIsChecked({
          ...isChecked,
          modal: true,
      });
    } 
  };

  const clickRoutineWrite = (event, index) => {
    if (event.target.textContent === '확인') { 
      inputRef.current[index].disabled = true;
        setIsChecked({
            ...isChecked,
            routine: true,
          });
      setUserRoutine({
        ...userRoutine,
        id: index,
      });
      setRoutineList([userRoutine,...routineList]);
      setUserRoutine({
        name: '',
        count: 0,
        time: 0,
        id: 0,
      });
      return;
    } 
    if (event.target.textContent === '수정') {

      inputRef.current[index].disabled = false;
        setIsChecked({
          ...isChecked,
          routine: false,
          edit: true,
          editId: index
        });
      return;
    }
  };

  const onClickModalClose = () => { 
    if (isChecked.isAdd === false) {
      setIsChecked({
          ...isChecked,
          isAdd: true,
      });
      return;
    }
    if (isChecked.modal) {
      setIsChecked({
          ...isChecked,
          modal: false,
      });
      return;
    }
  }
  
  const onClickRoutineList = (e) => { 
    console.log(e.target.textContent[0], 'name');
    console.log(isChecked.NoActive, 'act');
    if (e.target.textContent === '스쿼트' || e.target.textContent === '런지' || e.target.textContent === '데드리프트') {
        setUserRoutine({
            ...userRoutine,
            name: e.target.textContent,
        });
        return;
    }
    if (e.target.textContent[0] === '정') {
        setIsChecked({
            ...isChecked,
            NoActive: true,
        });
        setUserRoutine({
            ...userRoutine,
            name: '',
            active: false
        });
    }
  }

  const changeRoutineInput = (e) => { 
    if (e.target.name === 'routineName') { 
      setUserRoutine({
        ...userRoutine,
        name: e.target.value
      })
    }
    if (e.target.name === 'countOrTime') { 
      if (userRoutine.name === '스쿼트' || userRoutine.name === '런지' || userRoutine.name === '데드리프트') {
          setUserRoutine({
              ...userRoutine,
              count: e.target.value,
            });
          } else if (userRoutine.name.length > 0) {
            setUserRoutine({
              ...userRoutine,
              time: e.target.value,
          });
      }
    }
  };

  function RoutineAdd () {
    const el = [];
    
    for (let i = 0; i < addRoutine; i++) { 

      el.push(
          <InputUl key={i}>
              <ul className="category-ul" onClick={onClickRoutineList}>
                  <li>스쿼트</li>
                  <li>런지</li>
                  <li>데드리프트</li>
                  <li>
                      정적운동
                      <small>* 정적운동은 횟수가 아닌 시간을 기록합니다.</small>
                      {isChecked.NoActive && (
                          <input
                              type="text"
                              placeholder="운동이름을 입력해주세요."
                              name="routineName"
                              value={userRoutine.name}
                              onChange={changeRoutineInput}
                          />
                      )}
                  </li>
              </ul>
              <input
                  type="text"
                  placeholder="동작 횟수 / 시간을 입력해주세요"
                  ref={(el) => {
                      inputRef.current[i] = el;
                  }}
                  name="countOrTime"
                  value={userRoutine.active ? userRoutine.count : userRoutine.time}
                  onChange={changeRoutineInput}
              />
              <button onClick={(e) => clickRoutineWrite(e, i)}>확인</button>
              <button onClick={(e) => clickRoutineWrite(e, i)}>수정</button>
          </InputUl>
      );
    }

    return el
  };

  return (
      <>
          {isChecked.isAdd === false && <NoAddModal isAdd={onClickModalClose} />}
          {isChecked.modal && isChecked.isAdd && <ModalCheck isChecked={onClickModalClose} />}
          <RoutineInputContainer>
              {addRoutine > 0 && RoutineAdd()}
              <div className="button-container">
                  <button type="button" onClick={clickRoutineButton}>
                      추가
                  </button>
                  <button type="button" onClick={clickRoutineButton}>
                      완료
                  </button>
              </div>
          </RoutineInputContainer>
      </>
  );
}

const RoutineInputContainer = styled.div`
`;

const InputUl = styled.ul``;


export default MyRoutine