import React, { useRef } from 'react';
import '@tensorflow/tfjs-backend-webgl';
import * as poseDetection from '@tensorflow-models/pose-detection';
import Webcam from 'react-webcam';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import {theme} from '../theme'

const RoutineCam = ({videoConstraints}) => {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    const navigation = useNavigate();

    // 필요한 관절 부분 배열에 저장
    const bodyPoint = {
        leftElbows: [],
        rightElbows: [],
        rightKnees: [],
        leftWrists: [],
        rightWrists: [],
        leftKnees: [],
        knees: [],
        leftShouldersMove: [],
        rightShouldersMove: [],
        kneeProtrusion: [],
    };

    // 몸이 제대로 나오는지 스코어 점수 확인 전신이 나오는지 확인용 
    const pointScores = {
        leftElbowPoints: [],
        rightElbowPoints: [],
        rightKneePoints: [],
        leftWristPoints: [],
        rightWristPoints: [],
        leftKneePoints: [],
        leftShoulderPoints: [],
        rightShoulderPoints: [],
        leftAnklePoint: [],
        rightAnklePoint: [],
    };

    // 텐서플로우 모델 불러움
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
            const videoWidth = video.videoWidth;
            const videoHeight = video.videoHeight;

            webcamRef.current.video.width = videoWidth;
            webcamRef.current.video.height = videoHeight;

            const pose = await net.estimatePoses(video);

            console.log(pose[0].keypoints, 'pose');


            //findExercise(pose[0].keypoints);
            console.log(videoWidth, videoHeight, 'vvvvv')

        }
    };

   
    // 스쿼트 올바른 자세 판단을 위한 각도, 움직임 함수 호출 
    const divisionBodySquat = (body) => {
        // bodyPoint['leftElbowbodyPoint'].push(
        //     calculatorAngles([body[11].x, body[11].y, body[13].x, body[13].y, body[15].x, body[15].y])
        // );
        // bodyPoint['rightElbowbodyPoint'].push(
        //     calculatorAngles([body[12].x, body[12].y, body[14].x, body[14].y, body[16].x, body[16].y])
        // );
        bodyPoint['leftKnees'].push(
            calculatorAngles([body[27].x, body[27].y, body[25].x, body[25].y, body[23].x, body[23].y])
        );
        bodyPoint['knees'].push(
            calculatorAngles([body[27].x, body[27].y, body[25].x, body[25].y, body[23].x, body[23].y]),
            calculatorAngles([body[28].x, body[28].y, body[26].x, body[26].y, body[24].x, body[24].y])
        );
        bodyPoint['rightKnees'].push(
            calculatorAngles([body[28].x, body[28].y, body[26].x, body[26].y, body[24].x, body[24].y])
        );
        bodyPoint['leftWrists'].push(
            calculatorAngles([body[11].x, body[11].y, body[23].x, body[23].y, body[25].x, body[25].y])
        );
        bodyPoint['rightWrists'].push(
            calculatorAngles([body[12].x, body[12].y, body[24].x, body[24].y, body[26].x, body[26].y])
        );
        checkShoulderMove([body[11].x, body[12].x]);
        bodyScorePoints([
            body[11].score,
            body[12].score,
            body[13].score,
            body[14].score,
            body[23].score,
            body[24].score,
            body[25].score,
            body[26].score,
            body[27].score,
            body[28].score,
        ]);

        // bodyPoint['kneeProtrusionbodyPoint'].push(checkKneeProtrusion(body[25].z, body[31].z, body[26].z, body[32].z));
    };

    const checkKneeProtrusion = (leftKnee, leftFoot, rightKnee, rightFoot) => {
        console.log(leftKnee, leftFoot, rightKnee, rightFoot, 'ce');

        if (leftKnee < 0 && leftFoot < 0 && leftKnee < leftFoot) return false;
        if (rightKnee < 0 && rightFoot < 0 && rightKnee < rightFoot) return false;

        return true;
    };

    const checkShoulderMove = (shoulders) => {
        bodyPoint['leftShouldersMove'].push(shoulders[0]);
        bodyPoint['rightShouldersMove'].push(shoulders[1]);
    };

    const bodyScorePoints = (point) => {
        pointScores['leftShoulderPoints'].push(point[0]);
        pointScores['rightShoulderPoints'].push(point[1]);
        pointScores['leftElbowPoints'].push(point[2]);
        pointScores['rightElbowPoints'].push(point[3]);
        pointScores['leftWristPoints'].push(point[4]);
        pointScores['rightWristPoints'].push(point[5]);
        pointScores['leftKneePoints'].push(point[6]);
        pointScores['rightKneePoints'].push(point[7]);
        pointScores['leftAnklePoint'].push(point[8]);
        pointScores['rightAnklePoint'].push(point[9]);
    };


    // 발꿈치(y) 떼어져 있는지 
    // const checkFootHeel = (leftFootIndex, leftHeel, rightFootIndex, rightHeel) => {
    //     console.log("왼발 앞:", leftFootIndex, "왼발꿈치:", leftHeel, "오른발 앞:", rightFootIndex, "오른발꿈치: ", rightHeel);

    //     // 발 앞보다 발꿈치의 y값이 더 작아야 한다 = 까치발
    //     if (leftFootIndex < leftHeel) return false;
    //     if (rightFootIndex < rightHeel) return false;

    //     return true;
    // };

    //[0ax, 1ay, 2bx, 3by, 4cx, 5cy] 각도 계산
    const calculatorAngles = (position) => {
        const radians =
            Math.atan2(position[5] - position[3], position[4] - position[2]) -
            Math.atan2(position[1] - position[3], position[0] - position[2]);
        let angle = Math.abs((radians * 180.0) / Math.PI);

        if (angle > 180) {
            angle = 360 - angle;
        }

        return angle;
    };

      window.requestAnimationFrame(runPosenet);

    return (
        <>
            <WebcamComponent>
                <div className='rec-container'>
                    <span className='rec-circle'></span>
                    <span className='rec-text'>REC</span>
                </div>
                <Webcam ref={webcamRef}
                audio={false}
                width={760}
                height={600}
                videoConstraints={videoConstraints}
                />
                <canvas ref={canvasRef} className="canvas"></canvas>
                <TextContainer>
                <p className='result-text'>측정이 끝났습니다. 결과확인 버튼을 눌러주세요.</p>
                <button type='button'  onClick={()=>{}} className="result-button" >결과 확인</button>
                </TextContainer>
            </WebcamComponent>
        </>
    );
};

