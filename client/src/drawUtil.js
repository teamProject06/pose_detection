import * as poseDetection from '@tensorflow-models/pose-detection';

const COLOR_PALETTE = [
    '#ffffff',
    '#800000',
    '#469990',
    '#e6194b',
    '#42d4f4',
    '#fabed4',
    '#aaffc3',
    '#9a6324',
    '#000075',
    '#f58231',
    '#4363d8',
    '#ffd8b1',
    '#dcbeff',
    '#808000',
    '#ffe119',
    '#911eb4',
    '#bfef45',
    '#f032e6',
    '#3cb44b',
    '#a9a9a9',
];

const STATE = {
    camera: { targetFPS: 60, sizeOption: '640 X 480' },
    backend: '',
    flags: {},
    modelConfig: {},
    model: {},
};

export const drawCanvas = (pose, video, videoWidth, videoHeight, canvas) => {
    const ctx = canvas.current.getContext('2d');
    canvas.current.width = videoWidth;
    canvas.current.height = videoHeight;

    drawKeypoints(pose[0]['keypoints'], ctx);
    drawSkeleton(pose[0]['keypoints'], pose.id, ctx);
};

const drawKeypoints = (keypoints, ctx) => {
    const BlazePose = 'BlazePose';
    const keypointInd = poseDetection.util.getKeypointIndexBySide(BlazePose);

    ctx.fillStyle = 'Red';
    ctx.strokeStyle = 'White';
    ctx.lineWidth = 2;

    for (const i of keypointInd.middle) {
        drawKeypoint(keypoints[i], ctx);
    }

    ctx.fillStyle = 'Green';
    for (const i of keypointInd.left) {
        drawKeypoint(keypoints[i], ctx);
    }

    ctx.fillStyle = 'Orange';
    for (const i of keypointInd.right) {
        drawKeypoint(keypoints[i], ctx);
    }
};

const drawKeypoint = (keypoint, ctx) => {
    // If score is null, just show the keypoint.
    const score = keypoint.score != null ? keypoint.score : 1;
    const scoreThreshold = STATE.modelConfig.scoreThreshold || 0;

    if (score >= scoreThreshold) {
        const circle = new Path2D();
        circle.arc(keypoint.x, keypoint.y, 4, 0, 2 * Math.PI);
        ctx.fill(circle);
        ctx.stroke(circle);
    }
};

const drawSkeleton = (keypoints, poseId, ctx) => {
    const BlazePose = 'BlazePose';
    // Each poseId is mapped to a color in the color palette.
    const color = STATE.modelConfig.enableTracking && poseId != null ? COLOR_PALETTE[poseId % 20] : 'White';
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;

    poseDetection.util.getAdjacentPairs(BlazePose).forEach(([i, j]) => {
        const kp1 = keypoints[i];
        const kp2 = keypoints[j];

        // If score is null, just show the keypoint.
        const score1 = kp1.score != null ? kp1.score : 1;
        const score2 = kp2.score != null ? kp2.score : 1;
        const scoreThreshold = STATE.modelConfig.scoreThreshold || 0;

        if (score1 >= scoreThreshold && score2 >= scoreThreshold) {
            ctx.beginPath();
            ctx.moveTo(kp1.x, kp1.y);
            ctx.lineTo(kp2.x, kp2.y);
            ctx.stroke();
        }
    });
};
