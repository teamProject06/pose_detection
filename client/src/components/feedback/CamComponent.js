import React from 'react';
import styled from 'styled-components';

const CamComponent = () => {
    const videoUrl = window.localStorage.getItem("video")

  return (
    <PoseCamContainer>
        <video src={videoUrl} controls type="video/webm" width={420} height={300}></video>
    </PoseCamContainer>
  )
}

const PoseCamContainer = styled.article`
  margin-right: 40px;
`;

export default CamComponent