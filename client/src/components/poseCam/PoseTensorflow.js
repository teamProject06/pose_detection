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
        leftStrideTmp: [],
        rightStrideTmp: [],
        kneeProtrusionTmp: [],
    };

    const bodyPoint = {
        leftElbows: [],
        rightElbows: [],
        leftStrides: [],
        rightStrides: [],
        rightKnees: [],
        leftWrists: [],
        rightWrists: [],
        leftKnees: [],
        kneeProtrusion: [],
    };

    // useEffect(() => {
    //   console.log(test, 'tttt');
    // }, [test]);

    let count = 0;
    setInterval(() => {
        //console.log(leftElbow[5], '50')
        //console.log(leftElbow, '0')
        if (tmp['leftElbowTmp'].length >= 6) {
            bodyPoint['leftElbows'].push(tmp['leftElbowTmp'][5]);
            tmp['leftElbowTmp'].length = 0;
        }
        if (tmp['rightElbowTmp'].length >= 6) {
            bodyPoint['rightElbows'].push(tmp['rightElbowTmp'][5]);
            tmp['rightElbowTmp'].length = 0;
        }
        if (tmp['leftKneeTmp'].length >= 6) {
            console.log(tmp['leftKneeTmp'][25], "tmp['leftKneeTmp'][25]");
            bodyPoint['leftKnees'].push(tmp['leftKneeTmp'][5]);
            if (tmp['leftKneeTmp'][20] <= 110) {
                count += 1;
            }
            tmp['leftKneeTmp'].length = 0;
        }
        if (tmp['rightKneeTmp'].length >= 6) {
            bodyPoint['rightKnees'].push(tmp['rightKneeTmp'][5]);
            tmp['rightKneeTmp'].length = 0;
        }
        if (tmp['leftWristTmp'].length >= 6) {
            bodyPoint['leftWrists'].push(tmp['leftWristTmp'][5]);
            tmp['leftWristTmp'].length = 0;
        }

        if (tmp['rightWristTmp'].length >= 6) {
            bodyPoint['rightWrists'].push(tmp['rightWristTmp'][5]);
            tmp['rightWristTmp'].length = 0;
        }

        if (tmp['leftStrideTmp'].length >= 6) {
            bodyPoint['leftStrides'].push(tmp['leftStrideTmp'][5]);
            tmp['leftStrideTmp'].length = 0;
        }

        if (tmp['rightStrideTmp'].length >= 6) {
            bodyPoint['rightStrides'].push(tmp['rightStrideTmp'][5]);
            tmp['rightStrideTmp'].length = 0;
        }

        if (tmp['kneeProtrusionTmp'].length >= 6) {
            bodyPoint['kneeProtrusion'].push(tmp['kneeProtrusionTmp'][5]);
            tmp['kneeProtrusionTmp'].length = 0;
        }
    }, 500);

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
            console.log(count, 'cc');
            console.log(bodyPoint, 'bodyPoint');
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

            findExercise(pose[0].keypoints, 'squat');

            // console.log(leftKnee, 'leftKnee');
            //console.log(rightStride, 'rightStride');
            //console.log(leftElbow)
        }
    };

    const findExercise = (exercises, pose) => {
        // console.log(pose, 'findpose')
        switch (pose) {
            case 'squat': {
                divisionBodySquat(exercises);
                break;
            }
            case 'deadLift': {
                divisionBody(exercises, 'leftElbow', 'rightElbow', 'leftKnee', 'rightKnee', 'leftWrist', 'rightWrist');

                break;
            }
            case 'lunge': {
                divisionBody(exercises, 'leftKnee', 'rightKnee', 'leftAnkle', 'rightAnkle', 'leftWrist', 'rightWrist');
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
        tmp['leftStrideTmp'].push(calculatorStrideRange(body[11].x, body[27].x));
        tmp['rightStrideTmp'].push(calculatorStrideRange(body[12].x, body[28].x));
        tmp['kneeProtrusionTmp'].push(checkKneeProtrusion(body[25].z, body[31].z, body[26].z, body[32].z));
    };

    // ankle 런지 각도만 확인
    // 'leftKnee', 'rightKnee', 'leftAnkle', 'rightAnkle', 'leftWrist', 'rightWrist' leftStride rightStride
    const divisionBody = (body, pose, ...rest) => {
        // console.log(Math.abs(body[11].x + body[12].x) / 2, 'x');
        // const bodyPosition = {
        //   1: [body[11].x, body[11].y, body[13].x, body[13].y, body[15].x, body[15].y],
        //   2: [body[12].x, body[12].y, body[14].x, body[14].y, body[16].x, body[16].y],
        //   3: [body[27].x, body[27].y, body[25].x, body[25].y, body[23].x, body[23].y],
        //   4: [body[28].x, body[28].y, body[26].x, body[26].y, body[24].x, body[24].y],
        //   5: [body[11].x, body[11].y, body[23].x, body[23].y, body[25].x, body[25].y],
        //   6: [body[12].x, body[12].y, body[24].x, body[24].y, body[26].x, body[26].y],
        //   // 'leftAnkle': [body[31].x, body[31].y, body[29].x, body[29].y, body[27].x, body[27].y],
        // };

        const poseAngle = () => {
            console.log(pose, 'dd');
            //console.log(Object.keys(bodyPosition).includes(angle))
            if (pose === 'squat') {
                //console.log(bodyPosition[angle], 'bodyPosition[angle]')
                //tmp.leftAnkleTmp.push(calculatorAngles(bodyPosition[angle]));
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
                tmp['leftStrideTmp'].push(calculatorStrideRange(body[11].x, body[27].x));
                tmp['rightStrideTmp'].push(calculatorStrideRange(body[12].x, body[28].x));
            }
        };

        return poseAngle;
    };

    const checkKneeProtrusion = (leftKnee, leftFoot, rightKnee, rightFoot) => {
        console.log(leftKnee, leftFoot, rightKnee, rightFoot, 'ce');

        if (leftKnee < 0 && leftFoot < 0 && leftKnee < leftFoot) return false;
        if (rightKnee < 0 && rightFoot < 0 && rightKnee < rightFoot) return false;

        return true;
    };

    //[0ax, 1ay, 2bx, 3by, 4cx, 5cy]
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

    const calculatorStrideRange = (a, b) => {
        console.log(a, b, 'position');
        const range = Math.abs(a - b);
        console.log(range, 'r');
        if (range > 25) {
            return false;
        }

        // console.log(range, 'range');

        return true;
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
