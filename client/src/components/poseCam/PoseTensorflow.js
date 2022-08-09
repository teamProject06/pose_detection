import React, { useRef } from 'react';
import * as poseDetection from '@tensorflow-models/pose-detection';
import Webcam from 'react-webcam';
import styled from 'styled-components';

const PoseTensorflow = () => {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);

    const runPosenet = async () => {
        const detector = await poseDetection.createDetector(poseDetection.SupportedModels.BlazePose, {
            runtime: 'tfjs',
        });

        setInterval(() => {
            detect(detector);
        }, 20);

    };

    const detect = async (net) => {
        if (
            typeof webcamRef.current !== 'undefined' &&
            webcamRef.current !== null &&
            webcamRef.current.video.readyState === 4
        ) {
            const video = webcamRef.current.video;
            const videoWidth = webcamRef.current.video.videoWidth;
            const videoHeight = webcamRef.current.video.videoHeight;

            webcamRef.current.video.width = videoWidth;
            webcamRef.current.video.height = videoHeight;

            const pose = await net.estimatePoses(video);

            console.log(pose[0].keypoints, 'pose');

        }
    };


    window.requestAnimationFrame(runPosenet);

    return (
        <>
            <WebcamComponent>
                <Webcam ref={webcamRef} />
            </WebcamComponent>
            <CanvasContainer>
                <canvas ref={canvasRef}></canvas>
            </CanvasContainer>
        </>
    );
};

const WebcamComponent = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    width: 640px;
    height: 480px;
    text-align: center;
    z-index: 10;
`;

const CanvasContainer = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    width: 640px;
    height: 480px;
    text-align: center;
    z-index: 10;
`;

export default PoseTensorflow;
