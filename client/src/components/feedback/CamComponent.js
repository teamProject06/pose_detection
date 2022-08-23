import React from 'react';
import styled from 'styled-components';

const CamComponent = () => {
    const videoUrl = window.localStorage.getItem("video")
  return (
    <PoseCamContainer>
        <video src={videoUrl.slice(1, videoUrl.length-1)} controls type="video/mp4" width={640} height={450}></video>
    </PoseCamContainer>
  )
}

const PoseCamContainer = styled.article`
  width: 640px;
  height: 450px;
`;

export default CamComponent