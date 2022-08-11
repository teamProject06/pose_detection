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


export const poseImproveState = atom({
    key: 'poseImproveState',
    default: {
        pose: '',
    }
})

export const onOffComponentState = atom({
    key: 'onOffComponentState',
    default: false
})