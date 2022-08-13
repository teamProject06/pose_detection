import React, { useRef } from 'react';
import '@tensorflow/tfjs-backend-webgl';
import * as poseDetection from '@tensorflow-models/pose-detection';
import Webcam from 'react-webcam';
import styled from 'styled-components';
import { drawCanvas } from '../../drawUtil';

const PoseTensorflow = () => {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);

    // 'leftKnee', 'rightKnee', kneeProtrusion, leftElbow, rightElbow, 'leftWrist', 'rightWrist' leftStride rightStride
    const bodyPoint = {
        leftElbows: [],
        rightElbows: [],
        rightKnees: [],
        leftWrists: [],
        rightWrists: [],
        leftKnees: [],
        leftShouldersMove: [],
        rightShouldersMove: [],
        kneeProtrusion: [],
    };

    // let count = 0;
    // setInterval(() => {
    //    // if (bodyPoint['leftElbowbodyPoint'].length >= 6) {
    //    //     bodyPoint['leftElbows'].push(bodyPoint['leftElbowbodyPoint'][5]);
    //       //  bodyPoint['leftElbowbodyPoint'].length = 0;
    //   //  }
    //     if (bodyPoint['rightElbowbodyPoint'].length >= 6) {
    //         bodyPoint['rightElbows'].push(bodyPoint['rightElbowbodyPoint'][5]);
    //         bodyPoint['rightElbowbodyPoint'].length = 0;
    //     }
    //     if (bodyPoint['leftKneebodyPoint'].length >= 6) {
    //         console.log(bodyPoint['leftKneebodyPoint'][25], "bodyPoint['leftKneebodyPoint'][25]");
    //         bodyPoint['leftKnees'].push(bodyPoint['leftKneebodyPoint'][5]);
    //         if (bodyPoint['leftKneebodyPoint'][20] <= 110) {
    //             count += 1;
    //         }
    //         bodyPoint['leftKneebodyPoint'].length = 0;
    //     }
    //     if (bodyPoint['rightKneebodyPoint'].length >= 6) {
    //         bodyPoint['rightKnees'].push(bodyPoint['rightKneebodyPoint'][5]);
    //         bodyPoint['rightKneebodyPoint'].length = 0;
    //     }
    //     if (bodyPoint['leftWristbodyPoint'].length >= 6) {
    //         bodyPoint['leftWrists'].push(bodyPoint['leftWristbodyPoint'][5]);
    //         bodyPoint['leftWristbodyPoint'].length = 0;
    //     }

    //     if (bodyPoint['rightStridebodyPoint'].length >= 6) {
    //         bodyPoint['rightStrides'].push(bodyPoint['rightStridebodyPoint'][5]);
    //         bodyPoint['rightStridebodyPoint'].length = 0;
    //     }

    //     if (bodyPoint['kneeProtrusionbodyPoint'].length >= 6) {
    //         bodyPoint['kneeProtrusion'].push(bodyPoint['kneeProtrusionbodyPoint'][5]);
    //         bodyPoint['kneeProtrusionbodyPoint'].length = 0;
    //     }
    // }, 500);

    const runPosenet = async () => {
        const detector = await poseDetection.createDetector(poseDetection.SupportedModels.BlazePose, {
            runtime: 'tfjs',
        });

        const interval = setInterval(() => {
            detect(detector);
        }, 20);

        setTimeout(() => {
            clearInterval(interval);
            console.log(bodyPoint, 'bodyPoint');
            // console.log(count, 'cc');
            // console.log(bodyPoint, 'bodyPoint');
            window.localStorage.setItem('bodyAngle', JSON.stringify(bodyPoint));
        }, 20000);
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

            drawCanvas(pose, video, videoWidth, videoHeight, canvasRef);

            findExercise(pose[0].keypoints, 'squat');

            // console.log(leftKnee, 'leftKnee');
        }
    };

    const findExercise = (exercises, pose) => {
        switch (pose) {
            case 'squat': {
                divisionBodySquat(exercises);
                break;
            }
            case 'oneArmLow': {

                break;
            }
            case 'lunge': {
                //divisionBodyLunge(exercises);
                break;
            }
            default:
                return;
        }
    };

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
        bodyPoint['rightKnees'].push(
            calculatorAngles([body[28].x, body[28].y, body[26].x, body[26].y, body[24].x, body[24].y])
        );
        bodyPoint['leftWrists'].push(
            calculatorAngles([body[11].x, body[11].y, body[23].x, body[23].y, body[25].x, body[25].y])
        );
        bodyPoint['rightWrists'].push(
            calculatorAngles([body[12].x, body[12].y, body[24].x, body[24].y, body[26].x, body[26].y])
        );
        checkShoulderMove([body[11].z, body[12].z, body[11].x, body[12].x])
        
        // bodyPoint['kneeProtrusionbodyPoint'].push(checkKneeProtrusion(body[25].z, body[31].z, body[26].z, body[32].z));
    };

    const checkKneeProtrusion = (leftKnee, leftFoot, rightKnee, rightFoot) => {
        console.log(leftKnee, leftFoot, rightKnee, rightFoot, 'ce');

        if (leftKnee < 0 && leftFoot < 0 && leftKnee < leftFoot) return false;
        if (rightKnee < 0 && rightFoot < 0 && rightKnee < rightFoot) return false;

        return true;
    };

    const checkShoulderMove = (shoulders) => {
        // if (shoulders[0] < 0 && shoulders[0] < shoulders[1]) {
            
        //     console.log('leftttttt',  shoulders[2])
        //     return bodyPoint['leftShouldersMove'].push(shoulders[2]), bodyPoint['leftShouldersMove'].push(shoulders[3]) 
        // } 
        bodyPoint['leftShouldersMove'].push(shoulders[2]) 
        bodyPoint['rightShouldersMove'].push(shoulders[3]) 

    } 

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

    const videoConstraints = {
        width: 760,
        height: 486,       
        facingMode: "user"
      };
      

    return (
        <>
            <WebcamComponent>
                <Webcam ref={webcamRef}
                audio={false}
                height={486}
                screenshotFormat="image/jpeg"
                width={760}
                videoConstraints={videoConstraints}
                />
                <canvas ref={canvasRef} className="canvas"></canvas>
                </WebcamComponent>
        </>
    );
};

const WebcamComponent = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1280px;
    margin: 0 auto;
    z-index: 10;
    .canvas {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
`;



export default PoseTensorflow;
