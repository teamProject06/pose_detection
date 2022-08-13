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
    const tmp = {
        leftElbowTmp: [],
        rightElbowTmp: [],
        rightKneeTmp: [],
        leftKneeTmp: [],
        leftWristTmp: [],
        rightWristTmp: [],
        kneeProtrusionTmp: [],
        rightStrideTmp: []
    };

    const bodyPoint = {
        leftElbows: [],
        rightElbows: [],
        rightKnees: [],
        leftWrists: [],
        rightWrists: [],
        leftKnees: [],
        kneeProtrusion: [],
        rightStrideTmp: []
    };

    // let count = 0;
    // setInterval(() => {
    //    // if (tmp['leftElbowTmp'].length >= 6) {
    //    //     bodyPoint['leftElbows'].push(tmp['leftElbowTmp'][5]);
    //       //  tmp['leftElbowTmp'].length = 0;
    //   //  }
    //     if (tmp['rightElbowTmp'].length >= 6) {
    //         bodyPoint['rightElbows'].push(tmp['rightElbowTmp'][5]);
    //         tmp['rightElbowTmp'].length = 0;
    //     }
    //     if (tmp['leftKneeTmp'].length >= 6) {
    //         console.log(tmp['leftKneeTmp'][25], "tmp['leftKneeTmp'][25]");
    //         bodyPoint['leftKnees'].push(tmp['leftKneeTmp'][5]);
    //         if (tmp['leftKneeTmp'][20] <= 110) {
    //             count += 1;
    //         }
    //         tmp['leftKneeTmp'].length = 0;
    //     }
    //     if (tmp['rightKneeTmp'].length >= 6) {
    //         bodyPoint['rightKnees'].push(tmp['rightKneeTmp'][5]);
    //         tmp['rightKneeTmp'].length = 0;
    //     }
    //     if (tmp['leftWristTmp'].length >= 6) {
    //         bodyPoint['leftWrists'].push(tmp['leftWristTmp'][5]);
    //         tmp['leftWristTmp'].length = 0;
    //     }

    //     if (tmp['rightStrideTmp'].length >= 6) {
    //         bodyPoint['rightStrides'].push(tmp['rightStrideTmp'][5]);
    //         tmp['rightStrideTmp'].length = 0;
    //     }

    //     if (tmp['kneeProtrusionTmp'].length >= 6) {
    //         bodyPoint['kneeProtrusion'].push(tmp['kneeProtrusionTmp'][5]);
    //         tmp['kneeProtrusionTmp'].length = 0;
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
            console.log(tmp, 'tmp');
            // console.log(count, 'cc');
            // console.log(bodyPoint, 'bodyPoint');
            window.localStorage.setItem('bodyAngle', JSON.stringify(bodyPoint));
        }, 10000);
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

            findExercise(pose[0].keypoints, 'lunge');

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
                break;
            }
            default:
                return;
        }
    };

    const divisionBodySquat = (body) => {
        tmp['leftElbowTmp'].push(
            calculatorAngles([body[11].x, body[11].y, body[13].x, body[13].y, body[15].x, body[15].y])
        );
        tmp['rightElbowTmp'].push(
            calculatorAngles([body[12].x, body[12].y, body[14].x, body[14].y, body[16].x, body[16].y])
        );
        tmp['leftKneeTmp'].push(
            calculatorAngles([body[27].x, body[27].y, body[25].x, body[25].y, body[23].x, body[23].y])
        );
        tmp['rightKneeTmp'].push(
            calculatorAngles([body[28].x, body[28].y, body[26].x, body[26].y, body[24].x, body[24].y])
        );
        tmp['leftWristTmp'].push(
            calculatorAngles([body[11].x, body[11].y, body[23].x, body[23].y, body[25].x, body[25].y])
        );
        tmp['rightWristTmp'].push(
            calculatorAngles([body[12].x, body[12].y, body[24].x, body[24].y, body[26].x, body[26].y])
        );
        tmp['kneeProtrusionTmp'].push(checkKneeProtrusion(body[25].z, body[31].z, body[26].z, body[32].z));
    };


    const divisionBodyLunge = (body) => {
        //무릎 왼/오, 어깨 왼/오, 골반 왼/오 
        tmp['leftElbowTmp'].push(  //왼쪽 팔
            calculatorAngles([body[11].x, body[11].y, body[13].x, body[13].y, body[15].x, body[15].y])
        );
        tmp['rightElbowTmp'].push( //오른쪽 팔
            calculatorAngles([body[12].x, body[12].y, body[14].x, body[14].y, body[16].x, body[16].y])
        );
        tmp['leftKneeTmp'].push( //왼쪽 무릎
            calculatorAngles([body[27].x, body[27].y, body[25].x, body[25].y, body[23].x, body[23].y])
        );
        tmp['rightKneeTmp'].push( //오른쪽 무릎
            calculatorAngles([body[28].x, body[28].y, body[26].x, body[26].y, body[24].x, body[24].y])
        );
        tmp['leftWristTmp'].push( //왼쪽 골반
            calculatorAngles([body[11].x, body[11].y, body[23].x, body[23].y, body[25].x, body[25].y])
        );
        tmp['rightWristTmp'].push( //오른쪽 골반
            calculatorAngles([body[12].x, body[12].y, body[24].x, body[24].y, body[26].x, body[26].y])
        );

        // 발뒤꿈치 왼/오, 발목 왼/오
        tmp['FootHeel'].push(checkFootHeel(body[31].y, body[29].y, body[32].y, body[30].y));

        // 무릎, 발 좌표 비교 (x, z) 
        tmp['kneeProtrusionTmp'].push(checkKneeProtrusion(body[25].z, body[31].z, body[26].z, body[32].z));

        tmp['Elbowknee'].push(checkKneeAngles(calculatorAngles([body[11].x, body[11].y, body[13].x, body[13].y, body[15].x, body[15].y]),  
        calculatorAngles([body[28].x, body[28].y, body[26].x, body[26].y, body[24].x, body[24].y]),
        calculatorAngles([body[12].x, body[12].y, body[14].x, body[14].y, body[16].x, body[16].y]),
        calculatorAngles([body[27].x, body[27].y, body[25].x, body[25].y, body[23].x, body[23].y])
         ));

    };

    // (함수) 무릎, 발 좌표 비교
    const checkKneeProtrusion = (leftKnee, leftFoot, rightKnee, rightFoot) => {
        console.log(leftKnee, leftFoot, rightKnee, rightFoot, 'ce');

        if (leftKnee < 0 && leftFoot < 0 && leftKnee < leftFoot) return false;
        if (rightKnee < 0 && rightFoot < 0 && rightKnee < rightFoot) return false;

        return true;
    };


    // (함수) 굽히는 팔 반대쪽 무릎의 각도가 90도 인지
    const checkKneeAngles = (leftElbow, rightKnee, rightElbow, leftKnee) => {
        console.log("왼팔:", leftElbow, "오른쪽 무릎:", rightKnee, "오른팔:", rightElbow, "왼쪽 무릎: ", leftKnee);

        if (leftElbow < 105 && leftElbow > 85 && rightKnee < 100){ // 왼팔을 굽히고 있다면 -> 오른쪽 무릎 
            return true;
        }
        if (rightElbow < 105 && rightElbow > 85 && leftKnee < 100) return true;

        return false;
    };

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
                <Webcam ref={webcamRef}
            style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            height: "93vh",
            width: "100%",
             objectFit: 'cover'
                }}/>
                <canvas ref={canvasRef} style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    height: "93vh",
                    width: "100%",
                }}></canvas>
                </WebcamComponent>
        </>
    );
};

const WebcamComponent = styled.div`
    position: relative;
    width: 100%;
    height: 93vh;
    z-index: 10;
    margin-top: 7%;
`;



export default PoseTensorflow;
