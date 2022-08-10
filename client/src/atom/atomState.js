import { atom , selector } from 'recoil';

let uniqId = 0

export const routineListState = atom({
    key: 'routineListState',
    default: [], 
})

export const createRoutine = (name, count) => ({
  id: ++uniqId,
  done: false,
  name,
  count
})

export const routineState = atom({
  key: 'routineState',
  default: [
     createRoutine('', ''),
  ],
})

export const filterType = atom({
  key: 'filterType',
  default: 'all',
})

export const filteredRoutineState = selector({
  key: 'filteredRoutineState',
  get: ({ get }) => {
    const items = get(routineState)
    const type = get(filterType)

    switch (type) {
      case 'do':
        return items.filter(routine => !routine.done)

      case 'done':
        return items.filter(routine => routine.done)

      default:
        return items
    }
  }
})

export const isRoutineCheckedState = atom({
    key: 'isRoutineCheckedState',
    default: {
        isAdd: true,
        routine: false,
        edit: false,
        editId: 0,
    }
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