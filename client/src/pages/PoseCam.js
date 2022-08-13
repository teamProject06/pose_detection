import React from 'react';
import PoseTensorflow from '../components/poseCam/PoseTensorflow';

const PoseCam = () => {
  return (
    <>
      PoseCam : 머리부터 발 끝까지 모두 화면에 담기게 서주세요.
      <PoseTensorflow/>
    </>
  )
}

export default PoseCam