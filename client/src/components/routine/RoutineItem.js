import React, { useEffect, useState } from 'react';
import { routineListState, editIdFilterState } from '../../atom/atomState';
import { useRecoilState } from 'recoil'; 

const RoutineItem = ({item}) => {
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
        console.log(1);
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
        
        {editCheck.filter(it => parseInt(it) === parseInt(item.id)).length === 0 ? <button onClick={(e) => onClickEdit(e, item.id)}>수정</button> : <button onClick={(e) => onClickEdit(e, item.id)}>확인</button>}
        <button onClick={deleteItem}>X</button>
    </div>
  )
}

export default RoutineItem