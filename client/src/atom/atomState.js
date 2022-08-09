import { atom } from 'recoil';

export const routineState = atom({
    key: 'routineState',
    default: [], 
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