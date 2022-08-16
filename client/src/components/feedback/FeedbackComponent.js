import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";

const FeedbackComponent = () => {
    const resultData = JSON.parse(window.localStorage.getItem("bodyData")) 
    const resultScoreData = JSON.parse(window.localStorage.getItem("bodyPointScores")) 
    const poseName = window.localStorage.getItem("posture")
    const naviation = useNavigate()
    const [cookies, setCookie, removeCookie] = useCookies(["userInfo"]);
   
    const [resultNone, setResultNone] = useState(0)
    
    // data 보내기 
    const resultList = []
    const [postData, setPostData] = useState({
        name:cookies.userInfo.name,
        poseName: poseName,
        result: [],
    })
    
    const localData = async () => {
            const upperBodyAngle = new Set(resultData['rightWrists']) 
            const kneeAngle = new Set(resultData['rightKnees'])
            const upperBodyMove = new Set(resultData['rightShouldersMove'])
            
            const minUpperBodyAngle = Math.min(...upperBodyAngle)
            const minKneeDepth = Math.min(...kneeAngle)
            
            // 어깨 움직임 오차 최대값 - 최소값 6 - 10 확인필요
            const minUpperBodyMove = Math.min(...upperBodyMove)
            const maxUpperBodyMove = Math.max(...upperBodyMove)
            
            window.localStorage.setItem("minUpperBodyAngle", minUpperBodyAngle)
            window.localStorage.setItem("minKneeDepth", minKneeDepth)
            window.localStorage.setItem("minUpperBodyMove", minUpperBodyMove)
            window.localStorage.setItem("maxUpperBodyMove", maxUpperBodyMove)
        }
        

    useEffect(()=> {
        
        localData()
        
        const minUpperBodyAngle = window.localStorage.getItem("minUpperBodyAngle")
        const minKneeDepth = window.localStorage.getItem("minKneeDepth")
        const minUpperBodyMove = window.localStorage.getItem("minUpperBodyMove")
        const maxUpperBodyMove = window.localStorage.getItem("maxUpperBodyMove")

        setPostData({
            ...postData,
            result: [
                upperBodyMoveResult(maxUpperBodyMove, minUpperBodyMove),
                upperBodyResult(minUpperBodyAngle),
                kneeDapthResult(minKneeDepth)
            ]
        })

    },[])


        const upperBodyMoveResult =  (max, min) =>  {
            let posedetectionResult = {
                part: '',
                feedback: '',
                state: '',
            }
    
            console.log('upperBodyMoveResult')
            const range = max - min

            
            if (range <= 6) {
                posedetectionResult = {
                part: '상체 움직임',
                feedback: '상체 흔들림이 없고 안정적입니다.',
                state: 'good',
            }

        } else {
            posedetectionResult = {
                part: '상체 움직임',
                feedback: '상체 흔들림이 있습니다 앞 뒤로 움직이지 않도록 어깨 움직임을 신경써주세요.',
                state: 'bad',
            }
        } 

        console.log(posedetectionResult, 'posedetectionResult')
        
        return posedetectionResult
    
    }

    const upperBodyResult =  (angle) => {
        let posedetectionResult = {
            part: '',
            feedback: '',
            state: '',
        }

        if (angle >= 150) {
            setResultNone(resultNone + 1)
            posedetectionResult = {
                    part: '상체 각도',
                    feedback: '움직임이 느껴지지 않아 측정이 되지 않았습니다. 운동을 다시 해주세요',
                    state: 'none',
                }
        } else if (angle >= 120) {
            posedetectionResult = {
                part: '상체 각도',
                feedback: '상체 각도에 문제가 있습니다. 상체를 적당히 숙여주세요.',
                state: 'bad'
            }
        } else if (angle >= 80) {
            posedetectionResult = {
                part: '상체 각도',
                feedback: '상체 숙여지는 각도가 좋으며 상체 자세가 올바릅니다.',
                state: "good",
            }
        } else if (angle < 80)  {
            posedetectionResult = {
                part: '상체 각도',
                feedback: '상체 각도에 문제가 있습니다. 상체가 너무 숙여졌습니다. 허리를 좀 더 펴주세요.',
                state: "bad"
            }
        } 
        console.log(posedetectionResult, 'posedetectionResult')
        
        return posedetectionResult
    } 

    
        
    const kneeDapthResult = (angle) => {
        let posedetectionResult = {
            part: '',
            feedback: '',
            state: '',
        }

        if (angle >= 150) {
            setResultNone(resultNone + 1)
            posedetectionResult = {
                part: '무릎 각도',
                feedback: '움직임이 느껴지지 않아 측정이 되지 않았습니다. 운동을 다시 해주세요',
                state: 'none',
            }
        } else if (angle >= 80) {
            posedetectionResult = {
                part: '무릎 각도',
                feedback: '스쿼트의 깊이가 적절하며 올바른 자세로 운동을 하고 있습니다.',
                state: 'good'
            }
        } else {
            posedetectionResult = {
                part: '무릎 각도',
                feedback: '하체의 깊이가 너무 깊습니다. 무릎에 무리가 갈 수 있어 부상의 위험이 있습니다.',
                state: 'bad'
            }
        }
            
            console.log(posedetectionResult, 'posedetectionResult')
            return posedetectionResult
          
        }
        
        console.log(resultList, 'resultListresultList')
    
  return (
    <FeedbackContainer>
        {postData.result.map(it => {
            return (
                <div>
                    {it.part}
                    {it.feedback}
                </div>
            )
        })}
        <button type="button" onClick={()=> naviation('/')}>Home</button>
        <button type="button" onClick={()=> naviation('/posedetection/posecam')}>다시하기</button>
    </FeedbackContainer>
  )
}

const FeedbackContainer = styled.article`
`;

export default FeedbackComponent