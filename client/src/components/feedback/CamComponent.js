import React from 'react';
import styled from 'styled-components';

const CamComponent = () => {
    const videoUrl = window.localStorage.getItem("video")

    // blob video 로컬에 저장해서 갖고 와도 괜찮은지 서버에서 url 전송해서 보내야하는지 물어보기
  return (
    <PoseCamContainer>
        <video src={videoUrl} controls type="video/webm" width={533} height={300}></video>
    </PoseCamContainer>
  )
}

const PoseCamContainer = styled.article`

`;

export default CamComponent