import React, { useEffect, useRef } from 'react';
import '@tensorflow/tfjs-backend-webgl';
import * as poseDetection from '@tensorflow-models/pose-detection';
import Webcam from 'react-webcam';
import styled from 'styled-components';
import { drawCanvas } from '../../util/drawUtil';
import { useNavigate, useLocation } from 'react-router-dom';

const PoseTensorflow = () => {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const navigation = useNavigate();
    const location = useLocation();

    navigation('/posedetection/posecam')
    
    setTimeout(()=> {
        console.log(recordedChunks, 'recordedChunks')
        if (mediaRecorderRef.current !== null) {
            handleStopCapture()
        }
    }, 20000)


    //비디오 저장
    const recordedChunks = [];
    const handleStartCaptureStart = React.useCallback(() => {
        navigator.mediaDevices.getUserMedia({video: true, audio: false})
        .then(media => {
            webcamRef.current.stream = media

            mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
                mimeType: "video/webm"
              });
              mediaRecorderRef.current.addEventListener(
                "dataavailable",
                handleDataAvailable
              );
              mediaRecorderRef.current.start();
        }).catch(err => {
            console.log(err)
        }) 
      
      }, [webcamRef, mediaRecorderRef]);

    handleStartCaptureStart()

        const handleDataAvailable =({data}) => {
            console.log(data, 'data')
            if (data && data.size > 0) {
                recordedChunks.push(data)
                console.log(recordedChunks, 'recordedChunksData')
            }
        }
    
    const handleStopCapture =  React.useCallback(() => {
        mediaRecorderRef.current.stop();
      }, [mediaRecorderRef, webcamRef]);

      // 동영상 url 서버로 보내기 
      const handleDownload = React.useCallback(() => {
        console.log('ddddd')
            if (recordedChunks.length) {
                const blob = new Blob(recordedChunks, {
                  type: "video/webm"
                });
                const url = URL.createObjectURL(blob);
                // 임시 로컬 저장 변경 예정
                console.log(url)
                window.localStorage.setItem("video", JSON.stringify(url))
                navigation('/posedetection/feedback')
              }
      }, [recordedChunks]);
    

    // 'leftKnee', 'rightKnee', kneeProtrusion, leftElbow, rightElbow, 'leftWrist', 'rightWrist' leftStride rightStride
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

    const videoConstraints = {
        width: 760,
        height: 486,       
        facingMode: "user"
      };
      

    return (
        <>
            <WebcamComponent>
                <div className='rec-container'>
                    <span className='rec-circle'></span>
                    <span className='rec-text'>REC</span>
                </div>
                <Webcam ref={webcamRef}
                audio={false}
                height={486}
                width={760}
                videoConstraints={videoConstraints}
                />
                <canvas ref={canvasRef} className="canvas"></canvas>
                <button type='button'  onClick={handleDownload} className="result-button" >결과 확인</button>
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
    margin: 60px auto 0;
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
            color: #ff0f17;
        }
        .rec-circle {
            display: inline-block;
            width: 9px;
            height: 9px;
            margin-right: 5px;
            border-radius: 50%;
            background-color: #ff0f17;
        }
    }
    .canvas {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .result-button {
        position: absolute;
        bottom: 0;
        right: 10%;
        border-radius: 5px;
        background-color: black;
        padding: .5em .7em;
        color: #fff;
    }
`;



export default PoseTensorflow;