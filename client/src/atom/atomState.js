import { atom , selector } from 'recoil';

export const routineListState = atom({
    key: 'routineListState',
    default: [], 
})

export const isRoutineCheckedState = atom({
    key: 'isRoutineCheckedState',
    default: {
        isAdd: true,
        routine: false,
    }
})

export const editIdFilterState = atom({
    key: 'editIdFilterState',
    default: []
  })

export const getDataState = atom({
  key: 'getDataState',
  default: {
    name: '',
    poseName: '',
    result: [],
  }
})
