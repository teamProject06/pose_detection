import React from 'react';
import styled from 'styled-components';

const CamComponent = () => {
    const videoUrl = window.localStorage.getItem("video")

  return (
    <PoseCamContainer>
        <video src={videoUrl} controls type="video/webm" width={500} height={330}></video>
    </PoseCamContainer>
  )
}

const PoseCamContainer = styled.article`
`;

export default CamComponent