import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";
import FilterDataComponent from './FilterDataComponent';
import FilterNoneComponent from './FilterNoneComponent';
import axios from 'axios';
import port from "./../../data/port.json";
import { useRecoilState } from 'recoil';
import { getDataState } from '../../atom/atomState';
import { theme } from '../../theme';

const FeedbackComponent = () => {
    const resultData = JSON.parse(window.localStorage.getItem("bodyData")) 
    const resultScoreData = JSON.parse(window.localStorage.getItem("bodyPointScores")) 
    const poseName = window.localStorage.getItem("posture")
    const naviation = useNavigate()
    const [cookies, setCookie, removeCookie] = useCookies(["userInfo"]);
    const [postData, setPostData] = useRecoilState(getDataState) 
    const [resultNone, setResultNone] = useState(0)
    const [isFullBody, setIsFull] = useState(true)

    const localData = () => {
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

        //fullBodyCheckScore()

        if(isFullBody) {
            setPostData({
                name:cookies.userInfo?.name,
                poseName: poseName,
                result: [
                    upperBodyMoveResult(maxUpperBodyMove, minUpperBodyMove),
                    upperBodyResult(minUpperBodyAngle),
                    kneeDapthResult(minKneeDepth)
                ]
            })
    
        }
    },[])

    const fullBodyCheckScore = () => {
        const rightAnklePoint = resultScoreData['rightAnklePoint'].filter(it => it >= 0.9)
     //   console.log(rightAnklePoint, 'rightAnklePoint')

        if (rightAnklePoint.length <  1) {
            setIsFull(false)
            setResultNone(2)
        }
    }

        const upperBodyMoveResult =  (max, min) =>  {
            let posedetectionResult = {
                part: '',
                feedback: '',
                state: '',
            }
    
           // console.log('upperBodyMoveResult')
            const range = max - min

            
            if (range <= 6) {
                posedetectionResult = {
                part: '상체 움직임',
                feedback: '상체 흔들림이 없고 안정적입니다.',
                state: 'Good',
            }

        } else {
            posedetectionResult = {
                part: '상체 움직임',
                feedback: '상체 흔들림이 있습니다 앞 뒤로 움직이지 않도록 어깨 움직임을 신경써주세요.',
                state: 'Bad',
            }
        } 

      //  console.log(posedetectionResult, 'posedetectionResult')
        
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
        } else if (angle >= 120) {
            posedetectionResult = {
                part: '상체 각도',
                feedback: '상체 각도에 문제가 있습니다. 상체를 적당히 숙여주세요.',
                state: 'Bad'
            }
        } else if (angle >= 80) {
            posedetectionResult = {
                part: '상체 각도',
                feedback: '상체 숙여지는 각도가 좋으며 상체 자세가 올바릅니다.',
                state: "Good",
            }
        } else if (angle < 80)  {
            posedetectionResult = {
                part: '상체 각도',
                feedback: '상체 각도에 문제가 있습니다. 상체가 너무 숙여졌습니다. 허리를 좀 더 펴주세요.',
                state: "Bad"
            }
        } 
       // console.log(posedetectionResult, 'posedetectionResult')
        
        return posedetectionResult
    } 

    
        
    const kneeDapthResult =(angle) => {
        // 컴포넌트 확인용 
        //const angle = 60;
        let posedetectionResult = {
            part: '',
            feedback: '',
            state: '',
        }

        if (angle >= 150) {
            setResultNone(resultNone + 2)
        } else if (angle >= 80) {
            posedetectionResult = {
                part: '무릎 각도',
                feedback: '스쿼트의 깊이가 적절하며 올바른 자세로 운동을 하고 있습니다.',
                state: 'Good'
            }
        } else {
            posedetectionResult = {
                part: '무릎 각도',
                feedback: '하체의 깊이가 너무 깊습니다. 무릎에 무리가 갈 수 있어 부상의 위험이 있습니다.',
                state: 'Bad'
            }
        }
            
          //  console.log(posedetectionResult, 'posedetectionResult')
            return posedetectionResult
        }
        

        const onClickPostData = () => {
            try {
              //  console.log(postData, "POSTDATA");
                if (postData.result.length > 0) {
                    sendFeedback().then((res) => {
                       // console.log(res)
                        alert(res.data.result);
                    }).catch(e =>{
                        alert(e.response.data.message);
                    })
                }
            }
            catch (e) {
                alert("피드백 저장에 실패했습니다.");
            }
        }

        const sendFeedback = async () => {
            // console.log(tmpData, "TMPDATA");
            return await axios.post(port.url + "/pose", postData,{
                headers: {
                    accessToken: cookies.userInfo.accessToken,
                }
            })
        }


        const onClickButton = (e) => {
            if (e.target.textContent === 'Home') {
                naviation('/')
            } else if (e. target.textContent === '저장하기') {
                onClickPostData()
            }
        }

  return (
    <FeedbackContainer>
        <ul>
            {resultNone !== 2 && isFullBody && postData.result.map((it,index) => {
                if (it.state === 'Good') {
                    return (
                        <li key={index} className="list neumorphic--pressed">
                            <FilterDataComponent data={it} idx={index}/>
                        </li>
                    )
                }
               
            })}
            {resultNone !== 2 && isFullBody && postData.result.map((it,index) => {
                if (it.state === 'Bad') {
                    return (
                        <li key={index} className="list neumorphic--pressed">
                            <FilterDataComponent data={it} idx={index}/>
                        </li>
                    )
                }
               
            })}
            {resultNone >= 2 && isFullBody &&
                <FilterNoneComponent result={'none'}/>
            }
             {isFullBody === false && 
                <FilterNoneComponent result={'fullbody'}/>
            }
        </ul>
        <ButtonContainer>
            <button type="button" className='button home' onClick={onClickButton}>{resultNone === 2 || !cookies ? 'Home' : '저장하기'}</button>
            <button type="button" className='button back' onClick={()=> {
                window.localStorage.setItem("posture", poseName)
                naviation('/posedetection/posecamguide')
            }}>다시하기</button>
        </ButtonContainer>
    </FeedbackContainer>
  )
} 

const FeedbackContainer = styled.article`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .list {
        box-sizing: border-box;
        
    }
    ul {
        margin-bottom: 2em;
    }
`;

const ButtonContainer = styled.div`
    .button {
        display: inline-block;
        width: 50%;
        padding: .5em 1em;
        border-radius: 10px;
    }
    .button.back{
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        background-color: #fff;
        border: 1px solid #ddd;
        color: black;
    }
    .button.home{
        left: 0;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        background-color: black;
        color: #f5f5f5;
    }
    .button.save{
        width: 100%;
        margin-top: 1em;
        background-color: black;
        color: #f5f5f5;
    }
`;

export default FeedbackComponent