const WebcamComponent = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 1280px;
    margin: 0 auto;
    z-index: 10;
    .rec-container {
        position: absolute;
        top: 6%;
        left: 27%;
        transform: translate(-50%, -50%);
        display: flex;
        align-items: center;
        .rec-text {
            font-size: 16px;
            font-weight: 600;
            color: ${theme.colors.red};
        }
        .rec-circle {
            display: inline-block;
            width: 9px;
            height: 9px;
            margin-right: 5px;
            border-radius: 50%;
            background-color:  ${theme.colors.red};
        }
    }
    .canvas {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
   
`;

const TextContainer = styled.div`
    @keyframes opacityText {
        0% {
            opacity: 0;
        } 100% {
            opacity: 1;
        }
    }
    position: absolute;
    left: 50%;
    top: 0%;
    width: 760px;
    height: 600px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    transform: translateX(-50%);
    animation: opacityText ease forwards;
    animation-delay: 22s;
    animation-duration: 1s;
    opacity: 0;
    background-color: rgba(255, 255, 255, 0.6);
    .result-button {
        border-radius: 5px;
        background-color: black;
        padding: .5em .7em;
        color: ${theme.colors.white};
    }
    .result-text {
        margin-bottom: 1em;
        font-size: 24px;
        font-weight: 600;
        color: ${theme.colors.black};
    }
`;



export default RoutineCam;