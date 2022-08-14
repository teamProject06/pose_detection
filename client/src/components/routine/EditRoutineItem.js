import React, { useEffect, useState } from 'react';
import { routineListState, editIdFilterState, activeExcerciseState } from '../../atom/atomState';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

const EditRoutineItem = ({ item }) => {
    const [editCheck, setEditCheck] = useRecoilState(editIdFilterState)
  const [routineUpdateList, setRoutineUpdateList] = useRecoilState(routineListState)
  const [isEdit, setIsEdit] = useState({
    edit: false,
    done: false,
    clickEditButton: false
  })

    const [changeInput, setChangeInput] = useState({
        name: '',
        count: '',
        isActive: true
    })

    useEffect(()=> {
        console.log(editCheck)
        console.log(changeInput, 'changeInput')
        console.log(editCheck.filter(it => parseInt(it) !== parseInt(item.id)))
    },[editCheck, changeInput])


  const editItemChange = (e) => {
    if (e.target.name === 'name') {
        if (e.target.value !== '런지' || e.target.value !== '스쿼트' || e.target.value !== '원암로우') {
            setChangeInput({
                ...changeInput,
                isActive: false,
                name: e.target.value
            })
        }
        setChangeInput({
            ...changeInput,
            name: e.target.value
        })
        
    }

    if (e.target.name === 'count') {
        setChangeInput({
            ...changeInput,
            count: e.target.value
        })
    }

  }

  const deleteItem = () => {
    const newList = routineUpdateList.filter(del => del.id !== item.id)

    setRoutineUpdateList(newList)
  }


  const onClickEdit = (e, id) => {
    if (e.target.textContent === '수정') {
        setIsEdit({
            edit: true,
            done: true
        })
        setEditCheck([...editCheck, id])
        console.log(id, 'id')
        return
    }
    if (e.target.textContent === '확인') {
        const newList = routineUpdateList.map((listItem) => 
             listItem.id === id ? { 
                ...listItem,
                id: listItem.id, 
                name: changeInput.name, 
                count: changeInput.count,
                isActive: changeInput.isActive 
            } : listItem
        ); // id가 같은 것은 text를 업데이트 하고 아닌 것은 그대로 넣는 list를 만들어주는 set
        setRoutineUpdateList(newList);
        setIsEdit({
            edit: false,
            done: false
        })    

    }
  }

    // edit 수정하기 버튼을 누르면 input창이 나오고 안누르면 p 태그 
    // 수정 버튼 클릭하면 확인버튼으로 바뀜 글자만 바뀌고 
    // x 삭제 버튼

    return (
    <div>
        {isEdit.edit ? (
            <>
            <input type="text" name="name" defaultValue={item.name} onChange={editItemChange}/>
            <input type="text" name="count" defaultValue={item.count} onChange={editItemChange} />
            </>
        ): 
            (<p>{item.name} {item.count}</p>)
        }
        
        {editCheck.filter(it => parseInt(it) === parseInt(item.id)).length === 0 ? <EditorDelete onClick={(e) => onClickEdit(e, item.id)}>수정</EditorDelete> : <EditorDelete onClick={(e) => onClickEdit(e, item.id)}>확인</EditorDelete>}
        <EditorDelete onClick={deleteItem}>X</EditorDelete>
    </div>
  )
}

const EditorDelete = styled.button`
padding : 5px;
 font-size: 13px;
 border: 2px solid #c3dbff;
border-radius: 5px;
 width: 40px;
 height: 30px;
 font-weight: 500;
 text-align: center;
 margin: 5px;
`
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
    margin: 20px 0px;
    border-radius: 1px;
`


export default EditRoutineItem