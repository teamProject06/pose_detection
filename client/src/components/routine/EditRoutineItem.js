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
        if (e.target.textContent === 'edit') {
            setIsEdit({
                edit: true,
                done: true
            })
            setEditCheck([...editCheck, id])
            console.log(id, 'id')
            return
        }
        if (e.target.textContent === 'ok') {
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
            <tr>
            {isEdit.edit ? (
                <td><RoutineInput type="text" name="name" defaultValue={item.name} onChange={editItemChange} />
                    <RoutineInput type="text" name="count" defaultValue={item.count} onChange={editItemChange} /></td>
            ) :
                // (<RoutineList>{item.name} {item.count}</RoutineList>)
                (<td>{item.name} / {item.count}</td>)
            }
            {
                editCheck.filter(it => parseInt(it) === parseInt(item.id)).length === 0 ?
                    <td><EditorDelete onClick={(e) => onClickEdit(e, item.id)}>edit</EditorDelete></td>
                    : <td><EditorDelete onClick={(e) => onClickEdit(e, item.id)}>ok</EditorDelete></td>
            }
            <td><EditorDelete onClick={deleteItem}> delete </EditorDelete></td>
            </tr>
    )
}

const EditorDelete = styled.span`
    font-size: 12px;
    font-weight: 300;
    text-align: center;
    `
const RoutineInput = styled.input`
font-family: campton, "Apple SD Gothic Neo", NanumBarunGothic, 나눔바른고딕, "Malgun Gothic", "맑은 고딕", dotum, sans-serif;
font-size: 13px; 
font-weight: 500;
border: 1px solid #d4d4d4;
border-radius: 8px;
width: 40%; 
padding: 0px 10px; 
margin: 0px 5px;
color: #1a1a1a;
outline: none;
text-align: center;`

export default EditRoutineItem