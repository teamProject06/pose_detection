import React, { useEffect } from 'react';
import PoseTensorflow from '../components/poseCam/PoseTensorflow';
import Loader from '../components/Loader';

const PoseCam = () => {
  // 선택된 자세
  useEffect(() => {
    const posture = localStorage.getItem('posture');
    console.log("posture: ", posture);
}, []);

  return (
    <>
      <PoseTensorflow/>
    </>
  )
}

export default PoseCam