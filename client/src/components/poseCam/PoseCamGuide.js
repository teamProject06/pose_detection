import React, { useEffect, useState, useRef } from 'react';
import Loader from '../Loader';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Webcam from "react-webcam";

const PoseCamGuide = ({videoConstraints}) => {
    const navigation = useNavigate();
    const [loading, setLoading] = useState(true)
    const[textIdx, setTextIdx] = useState(0)
    const camRef = useRef(null)
    console.log(videoConstraints)

    setTimeout(() => {
       setLoading(false) 
    }, 2500);

    setInterval(() => {
        setTextIdx(textIdx+1)
    },5000)

    useEffect(() => {
       
        if (textIdx >= 2) {
            setTextIdx(3)
            setTimeout(() => {
                return navigation('/posedetection/posecam')
            }, 5000)
        } 
        console.log(textIdx, 'textIdx')
    }, [textIdx])
    

   

    return (
        <>
        {loading && <Loader />}
        {!loading && 
        <Container>
            <LeftGuideContainer>
                <h2>&#9656; 이용방법 안내</h2>
                <p>1. 웹캠을 허용해주시고 캠에 전신이 나오게 서주세요.</p>
                <p>2. 자세 측정을 위해서 정면이 아닌 <span className='border-text'>45도 or 측면으로</span> 서야 정확한 측정이 가능합니다.</p>
                <div className='img-container'>
                    <img src={'/img/guide_line.png'} alt="이용안내 가이드 이미지" />
                </div>
            </LeftGuideContainer>
            <RightGuideContainer>
            {textIdx >= 1 && <p>잠시 후 측정이 시작됩니다!</p>}
                <Webcam 
                videoConstraints={videoConstraints} />
            </RightGuideContainer>
        </Container>}
        </>
  )
}

const Container = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 50px 0;
`;

const LeftGuideContainer = styled.article`
    margin-right: 2.2em;
    flex: none;
    margin-bottom: auto;
    line-height: 1.8;
    max-width: 250px;
    h2 {
        font-size: 20px;
    }
    p {
        line-height: 1.6;
        .border-text {
            border-bottom: 1px solid black;
        }
    }
    .img-container {
        border: 1px solid black;
    }
`;


const RightGuideContainer = styled.article`
    position: relative;
    p {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        font-size: 25px;
        color: #fff;
        letter-spacing: -1px;
    }
`;

export default PoseCamGuide